import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Get current user's profile
    const currentProfile = await db.profile.findUnique({
      where: { userId }
    });

    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // Build where clause
    const whereClause: any = {
      recipientProfileId: currentProfile.id
    };

    if (type) {
      whereClause.type = type;
    }

    // Get notifications
    const notifications = await db.notification.findMany({
      where: whereClause,
      include: {
        relatedProfile: true,
        relatedServer: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: limit
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("[NOTIFICATIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { notificationId, isRead } = await req.json();

    if (!notificationId) {
      return new NextResponse("Notification ID is required", { status: 400 });
    }

    // Get current user's profile
    const currentProfile = await db.profile.findUnique({
      where: { userId }
    });

    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // Update notification
    const notification = await db.notification.update({
      where: {
        id: notificationId,
        recipientProfileId: currentProfile.id
      },
      data: {
        isRead: isRead
      }
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error("[NOTIFICATIONS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const notificationId = searchParams.get("notificationId");

    if (!notificationId) {
      return new NextResponse("Notification ID is required", { status: 400 });
    }

    // Get current user's profile
    const currentProfile = await db.profile.findUnique({
      where: { userId }
    });

    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // Delete notification
    await db.notification.delete({
      where: {
        id: notificationId,
        recipientProfileId: currentProfile.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[NOTIFICATIONS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 