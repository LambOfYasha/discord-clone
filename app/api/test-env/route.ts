import { NextResponse } from "next/server";

export async function GET() {
  const envVars = {
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET ? "SET" : "NOT SET",
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID || "NOT SET",
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };
  
  return NextResponse.json(envVars);
} 