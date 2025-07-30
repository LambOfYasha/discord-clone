import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if current user has a member record
    let currentUserMember = await postgres.member.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    // If current user doesn't have a member record, create one
    if (!currentUserMember) {
      // Find an existing server or create one
      let server = await postgres.server.findFirst();
      
      if (!server) {
        server = await postgres.server.create({
          data: {
            name: "Default Server",
            imageUrl: "",
            inviteCode: "default",
            profileId: profile.id,
          },
        });
      }

      // Create member record for current user
      currentUserMember = await postgres.member.create({
        data: {
          profileId: profile.id,
          role: "ADMIN", // Current user should be admin
          serverId: server.id,
        },
      });
    }

    return NextResponse.json({ 
      memberId: currentUserMember.id,
      serverId: currentUserMember.serverId 
    });
  } catch (error) {
    console.log("[MEMBERS_ENSURE_CURRENT_USER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 