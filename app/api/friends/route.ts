import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Debug: Check current user's member ID
    const currentUserMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });
    console.log(`Current user profile ${profile.id} has member ID:`, currentUserMember?.id || 'NOT FOUND');

    // Get or create DM server
    let dmServer = await postgres.server.findFirst({
      where: {
        name: "Direct Messages",
      },
    });
    
    if (!dmServer) {
             dmServer = await postgres.server.create({
         data: {
           name: "Direct Messages",
           imageUrl: "",
           inviteCode: "dm",
           profileId: profile.id,
         },
       });
    }

    // Get accepted friend requests (friends)
    const acceptedRequests = await postgres.friendRequest.findMany({
      where: {
        OR: [
          {
            requesterProfileId: profile.id,
            status: "ACCEPTED",
          },
          {
            targetProfileId: profile.id,
            status: "ACCEPTED",
          },
        ],
      },
      include: {
        requesterProfile: true,
        targetProfile: true,
      },
    });

    // Get pending friend requests (received by current user)
    const pendingRequests = await postgres.friendRequest.findMany({
      where: {
        targetProfileId: profile.id,
        status: "PENDING",
      },
      include: {
        requesterProfile: true,
      },
    });

    // Get sent friend requests (sent by current user)
    const sentRequests = await postgres.friendRequest.findMany({
      where: {
        requesterProfileId: profile.id,
        status: "PENDING",
      },
      include: {
        targetProfile: true,
      },
    });

    // Get all rooms (DMs and group DMs) directly
    let rooms = [];
    
    // Get current user's member record
    const currentMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (currentMember) {
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

      rooms = [...dmRooms, ...groupRooms];
    }

    // Get member information for friends
    const friendsWithMembers = await Promise.all(
      acceptedRequests.map(async (request) => {
        const isRequester = request.requesterProfileId === profile.id;
        const targetProfileId = isRequester ? request.targetProfile.id : request.requesterProfile.id;
        
        // Get the member record for the target profile in DM server
        const targetMember = await postgres.member.findFirst({
          where: {
            profileId: targetProfileId,
            serverId: dmServer.id,
          },
        });

        console.log(`Looking up member for profile ${targetProfileId}:`, targetMember?.id || 'NOT FOUND');
        console.log(`Profile details:`, isRequester ? request.targetProfile : request.requesterProfile);

        return {
          id: targetProfileId,
          profile: isRequester ? request.targetProfile : request.requesterProfile,
          memberId: targetMember?.id,
          status: "online", // Mock status for now
          statusText: "Online", // Mock status text
        };
      })
    );

    // Process rooms data (DMs and group DMs)
    const directMessages = rooms
      .filter(room => room.type === 'dm')
      .map(room => ({
        id: room.id,
        profile: room.otherMember?.profile || room.members?.[0]?.profile,
        serverId: dmServer.id,
        lastMessage: room.lastMessage || "Last message...",
        unreadCount: room.unreadCount || 0,
      }));

    const groupDms = rooms
      .filter(room => room.type === 'group')
      .map(room => ({
        id: room.id,
        name: room.name,
        imageUrl: room.imageUrl,
        memberCount: room.members?.length || 0,
        lastMessage: room.lastMessage || "Last message...",
        unreadCount: room.unreadCount || 0,
      }));

    return NextResponse.json({
      friends: friendsWithMembers,
      pendingRequests,
      sentRequests,
      directMessages,
      groupDms,
      counts: {
        online: friendsWithMembers.filter(f => f.status === "online").length,
        all: friendsWithMembers.length,
        pending: pendingRequests.length,
        blocked: 0, // Mock for now
      },
    });
  } catch (error) {
    console.log("[FRIENDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 