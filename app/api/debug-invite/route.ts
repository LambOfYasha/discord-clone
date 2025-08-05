import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await currentProfile();
    
    if (!profile) {
      return NextResponse.json({ error: "No profile found" }, { status: 401 });
    }

    // Get all servers
    const servers = await db.server.findMany({
      include: {
        members: {
          include: {
            profile: true
          }
        }
      }
    });

    // Check if current user is a member of any servers
    const userMemberships = await db.member.findMany({
      where: {
        profileId: profile.id
      },
      include: {
        server: true
      }
    });

    return NextResponse.json({
      profile: {
        id: profile.id,
        name: profile.name,
        userId: profile.userId
      },
      servers: servers.map(server => ({
        id: server.id,
        name: server.name,
        inviteCode: server.inviteCode,
        memberCount: server.members.length
      })),
      userMemberships: userMemberships.map(membership => ({
        serverId: membership.serverId,
        serverName: membership.server.name,
        role: membership.role
      }))
    });

  } catch (error) {
    console.error("Debug invite error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 