import { db } from "@/lib/db";

export class NotificationService {
  static async createFollowNotification(
    followerProfileId: string,
    followedProfileId: string
  ) {
    try {
      const follower = await db.profile.findUnique({
        where: { id: followerProfileId }
      });

      const followed = await db.profile.findUnique({
        where: { id: followedProfileId }
      });

      if (!follower || !followed) {
        throw new Error("Profile not found");
      }

      // Create notification for the followed user
      await db.notification.create({
        data: {
          recipientProfileId: followedProfileId,
          type: "FRIEND_ACTIVITY",
          title: "New Follower",
          content: `${follower.name} started following you`,
          relatedProfileId: followerProfileId
        }
      });
    } catch (error) {
      console.error("Failed to create follow notification:", error);
    }
  }

  static async createServerFollowNotification(
    followerProfileId: string,
    serverId: string
  ) {
    try {
      const follower = await db.profile.findUnique({
        where: { id: followerProfileId }
      });

      const server = await db.server.findUnique({
        where: { id: serverId }
      });

      if (!follower || !server) {
        throw new Error("Profile or server not found");
      }

      // Create notification for server owner
      await db.notification.create({
        data: {
          recipientProfileId: server.profileId,
          type: "SERVER_ACTIVITY",
          title: "New Server Follower",
          content: `${follower.name} started following your server ${server.name}`,
          relatedProfileId: followerProfileId,
          relatedServerId: serverId
        }
      });
    } catch (error) {
      console.error("Failed to create server follow notification:", error);
    }
  }

  static async createUserOnlineNotification(
    userId: string,
    onlineUserId: string
  ) {
    try {
      // Get all users who are following the online user
      const followers = await db.follow.findMany({
        where: { followingProfileId: onlineUserId },
        include: { followerProfile: true }
      });

      const onlineUser = await db.profile.findUnique({
        where: { id: onlineUserId }
      });

      if (!onlineUser) return;

      // Create notifications for all followers
      const notifications = followers.map(follow => ({
        recipientProfileId: follow.followerProfileId,
        type: "FRIEND_ONLINE" as const,
        title: "Friend Online",
        content: `${onlineUser.name} is now online`,
        relatedProfileId: onlineUserId
      }));

      await db.notification.createMany({
        data: notifications
      });
    } catch (error) {
      console.error("Failed to create online notification:", error);
    }
  }

  static async createServerActivityNotification(
    serverId: string,
    activityType: string,
    content: string
  ) {
    try {
      const server = await db.server.findUnique({
        where: { id: serverId }
      });

      if (!server) return;

      // Get all users who are following this server
      const followers = await db.serverFollow.findMany({
        where: { serverId },
        include: { followerProfile: true }
      });

      // Create notifications for all server followers
      const notifications = followers.map(follow => ({
        recipientProfileId: follow.followerProfileId,
        type: "SERVER_ACTIVITY" as const,
        title: `Server Activity - ${server.name}`,
        content,
        relatedServerId: serverId
      }));

      await db.notification.createMany({
        data: notifications
      });
    } catch (error) {
      console.error("Failed to create server activity notification:", error);
    }
  }
} 