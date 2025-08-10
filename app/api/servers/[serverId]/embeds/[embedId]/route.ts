import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db, mongo } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { serverId: string; embedId: string } }
) {
  try {
    const profile = await currentProfile();
    const { serverId, embedId } = await params;

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

    // Get embed from PostgreSQL (primary database)
    const embed = await db.embed.findUnique({
      where: {
        id: embedId,
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
    });

    if (!embed) {
      return new NextResponse("Embed not found", { status: 404 });
    }

    return NextResponse.json(embed);
  } catch (error) {
    console.error("[EMBED_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { serverId: string; embedId: string } }
) {
  try {
    const profile = await currentProfile();
    const { serverId, embedId } = await params;

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

    // Check if embed exists and user has permission to edit
    const existingEmbed = await db.embed.findUnique({
      where: {
        id: embedId,
        serverId,
      },
    });

    if (!existingEmbed) {
      return new NextResponse("Embed not found", { status: 404 });
    }

    // Only creator or admin/moderator can edit
    if (existingEmbed.creatorProfileId !== profile.id && member.role === "GUEST") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Update embed in PostgreSQL (primary database)
    const embed = await db.embed.update({
      where: {
        id: embedId,
      },
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
        channelId: channelId || null,
      },
    });

    // Delete existing fields and create new ones
    await db.embedField.deleteMany({
      where: {
        embedId,
      },
    });

    if (fields && fields.length > 0) {
      await Promise.all(
        fields.map((field: any, index: number) =>
          db.embedField.create({
            data: {
              name: field.name,
              value: field.value,
              inline: field.inline,
              embedId,
              order: index,
            },
          })
        )
      );
    }

    // Note: We don't update embeds in MongoDB since they use different ID formats
    // PostgreSQL is the primary database for embed storage
    // MongoDB is only used for messages (which include embed data as JSON)

    // Update or create message in the selected channel with the embed data
    if (channelId) {
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

        // Check if there's already a message with this embed
        const existingMessage = await mongo.message.findFirst({
          where: {
            content: {
              contains: `"embedId":"${embedId}"`,
            },
          },
        });

        if (existingMessage) {
          // Update existing message
          await mongo.message.update({
            where: {
              id: existingMessage.id,
            },
            data: {
              content: embedContent,
              channelId: channelId,
            },
          });
          console.log(`Embed message updated in channel ${channelId}`);
        } else {
          // Create new message
          await mongo.message.create({
            data: {
              content: embedContent,
              channelId: channelId,
              memberId: member.id,
            },
          });
          console.log(`New embed message created in channel ${channelId}`);
        }
      } catch (messageError) {
        console.error("Failed to update embed message:", messageError);
        // Continue even if message update fails - the embed is still updated
      }
    }

    return NextResponse.json(embed);
  } catch (error) {
    console.error("[EMBED_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { serverId: string; embedId: string } }
) {
  try {
    const profile = await currentProfile();
    const { serverId, embedId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    // Check if embed exists and user has permission to delete
    const existingEmbed = await db.embed.findUnique({
      where: {
        id: embedId,
        serverId,
      },
    });

    if (!existingEmbed) {
      return new NextResponse("Embed not found", { status: 404 });
    }

    // Only creator or admin/moderator can delete
    if (existingEmbed.creatorProfileId !== profile.id && member.role === "GUEST") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Delete embed fields first (cascade should handle this, but being explicit)
    await db.embedField.deleteMany({
      where: {
        embedId,
      },
    });

    // Delete embed from PostgreSQL (primary database)
    await db.embed.delete({
      where: {
        id: embedId,
      },
    });

    // Note: We don't delete embeds from MongoDB since they use different ID formats
    // PostgreSQL is the primary database for embed storage
    // MongoDB is only used for messages (which include embed data as JSON)

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[EMBED_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
