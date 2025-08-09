import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    const { profileId } = await Promise.resolve(context?.params ?? {});
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const targetProfile = await postgres.profile.findUnique({
      where: {
        id: profileId,
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
  context: any
) {
  try {
    const { profileId } = await Promise.resolve(context?.params ?? {});
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only allow users to update their own profile
    if (profile.id !== profileId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { nickname, bio, website, status, socialMedia } = body;

    const updatedProfile = await postgres.profile.update({
      where: {
        id: profileId,
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
