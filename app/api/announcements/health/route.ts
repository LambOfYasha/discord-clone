import { NextResponse } from "next/server";
import { AnnouncementScheduler } from "@/lib/announcement-scheduler";
import { postgres, mongo } from "@/lib/db";

export async function GET() {
  try {
    const health = {
      timestamp: new Date().toISOString(),
      scheduler: {
        isRunning: false,
        error: null as string | null,
      },
      database: {
        postgres: false,
        mongo: false,
        error: null as string | null,
      },
      announcements: {
        total: 0,
        active: 0,
        due: 0,
        error: null as string | null,
      },
    };

    // Check scheduler status
    try {
      const scheduler = AnnouncementScheduler.getInstance();
      health.scheduler.isRunning = scheduler.isRunning();
    } catch (error) {
      health.scheduler.error = error instanceof Error ? error.message : "Unknown error";
    }

    // Check database connections
    try {
      await postgres.$queryRaw`SELECT 1`;
      health.database.postgres = true;
    } catch (error) {
      health.database.error = error instanceof Error ? error.message : "Unknown error";
    }

    try {
      await mongo.$queryRaw`SELECT 1`;
      health.database.mongo = true;
    } catch (error) {
      health.database.error = error instanceof Error ? error.message : "Unknown error";
    }

    // Check announcements
    try {
      const now = new Date();
      const totalAnnouncements = await postgres.scheduledAnnouncement.count();
      const activeAnnouncements = await postgres.scheduledAnnouncement.count({
        where: { isActive: true },
      });
      const dueAnnouncements = await postgres.scheduledAnnouncement.count({
        where: {
          AND: [
            { isActive: true },
            { nextSendAt: { lte: now } },
          ],
        },
      });

      health.announcements.total = totalAnnouncements;
      health.announcements.active = activeAnnouncements;
      health.announcements.due = dueAnnouncements;
    } catch (error) {
      health.announcements.error = error instanceof Error ? error.message : "Unknown error";
    }

    return NextResponse.json(health);
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { 
        error: "Health check failed",
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
