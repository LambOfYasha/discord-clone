import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";
import { DirectMessage } from "@/prisma/generated/mongo";
import { NextResponse } from "next/server";

// GET - Fetch all rooms (DMs and group DMs) for the current user
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    // Fetch all conversations (DMs) for the current user
    const conversations = await postgres.conversation.findMany({
      where: {
        OR: [
          { memberOneId: currentMember.id },
          { memberTwoId: currentMember.id },
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

    // Fetch all group conversations for the current user
    const groupConversations = await postgres.groupConversation.findMany({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
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

    // Transform conversations to room format
    const dmRooms = conversations.map((conversation) => {
      const otherMember = conversation.memberOneId === currentMember.id 
        ? conversation.memberTwo 
        : conversation.memberOne;
      
      return {
        id: conversation.id,
        type: "dm",
        name: otherMember.profile.name,
        imageUrl: otherMember.profile.imageUrl,
        otherMember: otherMember,
        currentMember: currentMember,
        members: [conversation.memberOne, conversation.memberTwo],
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      };
    });

    // Transform group conversations to room format
    const groupRooms = groupConversations.map((group) => ({
      id: group.id,
      type: "group",
      name: group.name,
      imageUrl: group.imageUrl,
      currentMember: currentMember,
      members: group.members.map((member) => member.member),
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }));

    const allRooms = [...dmRooms, ...groupRooms];

    return NextResponse.json(allRooms);
  } catch (error) {
    console.log("[ROOMS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST - Create a new room (DM or group DM)
export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const body = await req.json();
    const { type, memberIds, name, targetMemberId } = body;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!type || !["dm", "group"].includes(type)) {
      return new NextResponse("Invalid room type", { status: 400 });
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

    if (type === "dm") {
      // Create or get existing DM conversation
      let targetMemberIdToUse = targetMemberId;
      
      if (!targetMemberIdToUse && memberIds && memberIds.length === 1) {
        targetMemberIdToUse = memberIds[0];
      }
      
      if (!targetMemberIdToUse) {
        return new NextResponse("Target member ID missing", { status: 400 });
      }
      const targetMember = await postgres.member.findFirst({
        where: {
          id: targetMemberIdToUse,
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
              const otherMember = existingConversation.memberOneId === currentMember.id 
        ? existingConversation.memberTwo 
        : existingConversation.memberOne;
      
      return NextResponse.json({
        id: existingConversation.id,
        type: "dm",
        name: otherMember.profile.name,
        imageUrl: otherMember.profile.imageUrl,
        otherMember: otherMember,
        currentMember: currentMember,
        members: [existingConversation.memberOne, existingConversation.memberTwo],
        createdAt: existingConversation.createdAt,
        updatedAt: existingConversation.updatedAt,
      });
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

      const otherMember = conversation.memberOneId === currentMember.id 
        ? conversation.memberTwo 
        : conversation.memberOne;
      
      return NextResponse.json({
        id: conversation.id,
        type: "dm",
        name: otherMember.profile.name,
        imageUrl: otherMember.profile.imageUrl,
        otherMember: otherMember,
        currentMember: currentMember,
        members: [conversation.memberOne, conversation.memberTwo],
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      });
    } else if (type === "group") {
      // Create group conversation
      if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
        return new NextResponse("Group requires member IDs array", { status: 400 });
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
          imageUrl: "",
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

      // Fetch the created group with all members
      const createdGroup = await postgres.groupConversation.findUnique({
        where: {
          id: groupConversation.id,
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
        id: createdGroup!.id,
        type: "group",
        name: createdGroup!.name,
        imageUrl: createdGroup!.imageUrl,
        currentMember: currentMember,
        members: createdGroup!.members.map((member) => member.member),
        createdAt: createdGroup!.createdAt,
        updatedAt: createdGroup!.updatedAt,
      });
    }

    return new NextResponse("Invalid room type", { status: 400 });
  } catch (error) {
    console.log("[ROOMS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 