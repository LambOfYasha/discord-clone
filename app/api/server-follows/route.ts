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

    const { serverId } = await req.json();

    if (!serverId) {
      return new NextResponse("Server ID is required", { status: 400 });
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

    // Check if server exists
    const server = await postgres.server.findUnique({
      where: { id: serverId }
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    // Check if already following
    const existingFollow = await postgres.serverFollow.findUnique({
      where: {
        followerProfileId_serverId: {
          followerProfileId: currentProfile.id,
          serverId: serverId
        }
      }
    });

    if (existingFollow) {
      return new NextResponse("Already following this server", { status: 400 });
    }

    // Create server follow
    const serverFollow = await postgres.serverFollow.create({
      data: {
        followerProfileId: currentProfile.id,
        serverId: serverId
      },
      include: {
        server: true
      }
    });

    // Create notification for server owner
    await NotificationService.createServerFollowNotification(
      currentProfile.id,
      serverId
    );

    return NextResponse.json(serverFollow);
  } catch (error) {
    console.error("[SERVER_FOLLOWS_POST]", error);
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
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is required", { status: 400 });
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

    // Delete server follow
    await postgres.serverFollow.delete({
      where: {
        followerProfileId_serverId: {
          followerProfileId: currentProfile.id,
          serverId: serverId
        }
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[SERVER_FOLLOWS_DELETE]", error);
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
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is required", { status: 400 });
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
    const serverFollow = await postgres.serverFollow.findUnique({
      where: {
        followerProfileId_serverId: {
          followerProfileId: currentProfile.id,
          serverId: serverId
        }
      }
    });

    return NextResponse.json({ isFollowing: !!serverFollow });
  } catch (error) {
    console.error("[SERVER_FOLLOWS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 