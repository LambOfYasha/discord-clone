"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MessageSquare, 
  MoreVertical,
  Search,
  Plus,
  Users,
  Check,
  X
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

interface Friend {
  id: string;
  profile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
  memberId?: string;
  status: string;
  statusText: string;
}

interface PendingRequest {
  id: string;
  requesterProfile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
}

interface DirectMessage {
  id: string;
  profile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
  lastMessage: string;
  unreadCount: number;
}

export const FriendsList = () => {
  const [activeTab, setActiveTab] = useState("online");
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([]);
  const [counts, setCounts] = useState({
    online: 0,
    all: 0,
    pending: 0,
    blocked: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useModal();
  const router = useRouter();

  useEffect(() => {
    fetchFriendsData();
  }, []);

  const fetchFriendsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/friends");
      if (response.ok) {
        const data = await response.json();
        console.log("Friends data received:", data.friends);
        setFriends(data.friends);
        setPendingRequests(data.pendingRequests);
        setDirectMessages(data.directMessages);
        setCounts(data.counts);
      }
    } catch (error) {
      console.error("Failed to fetch friends data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (requesterProfileId: string) => {
    try {
      const response = await fetch(`/api/friend-requests/${requesterProfileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "accept" }),
      });

      if (response.ok) {
        fetchFriendsData(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    }
  };

  const handleRejectRequest = async (requesterProfileId: string) => {
    try {
      const response = await fetch(`/api/friend-requests/${requesterProfileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reject" }),
      });

      if (response.ok) {
        fetchFriendsData(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to reject friend request:", error);
    }
  };

  const handleCreateDM = async (friend: Friend) => {
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

  const filteredFriends = friends.filter(friend =>
    friend.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter(friend => friend.status === "online");
  const allFriends = filteredFriends;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-white" />
          <h1 className="text-white font-semibold">Friends</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-4 py-2 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "online" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("online")}
            className={activeTab === "online" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Online — {counts.online}
          </Button>
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            All — {counts.all}
          </Button>
          <Button
            variant={activeTab === "pending" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("pending")}
            className={activeTab === "pending" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Pending — {counts.pending}
          </Button>
          <Button
            variant={activeTab === "blocked" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("blocked")}
            className={activeTab === "blocked" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Blocked — {counts.blocked}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 ml-auto">
          <Button
            size="sm"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
            onClick={() => onOpen("createGroupDm")}
          >
            <Users className="h-4 w-4 mr-1" />
            Group DM
          </Button>
          <Button
            size="sm"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
            onClick={() => onOpen("addFriend")}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Friend
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Friends List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : (
            <>
              {activeTab === "online" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    Online — {onlineFriends.length}
                  </h3>
                  
                  <div className="space-y-2">
                    {onlineFriends.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-gray-400">No friends online</p>
                      </div>
                    ) : (
                      onlineFriends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1E1F22] cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={friend.profile.imageUrl} />
                                <AvatarFallback className="bg-pink-500">
                                  <span className="text-white text-sm font-semibold">
                                    {friend.profile.name.charAt(0).toUpperCase()}
                                  </span>
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2B2D31]"></div>
                            </div>
                            <div>
                              <p className="text-white font-medium">{friend.profile.name}</p>
                              <p className="text-sm text-gray-400">{friend.statusText}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                              onClick={() => handleCreateDM(friend)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === "all" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    All Friends — {allFriends.length}
                  </h3>
                  
                  <div className="space-y-2">
                    {allFriends.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-gray-400">No friends yet</p>
                      </div>
                    ) : (
                      allFriends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1E1F22] cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={friend.profile.imageUrl} />
                                <AvatarFallback className="bg-pink-500">
                                  <span className="text-white text-sm font-semibold">
                                    {friend.profile.name.charAt(0).toUpperCase()}
                                  </span>
                                </AvatarFallback>
                              </Avatar>
                              {friend.status === "online" && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2B2D31]"></div>
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">{friend.profile.name}</p>
                              <p className="text-sm text-gray-400">{friend.statusText}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                              onClick={() => handleCreateDM(friend)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === "pending" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    Pending Requests — {pendingRequests.length}
                  </h3>
                  
                  <div className="space-y-2">
                    {pendingRequests.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-gray-400">No pending friend requests</p>
                      </div>
                    ) : (
                      pendingRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border border-[#1E1F22]">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={request.requesterProfile.imageUrl} />
                              <AvatarFallback className="bg-pink-500">
                                <span className="text-white text-sm font-semibold">
                                  {request.requesterProfile.name.charAt(0).toUpperCase()}
                                </span>
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white font-medium">{request.requesterProfile.name}</p>
                              <p className="text-sm text-gray-400">Wants to be your friend</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-green-500 hover:text-green-400"
                              onClick={() => handleAcceptRequest(request.requesterProfile.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-400"
                              onClick={() => handleRejectRequest(request.requesterProfile.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === "blocked" && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No blocked users</p>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}; 