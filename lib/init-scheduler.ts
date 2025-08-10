import { AnnouncementScheduler } from "./announcement-scheduler";

let isInitialized = false;

export function initializeScheduler() {
  if (isInitialized) {
    return;
  }

  try {
    console.log("Initializing announcement scheduler...");
    const scheduler = AnnouncementScheduler.getInstance();
    scheduler.start();
    isInitialized = true;
    console.log("Announcement scheduler initialized successfully");
  } catch (error) {
    console.error("Failed to initialize announcement scheduler:", error);
  }
}

// Auto-initialize when this module is imported
if (typeof window === "undefined") {
  // Only run on server side
  initializeScheduler();
}
