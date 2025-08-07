import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
      CLERK_API_KEY: !!process.env.CLERK_API_KEY,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NODE_ENV: process.env.NODE_ENV,
    };

    // Try to get user from auth
    const { userId } = await auth();
    
    return NextResponse.json({
      envCheck,
      userId,
      authenticated: !!userId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("[DEBUG_ENV_GET]", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      envCheck: {
        CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
        CLERK_API_KEY: !!process.env.CLERK_API_KEY,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NODE_ENV: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 