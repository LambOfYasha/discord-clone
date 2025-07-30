import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { memberIds, name } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
      return new NextResponse("Member IDs missing or invalid", { status: 400 });
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

    // Get all target member records
    const targetMembers = await postgres.member.findMany({
      where: {
        id: {
          in: memberIds,
        },
      },
      include: {
        profile: true,
      },
    });

    if (targetMembers.length !== memberIds.length) {
      return new NextResponse("Some target members not found", { status: 404 });
    }

    // Create the group conversation
    const groupConversation = await postgres.groupConversation.create({
      data: {
        name: name || `Group DM (${targetMembers.length + 1})`,
        imageUrl: "", // Default group icon
        profileId: profile.id,
      },
    });

    // Add current user as admin member
    await postgres.groupConversationMember.create({
      data: {
        role: "ADMIN",
        profileId: profile.id,
        memberId: currentMember.id,
        groupConversationId: groupConversation.id,
      },
    });

    // Add all target members
    for (const targetMember of targetMembers) {
      await postgres.groupConversationMember.create({
        data: {
          role: "GUEST",
          profileId: targetMember.profileId,
          memberId: targetMember.id,
          groupConversationId: groupConversation.id,
        },
      });
    }

    return NextResponse.json({
      id: groupConversation.id,
      name: groupConversation.name,
      serverId: groupConversation.id, // For compatibility with existing routing
      channelId: groupConversation.id, // For compatibility with existing routing
      members: [
        { ...currentMember, profile },
        ...targetMembers,
      ],
    });
  } catch (error) {
    console.log("[GROUP_CONVERSATIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 