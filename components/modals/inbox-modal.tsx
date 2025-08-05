"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/hooks/use-modal-store";
import { 
  Bell, 
  MessageSquare, 
  AtSign,
  Clock,
  User,
  Hash,
  MoreVertical,
  Users,
  Activity
} from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  relatedProfile?: {
    id: string;
    name: string;
    imageUrl: string;
  };
  relatedServer?: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

export const InboxModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [activeTab, setActiveTab] = useState("forYou");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === "inbox";

  useEffect(() => {
    if (isModalOpen) {
      fetchNotifications();
    }
  }, [isModalOpen, activeTab]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      let endpoint = "/api/notifications";
      if (activeTab === "follows") {
        endpoint += "?type=FRIEND_ACTIVITY,SERVER_ACTIVITY";
      } else if (activeTab === "mentions") {
        endpoint += "?type=MESSAGE_MENTION";
      } else if (activeTab === "unreads") {
        endpoint += "?type=MESSAGE_MENTION,SERVER_ACTIVITY";
      }

      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId,
          isRead: true
        }),
      });

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications?notificationId=${notificationId}`, {
        method: "DELETE",
      });

      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const getNotificationIcon = (notification: Notification) => {
    switch (notification.type) {
      case "FRIEND_ACTIVITY":
        return <User className="h-4 w-4 text-white" />;
      case "SERVER_ACTIVITY":
        return <Hash className="h-4 w-4 text-white" />;
      case "FRIEND_ONLINE":
        return <Users className="h-4 w-4 text-white" />;
      case "SERVER_JOIN":
        return <Activity className="h-4 w-4 text-white" />;
      case "MESSAGE_MENTION":
        return <AtSign className="h-4 w-4 text-white" />;
      default:
        return <Bell className="h-4 w-4 text-white" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
  };

  const renderNotificationItem = (notification: Notification) => (
    <div 
      key={notification.id} 
      className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-[#1E1F22] cursor-pointer ${!notification.isRead ? 'bg-[#1E1F22]' : ''}`}
      onClick={() => markAsRead(notification.id)}
    >
      <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center flex-shrink-0">
        {getNotificationIcon(notification)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white font-medium text-sm">{notification.title}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">{formatTimeAgo(notification.createdAt)}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(notification.id);
              }}
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <p className="text-gray-300 text-sm">{notification.content}</p>
        {(notification.relatedProfile || notification.relatedServer) && (
          <div className="flex items-center space-x-2 mt-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={notification.relatedProfile?.imageUrl || notification.relatedServer?.imageUrl} />
              <AvatarFallback className="bg-gray-600">
                <span className="text-white text-xs">
                  {(notification.relatedProfile?.name || notification.relatedServer?.name || "?").charAt(0).toUpperCase()}
                </span>
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-400">
              {notification.relatedProfile?.name || notification.relatedServer?.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 text-sm">
            <p>Loading...</p>
          </div>
        </div>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="text-center py-8">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">
            {activeTab === "follows" ? "No follow activity" : 
             activeTab === "mentions" ? "No mentions" : 
             activeTab === "unreads" ? "No unread messages" : "You're all caught up!"}
          </h3>
          <p className="text-gray-400 text-sm">
            {activeTab === "follows" ? "Follow friends and servers to see their activity here." :
             activeTab === "mentions" ? "We'll notify you when someone mentions you." :
             activeTab === "unreads" ? "We'll notify you when there are unread messages." :
             "We'll notify you when there's something new for you."}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {notifications.map(renderNotificationItem)}
      </div>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#2B2D31] border-[#1E1F22] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Inbox</span>
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex space-x-1 mb-4">
          <Button
            variant={activeTab === "forYou" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("forYou")}
            className={activeTab === "forYou" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            For You
          </Button>
          <Button
            variant={activeTab === "follows" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("follows")}
            className={activeTab === "follows" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Follows
          </Button>
          <Button
            variant={activeTab === "unreads" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("unreads")}
            className={activeTab === "unreads" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Unreads
          </Button>
          <Button
            variant={activeTab === "mentions" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("mentions")}
            className={activeTab === "mentions" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Mentions
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="h-96">
          {renderTabContent()}
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-[#1E1F22]">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => {
              // Mark all as read
              notifications.forEach(notif => {
                if (!notif.isRead) {
                  markAsRead(notif.id);
                }
              });
            }}
          >
            Mark all as read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            Notification settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 