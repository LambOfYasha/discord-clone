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
  ChevronRight,
  MoreVertical,
  Trash2
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/components/user/user-profile";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [directMessages, setDirectMessages] = useState<any[]>([]);
  const [groupDms, setGroupDms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useModal();
  const router = useRouter();

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

  const handleCreateDM = async (friend: any) => {
    let memberId = friend.memberId;

    // If no memberId, try to get or create one
    if (!memberId) {
      console.log("No member ID found for friend, trying to get or create one:", friend.profile.name, friend.profile.id);
      
      try {
        const memberResponse = await fetch("/api/members/get-or-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileId: friend.profile.id,
          }),
        });

        if (memberResponse.ok) {
          const memberData = await memberResponse.json();
          memberId = memberData.memberId;
          console.log("Got member ID:", memberId);
        } else {
          console.error("Failed to get or create member ID");
          return;
        }
      } catch (error) {
        console.error("Failed to get or create member ID:", error);
        return;
      }
    }

    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          type: "dm",
          targetMemberId: memberId,
        }),
      });

      if (response.ok) {
        const room = await response.json();
        // Navigate to the room
        router.push(`/rooms/${room.id}`);
      } else {
        console.error("Failed to create DM room");
      }
    } catch (error) {
      console.error("Failed to create DM:", error);
    }
  };

  const handleDeleteConversation = (dm: any) => {
    onOpen("deleteConversation", {
      conversation: {
        id: dm.id,
        name: dm.profile.name,
        type: "dm",
      },
    });
  };

  const handleDeleteGroupConversation = (group: any) => {
    onOpen("deleteGroupConversation", {
      groupConversation: {
        id: group.id,
        name: group.name,
        type: "group",
      },
    });
  };

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
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  onClick={() => onOpen("createDm")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {!collapsed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => onOpen("createGroupDm")}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
                  <div
                    key={dm.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-[#1E1F22] group"
                  >
                    <Link
                      href={`/rooms/${dm.id}`}
                      className="flex items-center space-x-2 flex-1 cursor-pointer"
                    >
                      <UserAvatar src={dm.profile.imageUrl} name={dm.profile.name} className="w-8 h-8" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{dm.profile.name}</p>
                          {dm.unreadCount > 0 && (
                            <span className="text-xs bg-red-500 text-white px-1 rounded">
                              {dm.unreadCount}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                    {!collapsed && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          className="w-48 bg-[#2B2D31] border-[#1E1F22]"
                        >
                          <DropdownMenuItem
                            onClick={() => handleDeleteConversation(dm)}
                            className="text-red-500 focus:text-red-400 focus:bg-[#1E1F22] cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Conversation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ))
              )}

                             {/* Group DMs */}
               {groupDms.length > 0 && (
                 <>
                   {!collapsed && (
                     <div className="mt-2 mb-1">
                       <h4 className="text-xs font-semibold text-gray-400">Group DMs</h4>
                     </div>
                   )}
                   {groupDms.map((group) => (
                     <div
                       key={group.id}
                       className="flex items-center justify-between p-2 rounded hover:bg-[#1E1F22] group"
                     >
                       <Link
                         href={`/rooms/${group.id}`}
                         className="flex items-center space-x-2 flex-1 cursor-pointer"
                       >
                         <UserAvatar src={group.imageUrl} name={group.name} className="w-8 h-8" />
                         {!collapsed && (
                           <div className="flex-1 min-w-0">
                             <p className="text-sm text-white truncate">{group.name}</p>
                             <p className="text-xs text-gray-400 truncate">{group.memberCount} members</p>
                             {group.unreadCount > 0 && (
                               <span className="text-xs bg-red-500 text-white px-1 rounded">
                                 {group.unreadCount}
                               </span>
                             )}
                           </div>
                         )}
                       </Link>
                       {!collapsed && (
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button
                               variant="ghost"
                               size="sm"
                               className="h-6 w-6 p-0 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                               <MoreVertical className="h-3 w-3" />
                             </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent
                             side="right"
                             align="start"
                             className="w-48 bg-[#2B2D31] border-[#1E1F22]"
                           >
                             <DropdownMenuItem
                               onClick={() => handleDeleteGroupConversation(group)}
                               className="text-red-500 focus:text-red-400 focus:bg-[#1E1F22] cursor-pointer"
                             >
                               <Trash2 className="h-4 w-4 mr-2" />
                               Delete Group
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                       )}
                     </div>
                   ))}
                 </>
               )}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* User Profile */}
      <UserProfile collapsed={collapsed} variant="friends" profile={profile} />
    </div>
  );
}; 