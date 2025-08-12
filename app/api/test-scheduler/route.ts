import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Call the scheduler endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/scheduler/embeds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      schedulerResult: result,
      message: `Scheduler processed ${result.processed} embeds`
    });

  } catch (error) {
    console.error("[TEST_SCHEDULER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    // Get scheduled embeds info
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/scheduler/embeds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      scheduledEmbeds: result,
    });

  } catch (error) {
    console.error("[TEST_SCHEDULER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
