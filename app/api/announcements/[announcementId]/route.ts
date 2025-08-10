import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ announcementId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { announcementId } = await params;
    const body = await req.json();
    const { title, message, channelId, scheduleType, scheduleData, isActive } = body;

    // Get the announcement
    const announcement = await postgres.scheduledAnnouncement.findUnique({
      where: {
        id: announcementId,
      },
      include: {
        server: true,
      },
    });

    if (!announcement) {
      return new NextResponse("Announcement not found", { status: 404 });
    }

    // Check if user is a member of the server
    const member = await postgres.member.findFirst({
      where: {
        serverId: announcement.serverId,
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Not a member of this server", { status: 403 });
    }

    // Check if user has moderator permissions or is the creator
    if (member.role === "GUEST" && announcement.creatorProfileId !== profile.id) {
      return new NextResponse("Insufficient permissions", { status: 403 });
    }

    // Calculate next send time
    let nextSendAt = announcement.nextSendAt;
    
    // If scheduleData contains nextSendAt, use it (from form calculation)
    if (scheduleData?.nextSendAt) {
      nextSendAt = new Date(scheduleData.nextSendAt);
    } else if (scheduleType && scheduleType !== announcement.scheduleType) {
      // Fallback: recalculate if schedule type changed and no nextSendAt provided
      const now = new Date();
      switch (scheduleType) {
        case "DAILY":
          nextSendAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case "WEEKLY":
          nextSendAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case "MONTHLY":
          nextSendAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
          break;
        case "CUSTOM":
          // For custom, we need a specific date/time
          break;
      }
    }

    const updatedAnnouncement = await postgres.scheduledAnnouncement.update({
      where: {
        id: announcementId,
      },
      data: {
        title,
        message,
        channelId,
        scheduleType,
        scheduleData,
        isActive,
        nextSendAt,
      },
      include: {
        server: true,
        channel: true,
        creatorProfile: true,
      },
    });

    return NextResponse.json(updatedAnnouncement);
  } catch (error) {
    console.error("[ANNOUNCEMENT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ announcementId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { announcementId } = await params;

    // Get the announcement
    const announcement = await postgres.scheduledAnnouncement.findUnique({
      where: {
        id: announcementId,
      },
      include: {
        server: true,
      },
    });

    if (!announcement) {
      return new NextResponse("Announcement not found", { status: 404 });
    }

    // Check if user is a member of the server
    const member = await postgres.member.findFirst({
      where: {
        serverId: announcement.serverId,
        profileId: profile.id,
      },
    });

    if (!member) {
      return new NextResponse("Not a member of this server", { status: 403 });
    }

    // Check if user has moderator permissions or is the creator
    if (member.role === "GUEST" && announcement.creatorProfileId !== profile.id) {
      return new NextResponse("Insufficient permissions", { status: 403 });
    }

    await postgres.scheduledAnnouncement.delete({
      where: {
        id: announcementId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[ANNOUNCEMENT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
