import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { postgres } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    console.log("Testing profile and authentication...");
    
    // Check environment variables
    const envCheck = {
      CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
      CLERK_API_KEY: !!process.env.CLERK_API_KEY,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      POSTGRES_URL: !!process.env.POSTGRES_URL,
    };
    console.log("Environment check:", envCheck);

    // Test authentication
    const { userId } = await auth();
    console.log("Auth result:", { userId, authenticated: !!userId });

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: "No user ID from auth",
        envCheck,
        timestamp: new Date().toISOString()
      }, { status: 401 });
    }

    // Test database connection
    let dbStatus = "unknown";
    try {
      await postgres.$queryRaw`SELECT 1`;
      dbStatus = "connected";
    } catch (error) {
      dbStatus = "error";
      console.error("Database connection error:", error);
    }

    // Try to find user profile
    let profile = null;
    try {
      profile = await postgres.profile.findUnique({
        where: { userId }
      });
      console.log("Profile lookup result:", { found: !!profile, profileId: profile?.id });
    } catch (error) {
      console.error("Profile lookup error:", error);
    }

    return NextResponse.json({
      success: true,
      userId,
      profile: profile ? { id: profile.id, name: profile.name } : null,
      database: dbStatus,
      envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("[TEST_PROFILE_GET]", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 