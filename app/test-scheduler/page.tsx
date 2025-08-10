"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function TestSchedulerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkSchedulerStatus = async () => {
    try {
      const response = await fetch("/api/announcements/start-scheduler");
      const data = await response.json();
      setIsRunning(data.isRunning);
    } catch (error) {
      console.error("Error checking scheduler status:", error);
    }
  };

  const startScheduler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/announcements/start-scheduler", {
        method: "POST",
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Scheduler started successfully!");
        setIsRunning(true);
      } else {
        toast.error("Failed to start scheduler");
      }
    } catch (error) {
      console.error("Error starting scheduler:", error);
      toast.error("Failed to start scheduler");
    } finally {
      setIsLoading(false);
    }
  };

  const processNow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/announcements/start-scheduler", {
        method: "PUT",
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Manual processing completed!");
      } else {
        toast.error("Failed to process announcements");
      }
    } catch (error) {
      console.error("Error processing announcements:", error);
      toast.error("Failed to process announcements");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSchedulerStatus();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Announcement Scheduler Test</CardTitle>
          <CardDescription>
            Test and control the announcement scheduler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <Badge variant={isRunning ? "default" : "secondary"}>
              {isRunning ? "Running" : "Stopped"}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={startScheduler} 
              disabled={isLoading || isRunning}
            >
              {isLoading ? "Starting..." : "Start Scheduler"}
            </Button>
            <Button 
              onClick={processNow} 
              disabled={isLoading}
              variant="outline"
            >
              Process Now
            </Button>
            <Button 
              onClick={checkSchedulerStatus} 
              variant="outline"
            >
              Refresh Status
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>• The scheduler checks for due announcements every minute</p>
            <p>• Make sure you have active announcements scheduled</p>
            <p>• Check the console for scheduler logs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
