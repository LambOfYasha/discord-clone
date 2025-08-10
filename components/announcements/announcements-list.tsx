"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash, Megaphone, Clock, Hash, User, Calendar } from "lucide-react";
import { toast } from "sonner";

interface AnnouncementsListProps {
  serverId: string;
  member: any;
}

export const AnnouncementsList = ({ serverId, member }: AnnouncementsListProps) => {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [serverId]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`/api/announcements?serverId=${serverId}`);
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      } else {
        toast.error("Failed to fetch announcements");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to fetch announcements");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (announcementId: string, isActive: boolean) => {
    setUpdatingId(announcementId);
    try {
      const response = await fetch(`/api/announcements/${announcementId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        setAnnouncements(prev => 
          prev.map(announcement => 
            announcement.id === announcementId 
              ? { ...announcement, isActive: !isActive }
              : announcement
          )
        );
        toast.success(`Announcement ${!isActive ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error("Failed to update announcement");
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Failed to update announcement");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (announcementId: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) {
      return;
    }

    try {
      const response = await fetch(`/api/announcements/${announcementId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
        toast.success("Announcement deleted successfully");
      } else {
        toast.error("Failed to delete announcement");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement");
    }
  };

  const formatScheduleType = (type: string) => {
    switch (type) {
      case "DAILY": return "Daily";
      case "WEEKLY": return "Weekly";
      case "MONTHLY": return "Monthly";
      case "CUSTOM": return "One-time";
      default: return type;
    }
  };

  const formatNextSendTime = (nextSendAt: string) => {
    const date = new Date(nextSendAt);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays > 1) {
      return `${diffDays} days from now`;
    } else {
      return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const canEdit = (announcement: any) => {
    return member.role !== "GUEST" || announcement.creatorProfileId === member.profileId;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Scheduled Announcements</h2>
          <p className="text-muted-foreground">
            Manage your server's automated announcements
          </p>
        </div>
        <Button onClick={() => router.push(`/servers/${serverId}/announcements/create`)}>
          <Megaphone className="h-4 w-4 mr-2" />
          Create Announcement
        </Button>
      </div>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No announcements yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first scheduled announcement to automatically send messages to your server.
            </p>
            <Button onClick={() => router.push(`/servers/${serverId}/announcements/create`)}>
              <Megaphone className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      <Badge variant={announcement.isActive ? "default" : "secondary"}>
                        {announcement.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">
                        {formatScheduleType(announcement.scheduleType)}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {announcement.message.length > 100 
                        ? announcement.message.substring(0, 100) + "..." 
                        : announcement.message
                      }
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={announcement.isActive}
                      onCheckedChange={() => handleToggleActive(announcement.id, announcement.isActive)}
                      disabled={updatingId === announcement.id}
                    />
                    {canEdit(announcement) && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/servers/${serverId}/announcements/${announcement.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(announcement.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Channel:</span>
                    <span>{announcement.channel.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Next send:</span>
                    <span>{formatNextSendTime(announcement.nextSendAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Created by:</span>
                    <span>{announcement.creatorProfile.name}</span>
                  </div>
                </div>
                {announcement.lastSentAt && (
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last sent:</span>
                    <span>{new Date(announcement.lastSentAt).toLocaleString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
