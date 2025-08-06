import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    console.log("Testing authentication...");
    console.log("Environment variables:", {
      CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
      CLERK_API_KEY: !!process.env.CLERK_API_KEY,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    });

    const { userId } = auth();
    console.log("Auth result:", { userId, authenticated: !!userId });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({
      success: true,
      userId,
      message: "Authentication successful"
    });
  } catch (error) {
    console.error("[TEST_AUTH_GET]", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 