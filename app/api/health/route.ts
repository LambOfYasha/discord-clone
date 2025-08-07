import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { postgres, mongo } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    
    // Check database connections
    let postgresStatus = "unknown";
    let mongoStatus = "unknown";
    
    try {
      await postgres.$queryRaw`SELECT 1`;
      postgresStatus = "connected";
    } catch (error) {
      postgresStatus = "error";
      console.error("PostgreSQL connection error:", error);
    }
    
    try {
      await mongo.$queryRaw`SELECT 1`;
      mongoStatus = "connected";
    } catch (error) {
      mongoStatus = "error";
      console.error("MongoDB connection error:", error);
    }
    
    // Check environment variables
    const envCheck = {
      CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
      CLERK_API_KEY: !!process.env.CLERK_API_KEY,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      POSTGRES_URL: !!process.env.POSTGRES_URL,
      MONGO_URL: !!process.env.MONGO_URL,
      NODE_ENV: process.env.NODE_ENV,
    };
    
    return NextResponse.json({
      status: "ok",
      authentication: {
        userId,
        authenticated: !!userId
      },
      databases: {
        postgres: postgresStatus,
        mongo: mongoStatus
      },
      environment: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("[HEALTH_CHECK_GET]", error);
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 