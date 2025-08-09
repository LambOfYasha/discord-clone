import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    const currentUserProfile = await currentProfile();
    if (!currentUserProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { profileId } = await Promise.resolve(context?.params ?? {});

    // Get servers where both users are members
    const mutualServers = await postgres.server.findMany({
      where: {
        AND: [
          {
            members: {
              some: {
                profileId: currentUserProfile.id,
              },
            },
          },
          {
            members: {
              some: {
                profileId: profileId,
              },
            },
          },
        ],
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    // Format the response
    const formattedServers = mutualServers.map((server) => {
      const currentUserMember = server.members.find(
        (member) => member.profileId === currentUserProfile.id
      );
      const targetUserMember = server.members.find(
        (member) => member.profileId === profileId
      );

      return {
        id: server.id,
        name: server.name,
        imageUrl: server.imageUrl,
        memberCount: server.members.length,
        role: targetUserMember?.role || "GUEST",
      };
    });

    return NextResponse.json(formattedServers);
  } catch (error) {
    console.log("[MUTUAL_SERVERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
