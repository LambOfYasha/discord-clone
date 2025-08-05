import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get current user's profile
    const currentProfile = await db.profile.findUnique({
      where: { userId }
    });

    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // Get followed users
    const following = await db.follow.findMany({
      where: {
        followerProfileId: currentProfile.id
      },
      include: {
        followingProfile: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ following });
  } catch (error) {
    console.error("[FOLLOWS_FOLLOWING_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 