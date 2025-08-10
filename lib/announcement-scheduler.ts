import { mongo, postgres } from "@/lib/db";

export class AnnouncementScheduler {
  private static instance: AnnouncementScheduler;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): AnnouncementScheduler {
    if (!AnnouncementScheduler.instance) {
      AnnouncementScheduler.instance = new AnnouncementScheduler();
    }
    return AnnouncementScheduler.instance;
  }

  public start(): void {
    if (this.intervalId) {
      console.log("Announcement scheduler is already running");
      return; // Already running
    }

    // Check every minute for announcements that need to be sent
    this.intervalId = setInterval(async () => {
      console.log("Checking for scheduled announcements...");
      await this.processScheduledAnnouncements();
    }, 60000); // 1 minute

    console.log("Announcement scheduler started - checking every minute");
  }

  public async processNow(): Promise<void> {
    console.log("Manually processing scheduled announcements...");
    await this.processScheduledAnnouncements();
  }

  public async cleanupOrphanedAnnouncements(): Promise<void> {
    try {
      console.log("Cleaning up orphaned announcements...");
      
      // Find announcements that don't have a valid server
      const orphanedAnnouncements = await postgres.scheduledAnnouncement.findMany({
        where: {
          server: null,
        },
      });

      if (orphanedAnnouncements.length > 0) {
        console.log(`Found ${orphanedAnnouncements.length} orphaned announcements`);
        
        for (const announcement of orphanedAnnouncements) {
          try {
            await postgres.scheduledAnnouncement.delete({
              where: { id: announcement.id },
            });
            console.log(`Deleted orphaned announcement: ${announcement.title} (${announcement.id})`);
          } catch (error) {
            console.error(`Failed to delete orphaned announcement ${announcement.id}:`, error);
          }
        }
      } else {
        console.log("No orphaned announcements found");
      }
    } catch (error) {
      console.error("Error cleaning up orphaned announcements:", error);
    }
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Announcement scheduler stopped");
    }
  }

  public isRunning(): boolean {
    return this.intervalId !== null;
  }

  private async processScheduledAnnouncements(): Promise<void> {
    try {
      const now = new Date();
      console.log(`Processing scheduled announcements at ${now.toISOString()}`);
      
      // Find announcements that are due to be sent
      const dueAnnouncements = await postgres.scheduledAnnouncement.findMany({
        where: {
          AND: [
            { isActive: true },
            { nextSendAt: { lte: now } },
          ],
        },
        include: {
          server: true,
          channel: true,
          creatorProfile: true,
        },
      });

      console.log(`Found ${dueAnnouncements.length} announcements due to be sent`);

      for (const announcement of dueAnnouncements) {
        try {
          console.log(`Processing announcement: ${announcement.title} (${announcement.id})`);
          await this.sendAnnouncement(announcement);
          await this.updateNextSendTime(announcement);
        } catch (error) {
          console.error(`Failed to process announcement ${announcement.id}:`, error);
          // Continue processing other announcements even if one fails
        }
      }
    } catch (error) {
      console.error("Error processing scheduled announcements:", error);
    }
  }

  private async sendAnnouncement(announcement: any): Promise<void> {
    try {
      console.log(`Sending announcement: ${announcement.title} to channel: ${announcement.channel.name}`);
      
      // Get the member ID for the creator in this server
      const member = await postgres.member.findFirst({
        where: {
          serverId: announcement.serverId,
          profileId: announcement.creatorProfileId,
        },
      });

      if (!member) {
        console.error(`No member found for announcement ${announcement.id} - creator: ${announcement.creatorProfileId}, server: ${announcement.serverId}`);
        return;
      }

      console.log(`Found member: ${member.id} for announcement creator`);

      // Create a message in the target channel using MongoDB
      const message = await mongo.message.create({
        data: {
          content: `**${announcement.title}**\n\n${announcement.message}`,
          channelId: announcement.channelId,
          memberId: member.id,
        },
      });

      console.log(`Message created successfully: ${message.id}`);

      // Update the announcement's lastSentAt
      await postgres.scheduledAnnouncement.update({
        where: { id: announcement.id },
        data: { lastSentAt: new Date() },
      });

      console.log(`Announcement "${announcement.title}" sent to channel ${announcement.channel.name}`);
    } catch (error) {
      console.error(`Error sending announcement ${announcement.id}:`, error);
    }
  }

  private async updateNextSendTime(announcement: any): Promise<void> {
    try {
      // First, verify the announcement still exists and is valid
      const existingAnnouncement = await postgres.scheduledAnnouncement.findUnique({
        where: { id: announcement.id },
        include: {
          server: true,
        },
      });

      if (!existingAnnouncement) {
        console.warn(`Announcement ${announcement.id} no longer exists, skipping update`);
        return;
      }

      if (!existingAnnouncement.server) {
        console.warn(`Announcement ${announcement.id} has no associated server, skipping update`);
        return;
      }

      const now = new Date();
      let nextSendAt = new Date();

      switch (announcement.scheduleType) {
        case "DAILY":
          // Set for tomorrow at the same time
          nextSendAt.setDate(now.getDate() + 1);
          if (announcement.scheduleData?.dailyTime) {
            const [hours, minutes] = announcement.scheduleData.dailyTime.split(":").map(Number);
            nextSendAt.setHours(hours, minutes, 0, 0);
          }
          break;

        case "WEEKLY":
          // Set for next week at the same time
          nextSendAt.setDate(now.getDate() + 7);
          if (announcement.scheduleData?.dailyTime) {
            const [hours, minutes] = announcement.scheduleData.dailyTime.split(":").map(Number);
            nextSendAt.setHours(hours, minutes, 0, 0);
          }
          break;

        case "MONTHLY":
          // Set for next month at the same time
          nextSendAt.setMonth(now.getMonth() + 1);
          if (announcement.scheduleData?.dailyTime) {
            const [hours, minutes] = announcement.scheduleData.dailyTime.split(":").map(Number);
            nextSendAt.setHours(hours, minutes, 0, 0);
          }
          break;

        case "CUSTOM":
          // One-time announcements - deactivate after sending
          try {
            await postgres.scheduledAnnouncement.update({
              where: { id: announcement.id },
              data: { isActive: false },
            });
            console.log(`Deactivated one-time announcement: ${announcement.title}`);
          } catch (updateError) {
            console.error(`Failed to deactivate announcement ${announcement.id}:`, updateError);
          }
          return;

        default:
          console.warn(`Unknown schedule type: ${announcement.scheduleType}`);
          return;
      }

      // Update the next send time
      try {
        await postgres.scheduledAnnouncement.update({
          where: { id: announcement.id },
          data: { nextSendAt },
        });
        console.log(`Updated next send time for announcement "${announcement.title}" to ${nextSendAt.toISOString()}`);
      } catch (updateError) {
        console.error(`Failed to update next send time for announcement ${announcement.id}:`, updateError);
      }

    } catch (error) {
      console.error(`Error updating next send time for announcement ${announcement.id}:`, error);
    }
  }
}

// Start the scheduler when the module is loaded
if (typeof window === "undefined") {
  // Only start on the server side
  const scheduler = AnnouncementScheduler.getInstance();
  scheduler.start();
}
