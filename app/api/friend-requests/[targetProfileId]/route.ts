import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { targetProfileId: string } }
) {
  try {
    const profile = await currentProfile();
    const { action } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.targetProfileId) {
      return new NextResponse("Target Profile ID missing", { status: 400 });
    }

    if (!action || !["accept", "reject"].includes(action)) {
      return new NextResponse("Invalid action", { status: 400 });
    }

    // Find the friend request
    const friendRequest = await postgres.friendRequest.findFirst({
      where: {
        requesterProfileId: params.targetProfileId,
        targetProfileId: profile.id,
        status: "PENDING",
      },
    });

    if (!friendRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    // Update the friend request status
    const updatedRequest = await postgres.friendRequest.update({
      where: {
        id: friendRequest.id,
      },
      data: {
        status: action === "accept" ? "ACCEPTED" : "REJECTED",
      },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.log("[FRIEND_REQUEST_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { targetProfileId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.targetProfileId) {
      return new NextResponse("Target Profile ID missing", { status: 400 });
    }

    // Find and delete the friend request
    const friendRequest = await postgres.friendRequest.findFirst({
      where: {
        requesterProfileId: profile.id,
        targetProfileId: params.targetProfileId,
        status: "PENDING",
      },
    });

    if (!friendRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    await postgres.friendRequest.delete({
      where: {
        id: friendRequest.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[FRIEND_REQUEST_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 