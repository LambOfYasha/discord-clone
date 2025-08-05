import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = Promise<{
  conversationId: string;
}>;

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();
    const { conversationId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Conversation ID missing", { status: 400 });
    }

    // Verify the conversation exists and user has access to it
    const conversation = await postgres.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          {
            memberOne: {
              profileId: profile.id,
            },
          },
          {
            memberTwo: {
              profileId: profile.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found or access denied", { status: 404 });
    }

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[CONVERSATION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 