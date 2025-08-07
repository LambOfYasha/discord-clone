import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    console.log("=== AUTHENTICATION DEBUG ===");
    
    // Check request headers
    const headers = {
      authorization: req.headers.get('authorization'),
      cookie: req.headers.get('cookie'),
      'user-agent': req.headers.get('user-agent'),
    };
    console.log("Request headers:", headers);
    
    // Check environment variables
    const envCheck = {
      CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
      CLERK_API_KEY: !!process.env.CLERK_API_KEY,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NODE_ENV: process.env.NODE_ENV,
    };
    console.log("Environment check:", envCheck);
    
    // Try to get user from auth
    let authResult = null;
    try {
      authResult = auth();
      console.log("Auth result:", authResult);
    } catch (error) {
      console.error("Auth error:", error);
    }
    
    // Try to get current user
    let currentUserResult = null;
    try {
      currentUserResult = await currentUser();
      console.log("Current user result:", currentUserResult);
    } catch (error) {
      console.error("Current user error:", error);
    }
    
    // Check if we have a session
    const hasSession = !!(authResult?.userId || currentUserResult);
    
    return NextResponse.json({
      success: true,
      hasSession,
      auth: {
        userId: authResult?.userId,
        sessionId: authResult?.sessionId,
        actor: authResult?.actor,
      },
      currentUser: currentUserResult ? {
        id: currentUserResult.id,
        firstName: currentUserResult.firstName,
        lastName: currentUserResult.lastName,
        emailAddresses: currentUserResult.emailAddresses?.map(e => e.emailAddress),
      } : null,
      headers,
      envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("[DEBUG_AUTH_GET]", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 