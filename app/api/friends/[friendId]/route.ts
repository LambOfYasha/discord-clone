import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = Promise<{
  friendId: string;
}>;

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();
    const { friendId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!friendId) {
      return new NextResponse("Friend ID missing", { status: 400 });
    }

    // Find and delete the friend request relationship
    const friendRequest = await postgres.friendRequest.findFirst({
      where: {
        OR: [
          {
            requesterProfileId: profile.id,
            targetProfileId: friendId,
            status: "ACCEPTED",
          },
          {
            requesterProfileId: friendId,
            targetProfileId: profile.id,
            status: "ACCEPTED",
          },
        ],
      },
    });

    if (!friendRequest) {
      return new NextResponse("Friend relationship not found", { status: 404 });
    }

    // Delete the friend request
    await postgres.friendRequest.delete({
      where: {
        id: friendRequest.id,
      },
    });

    // Also delete any conversations between these users
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    const friendMember = await postgres.member.findFirst({
      where: {
        profileId: friendId,
      },
    });

    if (currentMember && friendMember) {
      const conversation = await postgres.conversation.findFirst({
        where: {
          OR: [
            {
              memberOneId: currentMember.id,
              memberTwoId: friendMember.id,
            },
            {
              memberOneId: friendMember.id,
              memberTwoId: currentMember.id,
            },
          ],
        },
      });

      if (conversation) {
        // Delete all direct messages in this conversation
        await postgres.directMessage.deleteMany({
          where: {
            conversationId: conversation.id,
          },
        });

        // Delete the conversation
        await postgres.conversation.delete({
          where: {
            id: conversation.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[FRIEND_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 