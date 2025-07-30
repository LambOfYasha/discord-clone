import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get all members except the current user
    const members = await postgres.member.findMany({
      where: {
        profileId: {
          not: profile.id,
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.log("[MEMBERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 