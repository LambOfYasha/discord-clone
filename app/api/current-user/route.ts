import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

// Cache configuration for user data
export const revalidate = 60; // 1 minute for user data
export const dynamic = 'force-dynamic'; // User-specific data

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[CURRENT_USER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 