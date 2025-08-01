import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Get members of a room
export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!roomId) {
      return new NextResponse("Room ID missing", { status: 400 });
    }

    // Get current user's member record
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (!currentMember) {
      return new NextResponse("Current member not found", { status: 404 });
    }

    // Check if it's a DM conversation
    const conversation = await postgres.conversation.findUnique({
      where: {
        id: roomId,
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

    if (conversation) {
      // Check if current user is part of this conversation
      if (conversation.memberOneId !== currentMember.id && conversation.memberTwoId !== currentMember.id) {
        return new NextResponse("Access denied", { status: 403 });
      }

      return NextResponse.json([conversation.memberOne, conversation.memberTwo]);
    }

    // Check if it's a group conversation
    const groupConversation = await postgres.groupConversation.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: {
          include: {
            member: {
              include: {
                profile: true,
              },
            },
            profile: true,
          },
        },
      },
    });

    if (groupConversation) {
      // Check if current user is part of this group
      const isMember = groupConversation.members.some(
        (member) => member.profileId === profile.id
      );

      if (!isMember) {
        return new NextResponse("Access denied", { status: 403 });
      }

      return NextResponse.json(groupConversation.members.map((member) => member.member));
    }

    return new NextResponse("Room not found", { status: 404 });
  } catch (error) {
    console.log("[ROOM_MEMBERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST - Add members to a group conversation
export async function POST(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = params;
    const { memberIds } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!roomId) {
      return new NextResponse("Room ID missing", { status: 400 });
    }

    if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
      return new NextResponse("Member IDs missing or invalid", { status: 400 });
    }

    // Get current user's member record
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (!currentMember) {
      return new NextResponse("Current member not found", { status: 404 });
    }

    // Check if it's a group conversation (only groups can have members added)
    const groupConversation = await postgres.groupConversation.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: {
          where: {
            profileId: profile.id,
          },
        },
      },
    });

    if (!groupConversation) {
      return new NextResponse("Group conversation not found", { status: 404 });
    }

    // Check if current user is admin of this group
    const userMember = groupConversation.members[0];
    if (!userMember || userMember.role !== "ADMIN") {
      return new NextResponse("Only admins can add members", { status: 403 });
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

    // Check if members are already in the group
    const existingMembers = await postgres.groupConversationMember.findMany({
      where: {
        groupConversationId: roomId,
        memberId: {
          in: memberIds,
        },
      },
    });

    if (existingMembers.length > 0) {
      return new NextResponse("Some members are already in the group", { status: 400 });
    }

    // Add all target members
    const addedMembers = [];
    for (const targetMember of targetMembers) {
      const addedMember = await postgres.groupConversationMember.create({
        data: {
          role: "GUEST",
          profileId: targetMember.profileId,
          memberId: targetMember.id,
          groupConversationId: roomId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
      addedMembers.push(addedMember.member);
    }

    return NextResponse.json(addedMembers);
  } catch (error) {
    console.log("[ROOM_MEMBERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE - Remove a member from a group conversation
export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = params;
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("memberId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!roomId) {
      return new NextResponse("Room ID missing", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    // Get current user's member record
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (!currentMember) {
      return new NextResponse("Current member not found", { status: 404 });
    }

    // Check if it's a group conversation (only groups can have members removed)
    const groupConversation = await postgres.groupConversation.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: {
          where: {
            profileId: profile.id,
          },
        },
      },
    });

    if (!groupConversation) {
      return new NextResponse("Group conversation not found", { status: 404 });
    }

    // Check if current user is admin of this group
    const userMember = groupConversation.members[0];
    if (!userMember || userMember.role !== "ADMIN") {
      return new NextResponse("Only admins can remove members", { status: 403 });
    }

    // Check if target member is in the group
    const targetGroupMember = await postgres.groupConversationMember.findFirst({
      where: {
        groupConversationId: roomId,
        memberId: memberId,
      },
    });

    if (!targetGroupMember) {
      return new NextResponse("Member not found in group", { status: 404 });
    }

    // Remove member from group
    await postgres.groupConversationMember.delete({
      where: {
        id: targetGroupMember.id,
      },
    });

    return NextResponse.json({ message: "Member removed from group" });
  } catch (error) {
    console.log("[ROOM_MEMBERS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 