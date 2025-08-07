import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({
      userId: profile.userId,
      id: profile.id,
      name: profile.name,
      email: profile.email,
    });
  } catch (error) {
    console.log("[AUTH_ME]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
