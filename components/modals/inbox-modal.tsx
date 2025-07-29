"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal-store";
import { 
  Bell, 
  MessageSquare, 
  AtSign,
  Clock,
  User,
  Hash,
  MoreVertical
} from "lucide-react";

export const InboxModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [activeTab, setActiveTab] = useState("forYou");
  const isModalOpen = isOpen && type === "inbox";

  const renderNotificationItem = (type: string, title: string, content: string, time: string, icon: React.ReactNode) => (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#1E1F22] cursor-pointer">
      <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white font-medium text-sm">{title}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">{time}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <p className="text-gray-300 text-sm">{content}</p>
      </div>
    </div>
  );

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
          <div className="space-y-2">
            {activeTab === "forYou" && (
              <>
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">You're all caught up!</h3>
                  <p className="text-gray-400 text-sm">
                    We'll notify you when there's something new for you.
                  </p>
                </div>
              </>
            )}

            {activeTab === "unreads" && (
              <>
                {renderNotificationItem(
                  "message",
                  "New message in #general",
                  "PlusOnBlock sent a message in the general channel",
                  "2 min ago",
                  <MessageSquare className="h-4 w-4 text-white" />
                )}
                {renderNotificationItem(
                  "message",
                  "New message in #announcements",
                  "Server announcement: Weekly community event this Friday",
                  "15 min ago",
                  <MessageSquare className="h-4 w-4 text-white" />
                )}
                {renderNotificationItem(
                  "message",
                  "New message in #random",
                  "Jonathan shared a funny meme in the random channel",
                  "1 hour ago",
                  <MessageSquare className="h-4 w-4 text-white" />
                )}
              </>
            )}

            {activeTab === "mentions" && (
              <>
                {renderNotificationItem(
                  "mention",
                  "You were mentioned in #general",
                  "@אביר (Brian) can you help with the project setup?",
                  "5 min ago",
                  <AtSign className="h-4 w-4 text-white" />
                )}
                {renderNotificationItem(
                  "mention",
                  "You were mentioned in #help",
                  "@אביר (Brian) thanks for the help earlier!",
                  "30 min ago",
                  <AtSign className="h-4 w-4 text-white" />
                )}
                {renderNotificationItem(
                  "mention",
                  "You were mentioned in #announcements",
                  "@אביר (Brian) great work on the new feature!",
                  "2 hours ago",
                  <AtSign className="h-4 w-4 text-white" />
                )}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-[#1E1F22]">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
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