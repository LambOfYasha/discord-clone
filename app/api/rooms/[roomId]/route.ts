import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";
import { DirectMessage } from "@/prisma/generated/mongo";
import { NextResponse } from "next/server";

// GET - Get specific room details
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

    // Try to find as DM conversation first
    let conversation = await postgres.conversation.findUnique({
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

      const otherMember = conversation.memberOneId === currentMember.id 
        ? conversation.memberTwo 
        : conversation.memberOne;

      return NextResponse.json({
        id: conversation.id,
        type: "dm",
        name: otherMember.profile.name,
        imageUrl: otherMember.profile.imageUrl,
        members: [conversation.memberOne, conversation.memberTwo],
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      });
    }

    // Try to find as group conversation
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

      return NextResponse.json({
        id: groupConversation.id,
        type: "group",
        name: groupConversation.name,
        imageUrl: groupConversation.imageUrl,
        members: groupConversation.members.map((member) => member.member),
        createdAt: groupConversation.createdAt,
        updatedAt: groupConversation.updatedAt,
      });
    }

    return new NextResponse("Room not found", { status: 404 });
  } catch (error) {
    console.log("[ROOM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PUT - Update room details (mainly for group conversations)
export async function PUT(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const profile = await currentProfile();
    const { roomId } = params;
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!roomId) {
      return new NextResponse("Room ID missing", { status: 400 });
    }

    // Check if it's a group conversation (only groups can be updated)
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
      return new NextResponse("Only admins can update group details", { status: 403 });
    }

    // Update the group conversation
    const updatedGroup = await postgres.groupConversation.update({
      where: {
        id: roomId,
      },
      data: {
        name: name || groupConversation.name,
        imageUrl: imageUrl || groupConversation.imageUrl,
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

    return NextResponse.json({
      id: updatedGroup.id,
      type: "group",
      name: updatedGroup.name,
      imageUrl: updatedGroup.imageUrl,
      members: updatedGroup.members.map((member) => member.member),
      createdAt: updatedGroup.createdAt,
      updatedAt: updatedGroup.updatedAt,
    });
  } catch (error) {
    console.log("[ROOM_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE - Leave or delete room
export async function DELETE(
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

    // Try to find as DM conversation first
    const conversation = await postgres.conversation.findUnique({
      where: {
        id: roomId,
      },
    });

    if (conversation) {
      // Check if current user is part of this conversation
      if (conversation.memberOneId !== currentMember.id && conversation.memberTwoId !== currentMember.id) {
        return new NextResponse("Access denied", { status: 403 });
      }

      // For DMs, we can't really "delete" them, but we can mark them as inactive
      // For now, we'll just return success (DMs are typically kept for history)
      return NextResponse.json({ message: "DM conversation cannot be deleted" });
    }

    // Try to find as group conversation
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

    if (groupConversation) {
      // Check if current user is part of this group
      const userMember = groupConversation.members[0];
      if (!userMember) {
        return new NextResponse("Access denied", { status: 403 });
      }

      // Remove user from group
      await postgres.groupConversationMember.delete({
        where: {
          id: userMember.id,
        },
      });

      // If user was the last member, delete the group
      const remainingMembers = await postgres.groupConversationMember.count({
        where: {
          groupConversationId: roomId,
        },
      });

      if (remainingMembers === 0) {
        await postgres.groupConversation.delete({
          where: {
            id: roomId,
          },
        });
      }

      return NextResponse.json({ message: "Successfully left group" });
    }

    return new NextResponse("Room not found", { status: 404 });
  } catch (error) {
    console.log("[ROOM_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 