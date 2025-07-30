import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get pending requests (received by current user)
    const pendingRequests = await postgres.friendRequest.findMany({
      where: {
        targetProfileId: profile.id,
        status: "PENDING",
      },
      include: {
        requesterProfile: true,
      },
    });

    // Get sent requests (sent by current user)
    const sentRequests = await postgres.friendRequest.findMany({
      where: {
        requesterProfileId: profile.id,
        status: "PENDING",
      },
      include: {
        targetProfile: true,
      },
    });

    return NextResponse.json({
      pending: pendingRequests,
      sent: sentRequests,
    });
  } catch (error) {
    console.log("[FRIEND_REQUESTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { targetProfileId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!targetProfileId) {
      return new NextResponse("Target Profile ID missing", { status: 400 });
    }

    if (profile.id === targetProfileId) {
      return new NextResponse("Cannot send friend request to yourself", { status: 400 });
    }

    // Check if target profile exists
    const targetProfile = await postgres.profile.findUnique({
      where: {
        id: targetProfileId,
      },
    });

    if (!targetProfile) {
      return new NextResponse("Target profile not found", { status: 404 });
    }

    // Check if friend request already exists
    const existingRequest = await postgres.friendRequest.findFirst({
      where: {
        OR: [
          {
            requesterProfileId: profile.id,
            targetProfileId: targetProfileId,
          },
          {
            requesterProfileId: targetProfileId,
            targetProfileId: profile.id,
          },
        ],
      },
    });

    if (existingRequest) {
      return new NextResponse("Friend request already exists", { status: 409 });
    }

    // Create friend request
    const friendRequest = await postgres.friendRequest.create({
      data: {
        requesterProfileId: profile.id,
        targetProfileId: targetProfileId,
        status: "PENDING",
      },
      include: {
        targetProfile: true,
      },
    });

    return NextResponse.json(friendRequest);
  } catch (error) {
    console.log("[FRIEND_REQUESTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 