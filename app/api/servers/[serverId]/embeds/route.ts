import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db, mongo } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      url,
      color,
      imageUrl,
      thumbnailUrl,
      authorName,
      authorUrl,
      authorIconUrl,
      footerText,
      footerIconUrl,
      timestamp,
      channelId,
      fields,
      // Scheduling data
      isScheduled,
      scheduledDate,
      scheduledTime,
      repeatType,
      repeatDays,
    } = body;

    // Validate server membership and permissions
    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member || member.role === "GUEST") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Calculate scheduled date and time
    let scheduledDateTime = null;
    let nextSendAt = null;
    
    if (isScheduled && scheduledDate && scheduledTime) {
      scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      nextSendAt = scheduledDateTime;
    }

    // Create embed in PostgreSQL (primary database)
    const embed = await db.embed.create({
      data: {
        title: title || null,
        description: description || null,
        url: url || null,
        color: color || null,
        imageUrl: imageUrl || null,
        thumbnailUrl: thumbnailUrl || null,
        authorName: authorName || null,
        authorUrl: authorUrl || null,
        authorIconUrl: authorIconUrl || null,
        footerText: footerText || null,
        footerIconUrl: footerIconUrl || null,
        timestamp: timestamp ? new Date(timestamp) : null,
        serverId,
        channelId: channelId || null,
        creatorProfileId: profile.id,
        // Scheduling fields
        isScheduled: isScheduled || false,
        scheduledDate: scheduledDateTime,
        repeatType: repeatType || "none",
        repeatDays: repeatDays || [],
        isActive: isScheduled || false,
        nextSendAt,
      },
    });

    // Create embed fields in PostgreSQL
    if (fields && fields.length > 0) {
      await Promise.all(
        fields.map((field: any, index: number) =>
          db.embedField.create({
            data: {
              name: field.name,
              value: field.value,
              inline: field.inline,
              embedId: embed.id,
              order: index,
            },
          })
        )
      );
    }

    // Note: We don't create embeds in MongoDB since they use different ID formats
    // PostgreSQL is the primary database for embed storage
    // MongoDB is only used for messages (which include embed data as JSON)

    // Create a message in the selected channel with the embed data
    // Only create message immediately if not scheduled
    if (channelId && !isScheduled) {
      try {
        // Create embed content as JSON string
        const embedContent = JSON.stringify({
          type: "embed",
          embedId: embed.id,
          title: title || null,
          description: description || null,
          url: url || null,
          color: color || null,
          imageUrl: imageUrl || null,
          thumbnailUrl: thumbnailUrl || null,
          authorName: authorName || null,
          authorUrl: authorUrl || null,
          authorIconUrl: authorIconUrl || null,
          footerText: footerText || null,
          footerIconUrl: footerIconUrl || null,
          timestamp: timestamp || null,
          fields: fields || [],
        });

        // Create message in MongoDB
        await mongo.message.create({
          data: {
            content: embedContent,
            channelId: channelId,
            memberId: member.id,
          },
        });

        console.log(`Embed message created in channel ${channelId}`);
      } catch (messageError) {
        console.error("Failed to create embed message:", messageError);
        // Continue even if message creation fails - the embed is still saved
      }
    }

    // If scheduled, log the scheduling info
    if (isScheduled) {
      console.log(`Scheduled embed created: ${embed.id} for ${scheduledDateTime}`);
    }

    return NextResponse.json(embed);
  } catch (error) {
    console.error("[EMBEDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate server membership
    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    // Get embeds from PostgreSQL (primary database)
    const embeds = await db.embed.findMany({
      where: {
        serverId,
      },
      include: {
        creatorProfile: true,
        fields: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(embeds);
  } catch (error) {
    console.error("[EMBEDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
