import { postgres, mongo } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export interface Room {
  id: string;
  type: "dm" | "group";
  name: string;
  imageUrl: string;
  members: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomMessage {
  id: string;
  content: string;
  fileUrl?: string;
  memberId: string;
  member: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomMember {
  id: string;
  role: string;
  profileId: string;
  profile: any;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to get room type
export async function getRoomType(roomId: string): Promise<"dm" | "group" | null> {
  try {
    // Check if it's a DM conversation
    const conversation = await postgres.conversation.findUnique({
      where: { id: roomId },
    });

    if (conversation) {
      return "dm";
    }

    // Check if it's a group conversation
    const groupConversation = await postgres.groupConversation.findUnique({
      where: { id: roomId },
    });

    if (groupConversation) {
      return "group";
    }

    return null;
  } catch (error) {
    console.error("Error getting room type:", error);
    return null;
  }
}

// Helper function to check if user has access to room
export async function checkRoomAccess(roomId: string, profileId: string): Promise<boolean> {
  try {
    const profile = await currentProfile();
    if (!profile) return false;

    const currentMember = await postgres.member.findFirst({
      where: { profileId: profile.id },
    });

    if (!currentMember) return false;

    // Check DM conversation
    const conversation = await postgres.conversation.findUnique({
      where: { id: roomId },
    });

    if (conversation) {
      return conversation.memberOneId === currentMember.id || conversation.memberTwoId === currentMember.id;
    }

    // Check group conversation
    const groupMember = await postgres.groupConversationMember.findFirst({
      where: {
        groupConversationId: roomId,
        profileId: profile.id,
      },
    });

    return !!groupMember;
  } catch (error) {
    console.error("Error checking room access:", error);
    return false;
  }
}

// Helper function to get room details
export async function getRoomDetails(roomId: string): Promise<Room | null> {
  try {
    const profile = await currentProfile();
    if (!profile) return null;

    const currentMember = await postgres.member.findFirst({
      where: { profileId: profile.id },
    });

    if (!currentMember) return null;

    // Check DM conversation
    const conversation = await postgres.conversation.findUnique({
      where: { id: roomId },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });

    if (conversation) {
      const otherMember = conversation.memberOneId === currentMember.id 
        ? conversation.memberTwo 
        : conversation.memberOne;

      return {
        id: conversation.id,
        type: "dm",
        name: otherMember.profile.name,
        imageUrl: otherMember.profile.imageUrl,
        members: [conversation.memberOne, conversation.memberTwo],
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      };
    }

    // Check group conversation
    const groupConversation = await postgres.groupConversation.findUnique({
      where: { id: roomId },
      include: {
        members: {
          include: {
            member: {
              include: { profile: true },
            },
            profile: true,
          },
        },
      },
    });

    if (groupConversation) {
      return {
        id: groupConversation.id,
        type: "group",
        name: groupConversation.name,
        imageUrl: groupConversation.imageUrl || "",
        members: groupConversation.members.map((member) => member.member),
        createdAt: groupConversation.createdAt,
        updatedAt: groupConversation.updatedAt,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting room details:", error);
    return null;
  }
}

// Helper function to create DM room
export async function createDMRoom(targetMemberId: string): Promise<Room | null> {
  try {
    const profile = await currentProfile();
    if (!profile) return null;

    const currentMember = await postgres.member.findFirst({
      where: { profileId: profile.id },
    });

    if (!currentMember) return null;

    const targetMember = await postgres.member.findFirst({
      where: { id: targetMemberId },
      include: { profile: true },
    });

    if (!targetMember) return null;

    // Check if conversation already exists
    const existingConversation = await postgres.conversation.findFirst({
      where: {
        OR: [
          { memberOneId: currentMember.id, memberTwoId: targetMember.id },
          { memberOneId: targetMember.id, memberTwoId: currentMember.id },
        ],
      },
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    });

    if (existingConversation) {
      const otherMember = existingConversation.memberOneId === currentMember.id 
        ? existingConversation.memberTwo 
        : existingConversation.memberOne;

      return {
        id: existingConversation.id,
        type: "dm",
        name: otherMember.profile.name,
        imageUrl: otherMember.profile.imageUrl,
        members: [existingConversation.memberOne, existingConversation.memberTwo],
        createdAt: existingConversation.createdAt,
        updatedAt: existingConversation.updatedAt,
      };
    }

    // Create new conversation
    const conversation = await postgres.conversation.create({
      data: {
        memberOneId: currentMember.id,
        memberTwoId: targetMember.id,
        profileId: profile.id,
      },
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    });

    return {
      id: conversation.id,
      type: "dm",
      name: targetMember.profile.name,
      imageUrl: targetMember.profile.imageUrl,
      members: [conversation.memberOne, conversation.memberTwo],
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  } catch (error) {
    console.error("Error creating DM room:", error);
    return null;
  }
}

// Helper function to create group room
export async function createGroupRoom(memberIds: string[], name?: string): Promise<Room | null> {
  try {
    const profile = await currentProfile();
    if (!profile) return null;

    const currentMember = await postgres.member.findFirst({
      where: { profileId: profile.id },
    });

    if (!currentMember) return null;

    const targetMembers = await postgres.member.findMany({
      where: { id: { in: memberIds } },
      include: { profile: true },
    });

    if (targetMembers.length !== memberIds.length) return null;

    // Create group conversation
    const groupConversation = await postgres.groupConversation.create({
      data: {
        name: name || `Group DM (${targetMembers.length + 1})`,
        imageUrl: "",
        profileId: profile.id,
      },
    });

    // Add current user as admin
    await postgres.groupConversationMember.create({
      data: {
        role: "ADMIN",
        profileId: profile.id,
        memberId: currentMember.id,
        groupConversationId: groupConversation.id,
      },
    });

    // Add target members
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

    const createdGroup = await postgres.groupConversation.findUnique({
      where: { id: groupConversation.id },
      include: {
        members: {
          include: {
            member: { include: { profile: true } },
            profile: true,
          },
        },
      },
    });

    if (!createdGroup) return null;

    return {
      id: createdGroup.id,
      type: "group",
      name: createdGroup.name,
      imageUrl: createdGroup.imageUrl || "",
      members: createdGroup.members.map((member) => member.member),
      createdAt: createdGroup.createdAt,
      updatedAt: createdGroup.updatedAt,
    };
  } catch (error) {
    console.error("Error creating group room:", error);
    return null;
  }
} 