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
    console.log("[FRIEND_REQUESTS_POST] Starting request");
    
    // Test database connection
    try {
      await postgres.$queryRaw`SELECT 1`;
      console.log("[FRIEND_REQUESTS_POST] Database connection successful");
    } catch (dbError) {
      console.error("[FRIEND_REQUESTS_POST] Database connection failed:", dbError);
      return new NextResponse("Database connection failed", { status: 500 });
    }
    
    const profile = await currentProfile();
    console.log("[FRIEND_REQUESTS_POST] Profile:", profile?.id);
    
    const body = await req.json();
    const { targetProfileId } = body;
    console.log("[FRIEND_REQUESTS_POST] Target Profile ID:", targetProfileId);

    if (!profile) {
      console.log("[FRIEND_REQUESTS_POST] No profile found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!targetProfileId) {
      console.log("[FRIEND_REQUESTS_POST] Target Profile ID missing");
      return new NextResponse("Target Profile ID missing", { status: 400 });
    }

    if (profile.id === targetProfileId) {
      console.log("[FRIEND_REQUESTS_POST] Cannot send friend request to yourself");
      return new NextResponse("Cannot send friend request to yourself", { status: 400 });
    }

    // Check if target profile exists
    console.log("[FRIEND_REQUESTS_POST] Checking if target profile exists");
    const targetProfile = await postgres.profile.findUnique({
      where: {
        id: targetProfileId,
      },
    });

    if (!targetProfile) {
      console.log("[FRIEND_REQUESTS_POST] Target profile not found");
      return new NextResponse("Target profile not found", { status: 404 });
    }
    console.log("[FRIEND_REQUESTS_POST] Target profile found:", targetProfile.id);

    // Check if friend request already exists
    console.log("[FRIEND_REQUESTS_POST] Checking for existing friend request");
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
      console.log("[FRIEND_REQUESTS_POST] Friend request already exists");
      return new NextResponse("Friend request already exists", { status: 409 });
    }
    console.log("[FRIEND_REQUESTS_POST] No existing friend request found");

    // Create friend request
    console.log("[FRIEND_REQUESTS_POST] Creating friend request");
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

    console.log("[FRIEND_REQUESTS_POST] Friend request created successfully:", friendRequest.id);
    return NextResponse.json(friendRequest);
  } catch (error) {
    console.error("[FRIEND_REQUESTS_POST] Error:", error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
    
    return new NextResponse("Internal Error", { status: 500 });
  }
} 