import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    hasSecret: !!process.env.UPLOADTHING_SECRET,
    hasAppId: !!process.env.UPLOADTHING_APP_ID,
    hasToken: !!process.env.UPLOADTHING_TOKEN,
    timestamp: new Date().toISOString(),
  };
  
  return NextResponse.json(config);
} 