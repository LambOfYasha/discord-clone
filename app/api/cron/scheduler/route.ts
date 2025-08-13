import { NextRequest, NextResponse } from "next/server";
import { db, mongo } from "@/lib/db";

// This endpoint is designed to be called by a cron job
// It should be protected with a secret key in production
export async function POST(req: NextRequest) {
  try {
    // Validate secret key for security
    const authHeader = req.headers.get('authorization');
    if (!process.env.CRON_SECRET_KEY) {
      console.warn("[CRON_SCHEDULER] No CRON_SECRET_KEY set in environment variables");
    } else if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      console.error("[CRON_SCHEDULER] Invalid authorization header");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const now = new Date();
    
    // Find all active scheduled embeds that are due to be posted
    const scheduledEmbeds = await db.embed.findMany({
      where: {
        isScheduled: true,
        isActive: true,
        nextSendAt: {
          lte: now, // Due to be posted now or in the past
        },
        channelId: {
          not: null, // Must have a channel to post to
        },
      },
      include: {
        fields: {
          orderBy: {
            order: "asc",
          },
        },
        creatorProfile: true,
        channel: {
          include: {
            server: {
              include: {
                members: true,
              },
            },
          },
        },
      },
    });

    console.log(`[CRON_SCHEDULER] Found ${scheduledEmbeds.length} scheduled embeds to process`);

    let processedCount = 0;
    let errorCount = 0;

    for (const embed of scheduledEmbeds) {
      try {
        // Find the member who created the embed
        const member = embed.channel?.server?.members.find(
          (m) => m.profileId === embed.creatorProfileId
        );

        if (!member) {
          console.error(`[CRON_SCHEDULER] No member found for embed ${embed.id}`);
          errorCount++;
          continue;
        }

        // Create embed content as JSON string
        const embedContent = JSON.stringify({
          type: "embed",
          embedId: embed.id,
          title: embed.title,
          description: embed.description,
          url: embed.url,
          color: embed.color,
          imageUrl: embed.imageUrl,
          thumbnailUrl: embed.thumbnailUrl,
          authorName: embed.authorName,
          authorUrl: embed.authorUrl,
          authorIconUrl: embed.authorIconUrl,
          footerText: embed.footerText,
          footerIconUrl: embed.footerIconUrl,
          timestamp: embed.timestamp,
          fields: embed.fields.map(field => ({
            name: field.name,
            value: field.value,
            inline: field.inline,
          })),
        });

        // Create message in MongoDB
        await mongo.message.create({
          data: {
            content: embedContent,
            channelId: embed.channelId!,
            memberId: member.id,
          },
        });

        // Update the embed with last sent time and calculate next send time
        let nextSendAt = null;
        let isActive = true;

        if (embed.repeatType === "daily") {
          nextSendAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Next day
        } else if (embed.repeatType === "weekly" && embed.repeatDays) {
          const repeatDays = embed.repeatDays as string[];
          if (repeatDays.length > 0) {
            // Find next occurrence based on selected days
            const currentDay = now.getDay();
            const nextDay = repeatDays
              .map(d => parseInt(d))
              .sort((a, b) => a - b)
              .find(day => day > currentDay) || parseInt(repeatDays[0]);
            
            const daysToAdd = nextDay > currentDay ? nextDay - currentDay : 7 - currentDay + nextDay;
            nextSendAt = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
          } else {
            isActive = false; // No repeat days selected
          }
        } else if (embed.repeatType === "monthly") {
          // Add one month
          nextSendAt = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        } else {
          // No repeat, deactivate
          isActive = false;
        }

        // Update embed
        await db.embed.update({
          where: { id: embed.id },
          data: {
            lastSentAt: now,
            nextSendAt,
            isActive,
          },
        });

        console.log(`[CRON_SCHEDULER] Posted scheduled embed ${embed.id} to channel ${embed.channelId}`);
        processedCount++;

      } catch (error) {
        console.error(`[CRON_SCHEDULER] Failed to post scheduled embed ${embed.id}:`, error);
        errorCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed: processedCount,
      errors: errorCount,
      timestamp: now.toISOString()
    });

  } catch (error) {
    console.error("[CRON_SCHEDULER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    message: "Cron scheduler endpoint is running"
  });
}
