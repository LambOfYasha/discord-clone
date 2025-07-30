"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  User, 
  MessageSquare, 
  Plus,
  Search,
  Hash,
  Globe,
  Users,
  Inbox,
  Home,
  Compass,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { UserProfile } from "@/components/user/user-profile";

interface FriendsSidebarProps {
  servers?: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
  profile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const FriendsSidebar = ({ servers = [], profile, collapsed = false, onToggleCollapse }: FriendsSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { onOpen } = useModal();

  return (
    <div className={`flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Navigation Header */}
      <div className="p-3 border-b border-[#1E1F22] bg-[#1E1F22]">
        <div className="flex items-center justify-between mb-3">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80">
              <div className="w-8 h-8 bg-[#5865F2] rounded flex items-center justify-center">
                <span className="text-white text-lg font-bold">D</span>
              </div>
              {!collapsed && <span className="text-white font-semibold">Discord</span>}
            </div>
          </Link>
          <div className="flex items-center space-x-1">
            {!collapsed && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  onClick={() => onOpen("createServer")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Link href="/discovery">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <Compass className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={onToggleCollapse}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        {!collapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Find or start a conversation"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
            />
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Friends Section */}
          <div>
            <Link href="/friends">
              <div className="flex items-center justify-between mb-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {!collapsed && "Friends"}
                </h3>
              </div>
            </Link>
            
            {!collapsed && (
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
            )}
          </div>

          <Separator className="bg-[#1E1F22]" />

          {/* Direct Messages Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">{!collapsed && "Direct Messages"}</h3>
              {!collapsed && (
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              {/* Sample Direct Messages */}
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">D</span>
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">Davyon כוח</p>
                    </div>
                  )}
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">J</span>
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">Jonathan</p>
                    </div>
                  )}
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">K</span>
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">kaymingss</p>
                    </div>
                  )}
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">G</span>
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">GodHatesChristmas</p>
                    </div>
                  )}
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">D</span>
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">Discord</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs bg-blue-500 text-white px-1 rounded">✓ OFFICIAL</span>
                        <span className="text-xs text-gray-400">Official Discord Message</span>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* User Profile */}
      <UserProfile collapsed={collapsed} variant="friends" profile={profile} />
    </div>
  );
}; 