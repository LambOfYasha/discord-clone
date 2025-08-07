"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Users, Activity } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ActiveNowSidebarProps {
  initialCollapsed?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ActiveNowSidebar = ({ initialCollapsed = false, collapsed, onToggleCollapse }: ActiveNowSidebarProps) => {
  // If controlled, use prop; otherwise, fallback to uncontrolled (for backward compatibility)
  const [internalCollapsed, setInternalCollapsed] = useState(initialCollapsed);
  const [activeFriends, setActiveFriends] = useState<any[]>([]);
  const [followedUsers, setFollowedUsers] = useState<any[]>([]);
  const [followedServers, setFollowedServers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useModal();
  const isCollapsed = typeof collapsed === 'boolean' ? collapsed : internalCollapsed;
  
  const handleToggle = () => {
    if (onToggleCollapse) onToggleCollapse();
    else setInternalCollapsed((c) => !c);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch active friends
      const friendsResponse = await fetch("/api/friends");
      if (friendsResponse.ok) {
        const friendsData = await friendsResponse.json();
        const onlineFriends = friendsData.friends.filter((friend: any) => friend.status === "online");
        setActiveFriends(onlineFriends);
      }

      // Fetch followed users
      const followedResponse = await fetch("/api/follows/following");
      if (followedResponse.ok) {
        const followedData = await followedResponse.json();
        setFollowedUsers(followedData.following || []);
      }

      // Fetch followed servers
      const serverFollowsResponse = await fetch("/api/server-follows/following");
      if (serverFollowsResponse.ok) {
        const serverFollowsData = await serverFollowsResponse.json();
        setFollowedServers(serverFollowsData.following || []);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex-shrink-0 bg-[#2B2D31] border-l border-[#1E1F22] transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-12 flex items-center px-4 border-b border-[#1E1F22] justify-between">
          {!isCollapsed && <h2 className="text-white font-semibold">Activity</h2>}
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
            ) : (
              <div className="space-y-6">
                {/* Active Friends Section */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-400">
                      Active Now — {activeFriends.length}
                    </h3>
                  </div>
                  {activeFriends.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">No friends online</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeFriends.map((friend) => (
                        <div key={friend.id} className="flex flex-col items-center space-y-2">
                          <div className="relative">
                            <div
                              onClick={() => onOpen("userProfile", { profile: friend.profile })}
                              className="cursor-pointer"
                            >
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={friend.profile.imageUrl} />
                                <AvatarFallback className="bg-pink-500">
                                  <span className="text-white text-sm font-semibold">
                                    {friend.profile.name.charAt(0).toUpperCase()}
                                  </span>
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2B2D31]"></div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-white font-medium">{friend.profile.name}</p>
                            <p className="text-xs text-gray-400">{friend.statusText}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Followed Users Section */}
                {followedUsers.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <h3 className="text-sm font-semibold text-gray-400">
                        Following — {followedUsers.length}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {followedUsers.map((followed) => (
                        <div key={followed.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#1E1F22]">
                          <div
                            onClick={() => onOpen("userProfile", { profile: followed.followingProfile })}
                            className="cursor-pointer"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={followed.followingProfile.imageUrl} />
                              <AvatarFallback className="bg-blue-500">
                                <span className="text-white text-xs font-semibold">
                                  {followed.followingProfile.name.charAt(0).toUpperCase()}
                                </span>
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0 cursor-pointer">
                            <p className="text-xs text-white font-medium truncate">
                              {followed.followingProfile.name}
                            </p>
                            <p className="text-xs text-gray-400">Following</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Followed Servers Section */}
                {followedServers.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <h3 className="text-sm font-semibold text-gray-400">
                        Following Servers — {followedServers.length}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {followedServers.map((serverFollow) => (
                        <div key={serverFollow.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#1E1F22] cursor-pointer">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={serverFollow.server.imageUrl} />
                            <AvatarFallback className="bg-purple-500">
                              <span className="text-white text-xs font-semibold">
                                {serverFollow.server.name.charAt(0).toUpperCase()}
                              </span>
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white font-medium truncate">
                              {serverFollow.server.name}
                            </p>
                            <p className="text-xs text-gray-400">Server</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {activeFriends.length === 0 && followedUsers.length === 0 && followedServers.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-sm">
                      <p className="mb-2">It's quiet for now...</p>
                      <p className="text-xs">
                        Follow friends and servers to see their activity here!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </div>
  );
}; 