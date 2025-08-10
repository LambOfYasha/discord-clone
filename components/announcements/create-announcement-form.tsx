"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Megaphone, Hash } from "lucide-react";
import { toast } from "sonner";

interface CreateAnnouncementFormProps {
  server: any;
  channels: any[];
  member: any;
}

export const CreateAnnouncementForm = ({ server, channels, member }: CreateAnnouncementFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [channelId, setChannelId] = useState("");
  const [scheduleType, setScheduleType] = useState("DAILY");
  const [customTime, setCustomTime] = useState("09:00");
  const [customDate, setCustomDate] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim() || !channelId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Calculate schedule data based on type
      let scheduleData: any = {};
      
      if (scheduleType === "CUSTOM") {
        if (!customDate) {
          toast.error("Please select a date for custom schedule");
          return;
        }
        const dateTime = new Date(`${customDate}T${customTime}`);
        scheduleData = {
          customDateTime: dateTime.toISOString(),
          nextSendAt: dateTime.toISOString(),
        };
      } else {
        // For recurring schedules, set the next send time
        const now = new Date();
        const [hours, minutes] = customTime.split(":").map(Number);
        now.setHours(hours, minutes, 0, 0);
        
        // If the time has already passed today, schedule for tomorrow
        if (now <= new Date()) {
          now.setDate(now.getDate() + 1);
        }
        
        scheduleData = {
          dailyTime: customTime,
          nextSendAt: now.toISOString(),
        };
      }

      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          serverId: server.id,
          channelId,
          scheduleType,
          scheduleData,
          isActive,
        }),
      });

      if (response.ok) {
        toast.success("Announcement created successfully!");
        router.push(`/servers/${server.id}/announcements`);
      } else {
        const error = await response.text();
        toast.error(error || "Failed to create announcement");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Failed to create announcement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Create Scheduled Announcement
          </CardTitle>
          <CardDescription>
            Set up a reusable message that will be automatically sent to a designated channel at scheduled intervals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Announcement Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  disabled={isLoading}
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="message">Message Content *</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your announcement message..."
                  disabled={isLoading}
                  rows={4}
                  maxLength={2000}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {message.length}/2000 characters
                </p>
              </div>

              <div>
                <Label htmlFor="channel">Target Channel *</Label>
                <Select value={channelId} onValueChange={setChannelId} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          {channel.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schedule Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Schedule Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduleType">Schedule Type</Label>
                  <Select value={scheduleType} onValueChange={setScheduleType} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                      <SelectItem value="CUSTOM">Custom (One-time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {scheduleType === "CUSTOM" && (
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    disabled={isLoading}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  disabled={isLoading}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>

            {/* Schedule Preview */}
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Schedule Preview</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {scheduleType === "DAILY" && (
                  <p>This announcement will be sent daily at {customTime}</p>
                )}
                {scheduleType === "WEEKLY" && (
                  <p>This announcement will be sent weekly on the same day at {customTime}</p>
                )}
                {scheduleType === "MONTHLY" && (
                  <p>This announcement will be sent monthly on the same date at {customTime}</p>
                )}
                {scheduleType === "CUSTOM" && customDate && (
                  <p>This announcement will be sent once on {new Date(customDate).toLocaleDateString()} at {customTime}</p>
                )}
                <p>Target channel: {channels.find(c => c.id === channelId)?.name || "Not selected"}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Announcement"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
