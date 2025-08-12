import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db, mongo } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string; ticketId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId, ticketId } = await params;

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
        ticketSystem: true,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    const ticket = await db.ticket.findFirst({
      where: {
        id: ticketId,
        ticketSystemId: server.ticketSystem?.id,
        ...(member.role === MemberRole.GUEST && {
          requesterProfileId: profile.id,
        }),
      },
    });

    if (!ticket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    const messages = await db.ticketMessage.findMany({
      where: {
        ticketId: ticketId,
        ...(member.role === MemberRole.GUEST && {
          isInternal: false,
        }),
      },
      include: {
        senderProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[TICKET_MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string; ticketId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId, ticketId } = await params;

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
        ticketSystem: {
          include: {
            channel: true,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    const ticket = await db.ticket.findFirst({
      where: {
        id: ticketId,
        ticketSystemId: server.ticketSystem?.id,
        ...(member.role === MemberRole.GUEST && {
          requesterProfileId: profile.id,
        }),
      },
    });

    if (!ticket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    // Check if ticket is closed
    if (ticket.status === "CLOSED" || ticket.status === "RESOLVED") {
      return new NextResponse("Cannot add messages to closed tickets", { status: 400 });
    }

    const body = await req.json();
    const { content, fileUrl, isInternal } = body;

    if (!content) {
      return new NextResponse("Message content is required", { status: 400 });
    }

    // Only moderators and admins can send internal messages
    if (isInternal && member.role === MemberRole.GUEST) {
      return new NextResponse("Insufficient permissions to send internal messages", { status: 403 });
    }

    const message = await db.ticketMessage.create({
      data: {
        content,
        fileUrl: fileUrl || null,
        isInternal: isInternal || false,
        ticketId: ticketId,
        senderProfileId: profile.id,
      },
      include: {
        senderProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    // Update ticket's last activity
    await db.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        lastActivity: new Date(),
      },
    });

    // Post notification to the designated channel for new messages (only for non-internal messages)
    if (server.ticketSystem?.channel && !isInternal) {
      try {
        const ticket = await db.ticket.findUnique({
          where: { id: ticketId },
          select: { ticketNumber: true, title: true }
        });

        if (ticket) {
          const messagePreview = content.length > 100 ? content.substring(0, 100) + "..." : content;
          const member = await db.member.findFirst({
            where: {
              serverId: serverId,
              profileId: profile.id,
            },
          });

          if (member) {
            await mongo.message.create({
              data: {
                content: `💬 **New Message** - ${ticket.ticketNumber}\n\n**From:** ${profile.name}\n**Preview:** ${messagePreview}\n\n**Ticket:** ${ticket.title}`,
                channelId: server.ticketSystem.channel.id,
                memberId: member.id,
              },
            });
          }
        }
      } catch (error) {
        console.error("Failed to post message notification to channel:", error);
        // Don't fail the message creation if channel posting fails
      }
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("[TICKET_MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
