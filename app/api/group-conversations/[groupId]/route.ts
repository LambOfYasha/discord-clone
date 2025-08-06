import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = Promise<{
  groupId: string;
}>;

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();
    const { groupId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!groupId) {
      return new NextResponse("Group ID missing", { status: 400 });
    }

    // Verify the group conversation exists and user has access to it
    const groupConversation = await postgres.groupConversation.findFirst({
      where: {
        id: groupId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!groupConversation) {
      return new NextResponse("Group conversation not found or access denied", { status: 404 });
    }

    // Check if user is admin OR the creator of the group conversation
    const userMember = groupConversation.members.find(
      member => member.profileId === profile.id
    );

    const isAdmin = userMember && userMember.role === "ADMIN";
    const isCreator = groupConversation.profileId === profile.id;

    if (!isAdmin && !isCreator) {
      return new NextResponse("Only group admins or the creator can delete group conversations", { status: 403 });
    }

    // Delete all group messages in this conversation
    await postgres.groupMessage.deleteMany({
      where: {
        groupConversationId: groupConversation.id,
      },
    });

    // Delete all group conversation members
    await postgres.groupConversationMember.deleteMany({
      where: {
        groupConversationId: groupConversation.id,
      },
    });

    // Delete the group conversation
    await postgres.groupConversation.delete({
      where: {
        id: groupConversation.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[GROUP_CONVERSATION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 