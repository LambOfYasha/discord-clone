import { NextResponse } from "next/server";

export async function GET() {
  // Check if environment variables are loaded
  const envCheck = {
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET ? "SET" : "NOT SET",
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID || "NOT SET",
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };

  // If environment variables are not set, this could be the cause of the UploadThing error
  if (envCheck.UPLOADTHING_SECRET === "NOT SET" || 
      envCheck.UPLOADTHING_APP_ID === "NOT SET" || 
      envCheck.UPLOADTHING_TOKEN === "NOT SET") {
    return NextResponse.json({
      error: "UploadThing environment variables are not properly configured",
      envCheck,
      message: "Please check your .env.local file and restart the development server"
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    envCheck,
    message: "Environment variables are properly configured"
  });
} 