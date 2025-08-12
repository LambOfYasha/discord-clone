import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@/prisma/generated/postgres";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

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

    return NextResponse.json(server.ticketSystem);
  } catch (error) {
    console.error("[TICKET_SYSTEM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

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
    });

    if (!server) {
      return new NextResponse("Server not found or insufficient permissions", { status: 404 });
    }

    const body = await req.json();
    const { channelId, welcomeMessage, maxOpenTickets, autoCloseHours } = body;

    if (!channelId) {
      return new NextResponse("Channel ID is required", { status: 400 });
    }

    // Check if channel exists and belongs to the server
    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        serverId: serverId,
        type: "TEXT",
      },
    });

    if (!channel) {
      return new NextResponse("Invalid channel", { status: 400 });
    }

    // Check if ticket system already exists
    const existingTicketSystem = await db.ticketSystem.findUnique({
      where: {
        serverId: serverId,
      },
    });

    if (existingTicketSystem) {
      return new NextResponse("Ticket system already exists for this server", { status: 400 });
    }

    const ticketSystem = await db.ticketSystem.create({
      data: {
        serverId: serverId,
        channelId,
        welcomeMessage: welcomeMessage || "",
        maxOpenTickets: maxOpenTickets || 3,
        autoCloseHours: autoCloseHours || 72,
      },
      include: {
        channel: true,
      },
    });

    return NextResponse.json(ticketSystem);
  } catch (error) {
    console.error("[TICKET_SYSTEM_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

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
    });

    if (!server) {
      return new NextResponse("Server not found or insufficient permissions", { status: 404 });
    }

    const body = await req.json();
    const { channelId, welcomeMessage, maxOpenTickets, autoCloseHours, isActive } = body;

    const ticketSystem = await db.ticketSystem.findUnique({
      where: {
        serverId: serverId,
      },
    });

    if (!ticketSystem) {
      return new NextResponse("Ticket system not found", { status: 404 });
    }

    // If channelId is provided, validate it
    if (channelId) {
      const channel = await db.channel.findFirst({
        where: {
          id: channelId,
          serverId: serverId,
          type: "TEXT",
        },
      });

      if (!channel) {
        return new NextResponse("Invalid channel", { status: 400 });
      }
    }

    const updatedTicketSystem = await db.ticketSystem.update({
      where: {
        serverId: serverId,
      },
      data: {
        ...(channelId && { channelId }),
        ...(welcomeMessage !== undefined && { welcomeMessage }),
        ...(maxOpenTickets !== undefined && { maxOpenTickets }),
        ...(autoCloseHours !== undefined && { autoCloseHours }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        channel: true,
      },
    });

    return NextResponse.json(updatedTicketSystem);
  } catch (error) {
    console.error("[TICKET_SYSTEM_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

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
    });

    if (!server) {
      return new NextResponse("Server not found or insufficient permissions", { status: 404 });
    }

    const ticketSystem = await db.ticketSystem.findUnique({
      where: {
        serverId: serverId,
      },
    });

    if (!ticketSystem) {
      return new NextResponse("Ticket system not found", { status: 404 });
    }

    // Delete all tickets and messages associated with this ticket system
    await db.ticketMessage.deleteMany({
      where: {
        ticket: {
          ticketSystemId: ticketSystem.id,
        },
      },
    });

    await db.ticket.deleteMany({
      where: {
        ticketSystemId: ticketSystem.id,
      },
    });

    await db.ticketSystem.delete({
      where: {
        serverId: serverId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TICKET_SYSTEM_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
