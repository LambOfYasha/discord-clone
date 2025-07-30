import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { profileId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!profileId) {
      return new NextResponse("Profile ID missing", { status: 400 });
    }

    // First, try to find existing member for the target profile
    let member = await postgres.member.findFirst({
      where: {
        profileId: profileId,
      },
    });

    // If member doesn't exist, create one
    if (!member) {
      // Get the profile to create a member
      const targetProfile = await postgres.profile.findUnique({
        where: {
          id: profileId,
        },
      });

      if (!targetProfile) {
        return new NextResponse("Profile not found", { status: 404 });
      }

      // Ensure current user has a member record
      let currentUserMember = await postgres.member.findFirst({
        where: {
          profileId: profile.id,
        },
      });

      if (!currentUserMember) {
        // Find or create a DM server (special server for direct messages)
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

        // Create member record for current user in DM server
        currentUserMember = await postgres.member.create({
          data: {
            profileId: profile.id,
            role: "ADMIN",
            serverId: dmServer.id,
          },
        });
      }

      // Create a member record for the target profile in the same server
      member = await postgres.member.create({
        data: {
          profileId: profileId,
          role: "GUEST", // Default role
          serverId: currentUserMember.serverId,
        },
      });
    }

    return NextResponse.json({ memberId: member.id });
  } catch (error) {
    console.log("[MEMBERS_GET_OR_CREATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 