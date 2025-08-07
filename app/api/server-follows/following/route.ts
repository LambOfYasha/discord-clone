import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { postgres } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    // Get followed servers
    const following = await postgres.serverFollow.findMany({
      where: {
        followerProfileId: currentProfile.id
      },
      include: {
        server: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ following });
  } catch (error) {
    console.error("[SERVER_FOLLOWS_FOLLOWING_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 