"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ActiveNowSidebarProps {
  initialCollapsed?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ActiveNowSidebar = ({ initialCollapsed = false, collapsed, onToggleCollapse }: ActiveNowSidebarProps) => {
  // If controlled, use prop; otherwise, fallback to uncontrolled (for backward compatibility)
  const [internalCollapsed, setInternalCollapsed] = useState(initialCollapsed);
  const [activeFriends, setActiveFriends] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isCollapsed = typeof collapsed === 'boolean' ? collapsed : internalCollapsed;
  
  const handleToggle = () => {
    if (onToggleCollapse) onToggleCollapse();
    else setInternalCollapsed((c) => !c);
  };

  useEffect(() => {
    fetchActiveFriends();
  }, []);

  const fetchActiveFriends = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/friends");
      if (response.ok) {
        const data = await response.json();
        // Filter for online friends
        const onlineFriends = data.friends.filter((friend: any) => friend.status === "online");
        setActiveFriends(onlineFriends);
      }
    } catch (error) {
      console.error("Failed to fetch active friends:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex-shrink-0 bg-[#2B2D31] border-l border-[#1E1F22] transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-12 flex items-center px-4 border-b border-[#1E1F22] justify-between">
          {!isCollapsed && <h2 className="text-white font-semibold">Active Now</h2>}
          <button
            className="ml-auto text-gray-400 hover:text-white p-1"
            onClick={handleToggle}
            aria-label={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Content */}
        {!isCollapsed && (
          <ScrollArea className="flex-1 p-4">
            {isLoading ? (
              <div className="text-center">
                <div className="text-gray-400 text-sm">
                  <p>Loading...</p>
                </div>
              </div>
            ) : activeFriends.length === 0 ? (
              <div className="text-center">
                <div className="text-gray-400 text-sm">
                  <p className="mb-2">It's quiet for now...</p>
                  <p className="text-xs">
                    When a friend starts an activity—like playing a game or hanging out on voice—we'll show it here!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400">
                  Active Now — {activeFriends.length}
                </h3>
                <div className="space-y-3">
                  {activeFriends.map((friend) => (
                    <div key={friend.id} className="flex flex-col items-center space-y-2">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={friend.profile.imageUrl} />
                          <AvatarFallback className="bg-pink-500">
                            <span className="text-white text-lg font-semibold">
                              {friend.profile.name.charAt(0).toUpperCase()}
                            </span>
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#2B2D31]"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-white font-medium">{friend.profile.name}</p>
                        <p className="text-xs text-gray-400">{friend.statusText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </div>
  );
}; 