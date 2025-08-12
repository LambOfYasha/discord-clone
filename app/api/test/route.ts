import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ 
      message: "API is working", 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error("[TEST_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

