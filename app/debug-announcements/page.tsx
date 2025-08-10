"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  message: string;
  scheduleType: string;
  isActive: boolean;
  nextSendAt: string;
  lastSentAt?: string;
  serverId: string;
  channelId: string;
  creatorProfileId: string;
  scheduleData: any;
  server: {
    name: string;
  };
  channel: {
    name: string;
  };
  creatorProfile: {
    name: string;
  };
}

export default function DebugAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [schedulerStatus, setSchedulerStatus] = useState<any>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to fetch announcements");
    }
  };

  const checkSchedulerStatus = async () => {
    try {
      const response = await fetch("/api/announcements/start-scheduler");
      const data = await response.json();
      setSchedulerStatus(data);
    } catch (error) {
      console.error("Error checking scheduler status:", error);
    }
  };

  const checkHealthStatus = async () => {
    try {
      const response = await fetch("/api/announcements/health");
      const data = await response.json();
      setHealthStatus(data);
    } catch (error) {
      console.error("Error checking health status:", error);
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
        await checkSchedulerStatus();
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
        await fetchAnnouncements(); // Refresh the list
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

  const cleanupOrphaned = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/announcements/start-scheduler", {
        method: "DELETE",
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Cleanup completed!");
        await fetchAnnouncements(); // Refresh the list
        await checkHealthStatus(); // Refresh health status
      } else {
        toast.error("Failed to cleanup announcements");
      }
    } catch (error) {
      console.error("Error cleaning up announcements:", error);
      toast.error("Failed to cleanup announcements");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    checkSchedulerStatus();
    checkHealthStatus();
    
    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDueAnnouncements = () => {
    return announcements.filter(announcement => {
      if (!announcement.isActive) return false;
      const nextSendAt = new Date(announcement.nextSendAt);
      return nextSendAt <= currentTime;
    });
  };

  const dueAnnouncements = getDueAnnouncements();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Current Time */}
      <Card>
        <CardHeader>
          <CardTitle>Current Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-mono">{currentTime.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">ISO: {currentTime.toISOString()}</p>
        </CardContent>
      </Card>

      {/* Scheduler Status */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduler Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <Badge variant={schedulerStatus?.isRunning ? "default" : "secondary"}>
              {schedulerStatus?.isRunning ? "Running" : "Stopped"}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={startScheduler} 
              disabled={isLoading || schedulerStatus?.isRunning}
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
              onClick={cleanupOrphaned} 
              disabled={isLoading}
              variant="outline"
            >
              Cleanup Orphaned
            </Button>
            <Button 
              onClick={checkSchedulerStatus} 
              variant="outline"
            >
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthStatus ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>Scheduler:</span>
                <Badge variant={healthStatus.scheduler.isRunning ? "default" : "secondary"}>
                  {healthStatus.scheduler.isRunning ? "Running" : "Stopped"}
                </Badge>
                {healthStatus.scheduler.error && (
                  <span className="text-red-500 text-sm">Error: {healthStatus.scheduler.error}</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span>PostgreSQL:</span>
                <Badge variant={healthStatus.database.postgres ? "default" : "secondary"}>
                  {healthStatus.database.postgres ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <span>MongoDB:</span>
                <Badge variant={healthStatus.database.mongo ? "default" : "secondary"}>
                  {healthStatus.database.mongo ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              
              <div className="text-sm">
                <p>Total Announcements: {healthStatus.announcements.total}</p>
                <p>Active Announcements: {healthStatus.announcements.active}</p>
                <p>Due Announcements: {healthStatus.announcements.due}</p>
              </div>
              
              {healthStatus.announcements.error && (
                <p className="text-red-500 text-sm">Error: {healthStatus.announcements.error}</p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">Loading health status...</p>
          )}
          
          <Button 
            onClick={checkHealthStatus} 
            variant="outline"
          >
            Refresh Health
          </Button>
        </CardContent>
      </Card>

      {/* Due Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Due Announcements ({dueAnnouncements.length})</CardTitle>
          <CardDescription>
            Announcements that should be sent now
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dueAnnouncements.length === 0 ? (
            <p className="text-muted-foreground">No announcements are due to be sent</p>
          ) : (
            <div className="space-y-4">
              {dueAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border rounded p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm text-gray-600">{announcement.message}</p>
                      <p className="text-xs text-gray-500">
                        Server: {announcement.server.name} | 
                        Channel: {announcement.channel.name} | 
                        Schedule: {announcement.scheduleType}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <p>Next: {new Date(announcement.nextSendAt).toLocaleString()}</p>
                      {announcement.lastSentAt && (
                        <p>Last: {new Date(announcement.lastSentAt).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>All Announcements ({announcements.length})</CardTitle>
          <CardDescription>
            All scheduled announcements in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p className="text-muted-foreground">No announcements found</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => {
                const nextSendAt = new Date(announcement.nextSendAt);
                const isDue = announcement.isActive && nextSendAt <= currentTime;
                
                return (
                  <div key={announcement.id} className={`border rounded p-4 ${isDue ? 'border-red-500 bg-red-50' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{announcement.title}</h4>
                          <Badge variant={announcement.isActive ? "default" : "secondary"}>
                            {announcement.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {isDue && (
                            <Badge variant="destructive">DUE NOW</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{announcement.message}</p>
                        <p className="text-xs text-gray-500">
                          Server: {announcement.server.name} | 
                          Channel: {announcement.channel.name} | 
                          Schedule: {announcement.scheduleType} |
                          Creator: {announcement.creatorProfile.name}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        <p>Next: {nextSendAt.toLocaleString()}</p>
                        {announcement.lastSentAt && (
                          <p>Last: {new Date(announcement.lastSentAt).toLocaleString()}</p>
                        )}
                        <p>Created: {new Date(announcement.id).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Info */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Check the browser console for scheduler logs</p>
          <p>• Make sure the scheduler is running (status above)</p>
          <p>• Verify announcements are active and due</p>
          <p>• Check that the creator is still a member of the server</p>
          <p>• Ensure the target channel exists</p>
          <p>• Verify MongoDB connection for message creation</p>
        </CardContent>
      </Card>
    </div>
  );
}
