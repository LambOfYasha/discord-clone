import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { profileId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const targetProfile = await postgres.profile.findUnique({
      where: {
        id: params.profileId,
      },
    });

    if (!targetProfile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    return NextResponse.json(targetProfile);
  } catch (error) {
    console.log("[PROFILE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { profileId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only allow users to update their own profile
    if (profile.id !== params.profileId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { nickname, bio, website, status, socialMedia } = body;

    const updatedProfile = await postgres.profile.update({
      where: {
        id: params.profileId,
      },
      data: {
        nickname,
        bio,
        website,
        status,
        socialMedia,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log("[PROFILE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
