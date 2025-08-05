import { checkDatabaseHealth } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const health = await checkDatabaseHealth();
    
    const status = health.mongodb && health.postgresql ? "healthy" : 
                   health.mongodb || health.postgresql ? "degraded" : "unhealthy";
    
    return NextResponse.json({
      status,
      databases: health,
      message: status === "healthy" ? "All databases operational" :
               status === "degraded" ? "Some databases operational" :
               "No databases operational"
    });
  } catch (error) {
    console.log("[HEALTH_CHECK]", error);
    return NextResponse.json({
      status: "error",
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 