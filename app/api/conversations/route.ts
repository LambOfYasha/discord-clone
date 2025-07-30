import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { memberTwoId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!memberTwoId) {
      return new NextResponse("Member Two ID missing", { status: 400 });
    }

    // Get the current user's member record
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (!currentMember) {
      return new NextResponse("Current member not found", { status: 404 });
    }

    // Get the target member record
    const targetMember = await postgres.member.findFirst({
      where: {
        id: memberTwoId,
      },
      include: {
        profile: true,
      },
    });

    if (!targetMember) {
      return new NextResponse("Target member not found", { status: 404 });
    }

    // Check if conversation already exists
    const existingConversation = await postgres.conversation.findFirst({
      where: {
        OR: [
          {
            memberOneId: currentMember.id,
            memberTwoId: targetMember.id,
          },
          {
            memberOneId: targetMember.id,
            memberTwoId: currentMember.id,
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

    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    // Create new conversation
    const conversation = await postgres.conversation.create({
      data: {
        memberOneId: currentMember.id,
        memberTwoId: targetMember.id,
        profileId: profile.id,
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

    return NextResponse.json(conversation);
  } catch (error) {
    console.log("[CONVERSATIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 