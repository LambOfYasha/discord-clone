import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    // Get recent announcements from servers the user follows or is a member of
    const recentAnnouncements = await db.scheduledAnnouncement.findMany({
      where: {
        AND: [
          {
            isActive: true,
          },
          {
            OR: [
              {
                server: {
                  members: {
                    some: {
                      profileId: profile.id,
                    },
                  },
                },
              },
              {
                server: {
                  serverFollows: {
                    some: {
                      followerProfileId: profile.id,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      include: {
        server: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        channel: {
          select: {
            id: true,
            name: true,
          },
        },
        creatorProfile: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        lastSentAt: "desc",
      },
      take: limit,
    });

    return NextResponse.json(recentAnnouncements);
  } catch (error) {
    console.error("[ANNOUNCEMENTS_RECENT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
