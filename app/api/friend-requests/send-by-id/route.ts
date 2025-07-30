import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { userId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!userId) {
      return new NextResponse("User ID missing", { status: 400 });
    }

    if (profile.id === userId) {
      return new NextResponse("Cannot send friend request to yourself", { status: 400 });
    }

    // Check if target profile exists
    const targetProfile = await postgres.profile.findUnique({
      where: {
        id: userId,
      },
    });

    if (!targetProfile) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if friend request already exists
    const existingRequest = await postgres.friendRequest.findFirst({
      where: {
        OR: [
          {
            requesterProfileId: profile.id,
            targetProfileId: userId,
          },
          {
            requesterProfileId: userId,
            targetProfileId: profile.id,
          },
        ],
      },
    });

    if (existingRequest) {
      if (existingRequest.status === "ACCEPTED") {
        return new NextResponse("Already friends with this user", { status: 409 });
      } else if (existingRequest.status === "PENDING") {
        if (existingRequest.requesterProfileId === profile.id) {
          return new NextResponse("Friend request already sent", { status: 409 });
        } else {
          return new NextResponse("Friend request already received from this user", { status: 409 });
        }
      } else if (existingRequest.status === "REJECTED") {
        // Update the rejected request to pending
        const updatedRequest = await postgres.friendRequest.update({
          where: {
            id: existingRequest.id,
          },
          data: {
            status: "PENDING",
            requesterProfileId: profile.id,
            targetProfileId: userId,
          },
          include: {
            targetProfile: true,
          },
        });
        return NextResponse.json(updatedRequest);
      }
    }

    // Create friend request
    const friendRequest = await postgres.friendRequest.create({
      data: {
        requesterProfileId: profile.id,
        targetProfileId: userId,
        status: "PENDING",
      },
      include: {
        targetProfile: true,
      },
    });

    return NextResponse.json(friendRequest);
  } catch (error) {
    console.log("[FRIEND_REQUESTS_SEND_BY_ID_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 