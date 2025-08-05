import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ inviteCode: string }> }
) {
  try {
    const { inviteCode } = await params;
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!inviteCode) {
      return new NextResponse("Invite code missing", { status: 400 });
    }

    // Find the server with the given invite code
    const server = await db.server.findUnique({
      where: {
        inviteCode: inviteCode,
      },
    });

    if (!server) {
      return new NextResponse("Invalid invite code", { status: 404 });
    }

    // Check if user is already a member of this server
    const existingMember = await db.member.findFirst({
      where: {
        serverId: server.id,
        profileId: profile.id,
      },
    });

    if (existingMember) {
      return NextResponse.json({
        server,
        message: "Already a member",
      });
    }

    // Create a new member for the user
    const newMember = await db.member.create({
      data: {
        profileId: profile.id,
        serverId: server.id,
        role: "GUEST",
      },
    });

    return NextResponse.json({
      server,
      member: newMember,
      message: "Successfully joined server",
    });
  } catch (error) {
    console.log("[INVITE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 