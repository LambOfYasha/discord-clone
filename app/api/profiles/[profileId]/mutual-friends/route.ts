import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { profileId: string } }
) {
  try {
    const currentUserProfile = await currentProfile();
    if (!currentUserProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get mutual friends through accepted friend requests
    const mutualFriends = await postgres.friendRequest.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                requesterProfileId: currentUserProfile.id,
                status: "ACCEPTED",
              },
              {
                targetProfileId: currentUserProfile.id,
                status: "ACCEPTED",
              },
            ],
          },
          {
            OR: [
              {
                requesterProfileId: params.profileId,
                status: "ACCEPTED",
              },
              {
                targetProfileId: params.profileId,
                status: "ACCEPTED",
              },
            ],
          },
        ],
      },
      include: {
        requesterProfile: true,
        targetProfile: true,
      },
    });

    // Extract unique friend profiles
    const friendProfiles = new Map();
    
    mutualFriends.forEach((request) => {
      if (request.requesterProfileId === currentUserProfile.id) {
        friendProfiles.set(request.targetProfile.id, request.targetProfile);
      } else if (request.targetProfileId === currentUserProfile.id) {
        friendProfiles.set(request.requesterProfile.id, request.requesterProfile);
      }
    });

    // Get friends of the target user
    const targetUserFriends = await postgres.friendRequest.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                requesterProfileId: params.profileId,
                status: "ACCEPTED",
              },
              {
                targetProfileId: params.profileId,
                status: "ACCEPTED",
              },
            ],
          },
        ],
      },
      include: {
        requesterProfile: true,
        targetProfile: true,
      },
    });

    // Find mutual friends
    const mutualFriendProfiles = [];
    targetUserFriends.forEach((request) => {
      const friendProfile = request.requesterProfileId === params.profileId 
        ? request.targetProfile 
        : request.requesterProfile;
      
      if (friendProfiles.has(friendProfile.id)) {
        mutualFriendProfiles.push({
          id: friendProfile.id,
          name: friendProfile.name,
          imageUrl: friendProfile.imageUrl,
          status: friendProfile.status || "ONLINE",
        });
      }
    });

    return NextResponse.json(mutualFriendProfiles);
  } catch (error) {
    console.log("[MUTUAL_FRIENDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
