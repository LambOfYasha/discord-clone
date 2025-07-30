import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { content, fileUrl } = await req.json();
    const { searchParams } = new URL(req.url);
    const groupConversationId = searchParams.get("groupConversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!groupConversationId) {
      return new NextResponse("Group Conversation ID missing", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content missing", { status: 400 });
    }

    // Get group conversation from PostgreSQL
    const groupConversation = await postgres.groupConversation.findUnique({
      where: {
        id: groupConversationId,
      },
      include: {
        members: {
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    if (!groupConversation) {
      return new NextResponse("Group conversation not found", { status: 404 });
    }

    // Check if current user is a member of this group
    const currentMember = groupConversation.members.find(
      member => member.profileId === profile.id
    );

    if (!currentMember) {
      return new NextResponse("Not a member of this group", { status: 403 });
    }

    // Create message in MongoDB
    const message = await mongo.groupMessage.create({
      data: {
        content,
        fileUrl,
        groupConversationId,
        memberId: currentMember.memberId,
      },
    });

    // Add member data to the response
    const messageWithMember = {
      ...message,
      member: currentMember.member,
    };

    return NextResponse.json(messageWithMember);
  } catch (error) {
    console.log("[GROUP_MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 