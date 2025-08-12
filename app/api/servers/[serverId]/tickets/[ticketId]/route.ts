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
      include: {
        requesterProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        assignedProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        messages: {
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
        },
      },
    });

    if (!ticket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("[TICKET_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
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
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
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
      return new NextResponse("Server not found or insufficient permissions", { status: 404 });
    }

    const body = await req.json();
    const { status, priority, category, assignedProfileId } = body;

    const ticket = await db.ticket.findFirst({
      where: {
        id: ticketId,
        serverId: serverId,
      },
      include: {
        requesterProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        assignedProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!ticket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    // Validate assignedProfileId if provided
    if (assignedProfileId) {
      const assignedMember = await db.member.findFirst({
        where: {
          serverId: serverId,
          profileId: assignedProfileId,
          role: {
            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
          },
        },
      });

      if (!assignedMember) {
        return new NextResponse("Invalid assigned user", { status: 400 });
      }
    }

    const updatedTicket = await db.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(category && { category }),
        ...(assignedProfileId !== undefined && { assignedProfileId }),
        lastActivity: new Date(),
      },
      include: {
        requesterProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        assignedProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    // Post notifications to the designated channel for important updates
    if (server.ticketSystem?.channel) {
      try {
        let notificationMessage = `📝 **Ticket Update** - ${ticket.ticketNumber}\n\n`;

        if (status && status !== ticket.status) {
          const statusEmoji = {
            OPEN: "🟢",
            IN_PROGRESS: "🟡", 
            WAITING_FOR_USER: "🟠",
            RESOLVED: "✅",
            CLOSED: "🔒"
          };
          notificationMessage += `${statusEmoji[status as keyof typeof statusEmoji] || "📋"} **Status changed to:** ${status}\n`;
        }

        if (assignedProfileId !== undefined && assignedProfileId !== ticket.assignedProfileId) {
          if (assignedProfileId) {
            const assignedProfile = await db.profile.findUnique({
              where: { id: assignedProfileId },
              select: { name: true }
            });
            notificationMessage += `👤 **Assigned to:** ${assignedProfile?.name || "Unknown"}\n`;
          } else {
            notificationMessage += `👤 **Unassigned**\n`;
          }
        }

        if (priority && priority !== ticket.priority) {
          const priorityEmoji = {
            LOW: "🟢",
            MEDIUM: "🟡",
            HIGH: "🟠",
            URGENT: "🔴"
          };
          notificationMessage += `${priorityEmoji[priority as keyof typeof priorityEmoji] || "📊"} **Priority changed to:** ${priority}\n`;
        }

        if (category && category !== ticket.category) {
          notificationMessage += `📂 **Category changed to:** ${category}\n`;
        }

        notificationMessage += `\n**Updated by:** ${profile.name}`;

        const member = await db.member.findFirst({
          where: {
            serverId: serverId,
            profileId: profile.id,
          },
        });

        if (member) {
          await mongo.message.create({
            data: {
              content: notificationMessage,
              channelId: server.ticketSystem.channel.id,
              memberId: member.id,
            },
          });
        }
      } catch (error) {
        console.error("Failed to post ticket update notification to channel:", error);
        // Don't fail the ticket update if channel posting fails
      }
    }

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error("[TICKET_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
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
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
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
      return new NextResponse("Server not found or insufficient permissions", { status: 404 });
    }

    const ticket = await db.ticket.findFirst({
      where: {
        id: ticketId,
        serverId: serverId,
      },
    });

    if (!ticket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    // Post deletion notification to the designated channel
    if (server.ticketSystem?.channel) {
      try {
        const member = await db.member.findFirst({
          where: {
            serverId: serverId,
            profileId: profile.id,
          },
        });

        if (member) {
          await mongo.message.create({
            data: {
              content: `🗑️ **Ticket Deleted** - ${ticket.ticketNumber}\n\n**Title:** ${ticket.title}\n**Deleted by:** ${profile.name}\n\nThis ticket and all its messages have been permanently removed.`,
              channelId: server.ticketSystem.channel.id,
              memberId: member.id,
            },
          });
        }
      } catch (error) {
        console.error("Failed to post ticket deletion notification to channel:", error);
        // Don't fail the deletion if channel posting fails
      }
    }

    // Delete all messages first
    await db.ticketMessage.deleteMany({
      where: {
        ticketId: ticketId,
      },
    });

    // Delete the ticket
    await db.ticket.delete({
      where: {
        id: ticketId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TICKET_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
