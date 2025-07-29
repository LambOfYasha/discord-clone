import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";
import { DirectMessage } from "../../prisma/generated/mongo";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { content, fileUrl } = await req.json();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Conversation ID missing", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content missing", { status: 400 });
    }

    // Get conversation from PostgreSQL
    const conversation = await postgres.conversation.findUnique({
      where: {
        id: conversationId,
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
      return new NextResponse("Conversation not found", { status: 404 });
    }

    const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo;

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    // Create message in MongoDB
    const message = await mongo.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId,
        memberId: member.id,
      },
    });

    // Add member data to the response
    const messageWithMember = {
      ...message,
      member: member,
    };

    return NextResponse.json(messageWithMember);
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
