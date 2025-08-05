"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/components/user/user-profile";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Plus,
  Users,
  Inbox
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";

interface DmRoomSidebarProps {
  profile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
}

export const DmRoomSidebar = ({ profile }: DmRoomSidebarProps) => {
  const [directMessages, setDirectMessages] = useState<any[]>([]);
  const [groupDms, setGroupDms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useModal();

  useEffect(() => {
    fetchDirectMessages();
  }, []);

  const fetchDirectMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/friends");
      if (response.ok) {
        const data = await response.json();
        setDirectMessages(data.directMessages);
        setGroupDms(data.groupDms);
      }
    } catch (error) {
      console.error("Failed to fetch direct messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-60 bg-[#2B2D31]">
      {/* Header */}
      <div className="p-3 border-b border-[#1E1F22] bg-[#1E1F22]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">Direct Messages</h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={() => onOpen("createDm")}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={() => onOpen("createGroupDm")}
            >
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Quick Actions */}
          <div className="space-y-1">
            <Link href="/message-requests">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1E1F22]"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Requests
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1E1F22]"
              onClick={() => onOpen("inbox")}
            >
              <Inbox className="h-4 w-4 mr-2" />
              Inbox
            </Button>
          </div>

          <Separator className="bg-[#1E1F22]" />

          {/* Direct Messages */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Direct Messages</h3>
            </div>
            
            <div className="space-y-1">
              {isLoading ? (
                <div className="p-2">
                  <p className="text-xs text-gray-400">Loading...</p>
                </div>
              ) : directMessages.length === 0 ? (
                <div className="p-2">
                  <p className="text-xs text-gray-400">No direct messages</p>
                </div>
              ) : (
                directMessages.map((dm) => (
                  <Link
                    key={dm.id}
                    href={`/rooms/${dm.id}`}
                    className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer"
                  >
                    <UserAvatar src={dm.profile.imageUrl} name={dm.profile.name} className="w-8 h-8" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{dm.profile.name}</p>
                      {dm.unreadCount > 0 && (
                        <span className="text-xs bg-red-500 text-white px-1 rounded">
                          {dm.unreadCount}
                        </span>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Group DMs */}
          {groupDms.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Group DMs</h3>
              </div>
              
              <div className="space-y-1">
                {groupDms.map((group) => (
                  <Link
                    key={group.id}
                    href={`/rooms/${group.id}`}
                    className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer"
                  >
                    <UserAvatar src={group.imageUrl} name={group.name} className="w-8 h-8" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{group.name}</p>
                      <p className="text-xs text-gray-400 truncate">{group.memberCount} members</p>
                      {group.unreadCount > 0 && (
                        <span className="text-xs bg-red-500 text-white px-1 rounded">
                          {group.unreadCount}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* User Profile */}
      <UserProfile variant="friends" profile={profile} />
    </div>
  );
}; 