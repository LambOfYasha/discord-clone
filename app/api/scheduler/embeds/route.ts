import { NextRequest, NextResponse } from "next/server";
import { db, mongo } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
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

    console.log(`Found ${scheduledEmbeds.length} scheduled embeds to process`);

    for (const embed of scheduledEmbeds) {
      try {
        // Find the member who created the embed
        const member = embed.channel?.server?.members.find(
          (m) => m.profileId === embed.creatorProfileId
        );

        if (!member) {
          console.error(`No member found for embed ${embed.id}`);
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

        console.log(`Posted scheduled embed ${embed.id} to channel ${embed.channelId}`);

      } catch (error) {
        console.error(`Failed to post scheduled embed ${embed.id}:`, error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed: scheduledEmbeds.length 
    });

  } catch (error) {
    console.error("[SCHEDULER_EMBEDS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// GET endpoint to check scheduled embeds (for debugging)
export async function GET() {
  try {
    const now = new Date();
    
    const scheduledEmbeds = await db.embed.findMany({
      where: {
        isScheduled: true,
        isActive: true,
      },
      include: {
        creatorProfile: true,
        channel: {
          include: {
            server: true,
          },
        },
      },
      orderBy: {
        nextSendAt: "asc",
      },
    });

    return NextResponse.json({
      total: scheduledEmbeds.length,
      embeds: scheduledEmbeds.map(embed => ({
        id: embed.id,
        title: embed.title,
        nextSendAt: embed.nextSendAt,
        repeatType: embed.repeatType,
        isActive: embed.isActive,
        channelName: embed.channel?.name,
        creatorName: embed.creatorProfile.name,
      })),
    });

  } catch (error) {
    console.error("[SCHEDULER_EMBEDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
