import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ targetProfileId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { action } = await req.json();
    const { targetProfileId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!targetProfileId) {
      return new NextResponse("Target Profile ID missing", { status: 400 });
    }

    if (!action || !["accept", "reject"].includes(action)) {
      return new NextResponse("Invalid action", { status: 400 });
    }

    // Find the message request
    const messageRequest = await postgres.messageRequest.findFirst({
      where: {
        requesterProfileId: targetProfileId,
        targetProfileId: profile.id,
        status: "PENDING",
      },
      include: {
        requesterProfile: true,
      },
    });

    if (!messageRequest) {
      return new NextResponse("Message request not found", { status: 404 });
    }

    // Update the message request status
    const updatedRequest = await postgres.messageRequest.update({
      where: {
        id: messageRequest.id,
      },
      data: {
        status: action === "accept" ? "ACCEPTED" : "REJECTED",
      },
      include: {
        requesterProfile: true,
      },
    });

    // If accepted, create a conversation between the users
    if (action === "accept") {
      // Get or create member records for both users
      const currentMember = await postgres.member.findFirst({
        where: {
          profileId: profile.id,
        },
      });

      const requesterMember = await postgres.member.findFirst({
        where: {
          profileId: messageRequest.requesterProfile.id,
        },
      });

      if (currentMember && requesterMember) {
        // Check if conversation already exists
        const existingConversation = await postgres.conversation.findFirst({
          where: {
            OR: [
              {
                memberOneId: currentMember.id,
                memberTwoId: requesterMember.id,
              },
              {
                memberOneId: requesterMember.id,
                memberTwoId: currentMember.id,
              },
            ],
          },
        });

        // Create conversation if it doesn't exist
        if (!existingConversation) {
          await postgres.conversation.create({
            data: {
              memberOneId: currentMember.id,
              memberTwoId: requesterMember.id,
              profileId: profile.id,
            },
          });
        }
      }
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.log("[MESSAGE_REQUEST_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ targetProfileId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { targetProfileId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!targetProfileId) {
      return new NextResponse("Target Profile ID missing", { status: 400 });
    }

    // Find and delete the message request
    const messageRequest = await postgres.messageRequest.findFirst({
      where: {
        requesterProfileId: profile.id,
        targetProfileId: targetProfileId,
        status: "PENDING",
      },
    });

    if (!messageRequest) {
      return new NextResponse("Message request not found", { status: 404 });
    }

    await postgres.messageRequest.delete({
      where: {
        id: messageRequest.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[MESSAGE_REQUEST_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 