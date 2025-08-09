import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { MemberRole, ChannelType } from "@/prisma/generated/postgres";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Server ID missing", { status: 400 });

    const events = await postgres.serverEvent.findMany({
      where: { serverId },
      orderBy: { scheduledStartTime: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.log("[EVENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Server ID missing", { status: 400 });

    const body = await req.json();
    const {
      title,
      description,
      type,
      otherLocationType,
      voiceChannelId,
      textChannelId,
      externalUrl,
      location,
      scheduledStartTime,
      scheduledEndTime,
    } = body;

    const server = await postgres.server.findUnique({
      where: { id: serverId },
      include: {
        members: true,
      },
    });
    if (!server) return new NextResponse("Server not found", { status: 404 });
    const me = server.members.find((m) => m.profileId === profile.id);
    if (!me || ![MemberRole.ADMIN, MemberRole.MODERATOR].includes(me.role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!title || !type || !scheduledStartTime) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Per-type required fields
    if (type === "VOICE" && !voiceChannelId) {
      return new NextResponse("Voice channel is required for voice events", { status: 400 });
    }
    if (type === "OTHER") {
      if (!otherLocationType) {
        return new NextResponse("Location type is required for 'Other' events", { status: 400 });
      }
      if (otherLocationType === "TEXT_CHANNEL" && !textChannelId) {
        return new NextResponse("Text channel is required for 'Text channel' events", { status: 400 });
      }
      if (otherLocationType === "EXTERNAL" && !externalUrl) {
        return new NextResponse("External link is required for 'External' events", { status: 400 });
      }
      if (otherLocationType === "LOCATION" && !location) {
        return new NextResponse("Location is required for 'Physical location' events", { status: 400 });
      }
    }

    if (voiceChannelId) {
      const voice = await postgres.channel.findFirst({ where: { id: voiceChannelId, serverId } });
      if (!voice || voice.type !== ChannelType.AUDIO) {
        return new NextResponse("Invalid voice channel", { status: 400 });
      }
    }
    if (textChannelId) {
      const text = await postgres.channel.findFirst({ where: { id: textChannelId, serverId } });
      if (!text || text.type !== ChannelType.TEXT) {
        return new NextResponse("Invalid text channel", { status: 400 });
      }
    }

    const event = await postgres.serverEvent.create({
      data: {
        serverId,
        creatorProfileId: profile.id,
        title,
        description: description || null,
        type,
        otherLocationType: otherLocationType || null,
        voiceChannelId: voiceChannelId || null,
        textChannelId: textChannelId || null,
        externalUrl: externalUrl || null,
        location: location || null,
        scheduledStartTime: new Date(scheduledStartTime),
        scheduledEndTime: scheduledEndTime ? new Date(scheduledEndTime) : null,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log("[EVENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


