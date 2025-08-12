import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID required", { status: 400 });
    }

    // Get the server with ticket system
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
        channels: {
          where: {
            type: "TEXT",
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    // Get all ticket systems for this server
    const ticketSystems = await db.ticketSystem.findMany({
      where: {
        serverId: serverId,
      },
      include: {
        channel: true,
      },
    });

    // Get all channels for this server
    const channels = await db.channel.findMany({
      where: {
        serverId: serverId,
        type: "TEXT",
      },
    });

    // Test member lookup
    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json({
      server: {
        id: server.id,
        name: server.name,
        hasTicketSystem: !!server.ticketSystem,
        ticketSystem: server.ticketSystem,
        channels: server.channels,
      },
      allTicketSystems: ticketSystems,
      allChannels: channels,
      currentProfile: {
        id: profile.id,
        name: profile.name,
      },
      member: member ? {
        id: member.id,
        role: member.role,
        profileId: member.profileId,
      } : null,
    });
  } catch (error) {
    console.error("[TEST_TICKET_SYSTEM]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
