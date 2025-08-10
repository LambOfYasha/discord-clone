import { NextResponse } from "next/server";
import { AnnouncementScheduler } from "@/lib/announcement-scheduler";

export async function POST() {
  try {
    const scheduler = AnnouncementScheduler.getInstance();
    scheduler.start();
    
    return NextResponse.json({ 
      success: true, 
      message: "Announcement scheduler started successfully" 
    });
  } catch (error) {
    console.error("Error starting announcement scheduler:", error);
    return NextResponse.json(
      { success: false, error: "Failed to start scheduler" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const scheduler = AnnouncementScheduler.getInstance();
    const isRunning = scheduler.isRunning();
    
    return NextResponse.json({ 
      success: true, 
      isRunning,
      message: isRunning ? "Scheduler is running" : "Scheduler is not running"
    });
  } catch (error) {
    console.error("Error checking scheduler status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check scheduler status" },
      { status: 500 }
    );
  }
}

export async function PUT() {
  try {
    const scheduler = AnnouncementScheduler.getInstance();
    await scheduler.processNow();
    
    return NextResponse.json({ 
      success: true, 
      message: "Manual processing completed" 
    });
  } catch (error) {
    console.error("Error during manual processing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process announcements" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const scheduler = AnnouncementScheduler.getInstance();
    await scheduler.cleanupOrphanedAnnouncements();
    
    return NextResponse.json({ 
      success: true, 
      message: "Cleanup completed" 
    });
  } catch (error) {
    console.error("Error during cleanup:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cleanup announcements" },
      { status: 500 }
    );
  }
}
