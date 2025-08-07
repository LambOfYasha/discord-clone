import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { postgres } from "@/lib/db";
import { NotificationService } from "@/lib/notification-service";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { targetProfileId } = await req.json();

    if (!targetProfileId) {
      return new NextResponse("Target profile ID is required", { status: 400 });
    }

    // Get current user's profile
    let currentProfile = await postgres.profile.findUnique({
      where: { userId }
    });

    // If profile doesn't exist, create it
    if (!currentProfile) {
      const user = await currentUser();
      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      currentProfile = await postgres.profile.create({
        data: {
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }

    // Check if already following
    const existingFollow = await postgres.follow.findUnique({
      where: {
        followerProfileId_followingProfileId: {
          followerProfileId: currentProfile.id,
          followingProfileId: targetProfileId
        }
      }
    });

    if (existingFollow) {
      return new NextResponse("Already following this user", { status: 400 });
    }

    // Create follow
    const follow = await postgres.follow.create({
      data: {
        followerProfileId: currentProfile.id,
        followingProfileId: targetProfileId
      },
      include: {
        followingProfile: true
      }
    });

    // Create notification for the followed user
    await NotificationService.createFollowNotification(
      currentProfile.id,
      targetProfileId
    );

    return NextResponse.json(follow);
  } catch (error) {
    console.error("[FOLLOWS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const targetProfileId = searchParams.get("targetProfileId");

    if (!targetProfileId) {
      return new NextResponse("Target profile ID is required", { status: 400 });
    }

    // Get current user's profile
    let currentProfile = await postgres.profile.findUnique({
      where: { userId }
    });

    // If profile doesn't exist, create it
    if (!currentProfile) {
      const user = await currentUser();
      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      currentProfile = await postgres.profile.create({
        data: {
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }

    // Delete follow
    await postgres.follow.delete({
      where: {
        followerProfileId_followingProfileId: {
          followerProfileId: currentProfile.id,
          followingProfileId: targetProfileId
        }
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[FOLLOWS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return new NextResponse("Profile ID is required", { status: 400 });
    }

    // Get current user's profile
    let currentProfile = await postgres.profile.findUnique({
      where: { userId }
    });

    // If profile doesn't exist, create it
    if (!currentProfile) {
      const user = await currentUser();
      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      currentProfile = await postgres.profile.create({
        data: {
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }

    // Check if following
    const follow = await postgres.follow.findUnique({
      where: {
        followerProfileId_followingProfileId: {
          followerProfileId: currentProfile.id,
          followingProfileId: profileId
        }
      }
    });

    return NextResponse.json({ isFollowing: !!follow });
  } catch (error) {
    console.error("[FOLLOWS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 