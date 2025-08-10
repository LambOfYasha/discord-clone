import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, message, serverId, channelId, scheduleType, scheduleData } = body;

    if (!title || !message || !serverId || !channelId || !scheduleType) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if user is a member of the server
    const member = await db.member.findFirst({
      where: {
        serverId,
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Not a member of this server", { status: 403 });
    }

    // Check if user has moderator permissions
    if (member.role === "GUEST") {
      return new NextResponse("Insufficient permissions", { status: 403 });
    }

    // Calculate next send time based on schedule type
    const now = new Date();
    let nextSendAt = new Date();

    switch (scheduleType) {
      case "DAILY":
        nextSendAt.setDate(now.getDate() + 1);
        break;
      case "WEEKLY":
        nextSendAt.setDate(now.getDate() + 7);
        break;
      case "MONTHLY":
        nextSendAt.setMonth(now.getMonth() + 1);
        break;
      case "CUSTOM":
        // For custom schedules, use the provided schedule data
        if (scheduleData?.nextSendAt) {
          nextSendAt = new Date(scheduleData.nextSendAt);
        }
        break;
      default:
        return new NextResponse("Invalid schedule type", { status: 400 });
    }

    const announcement = await db.scheduledAnnouncement.create({
      data: {
        title,
        message,
        serverId,
        channelId,
        creatorProfileId: profile.id,
        scheduleType,
        scheduleData,
        nextSendAt,
      },
      include: {
        server: true,
        channel: true,
        creatorProfile: true,
      },
    });

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("[ANNOUNCEMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is required", { status: 400 });
    }

    // Check if user is a member of the server
    const member = await db.member.findFirst({
      where: {
        serverId,
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Not a member of this server", { status: 403 });
    }

    const announcements = await db.scheduledAnnouncement.findMany({
      where: {
        serverId,
      },
      include: {
        server: true,
        channel: true,
        creatorProfile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("[ANNOUNCEMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
