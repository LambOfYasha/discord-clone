"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  User, 
  UserPlus,
  UserMinus,
  Check,
  X,
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

export const MessageRequestsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<"all" | "messages" | "friends">("all");
  const [activeTab, setActiveTab] = useState("requests");
  const [pendingFriendRequests, setPendingFriendRequests] = useState<any[]>([]);
  const [pendingMessageRequests, setPendingMessageRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useModal();

  useEffect(() => {
    fetchAllRequests();
  }, []);

  // Keyboard shortcut for search (Ctrl+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('requests-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchAllRequests = async () => {
    setIsLoading(true);
    try {
      // Fetch friend requests
      const friendsResponse = await fetch("/api/friends");
      if (friendsResponse.ok) {
        const friendsData = await friendsResponse.json();
        setPendingFriendRequests(friendsData.pendingRequests);
      }

      // Fetch message requests
      const messageResponse = await fetch("/api/message-requests");
      if (messageResponse.ok) {
        const messageData = await messageResponse.json();
        setPendingMessageRequests(messageData.pending);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptFriendRequest = async (requesterProfileId: string) => {
    try {
      const response = await fetch(`/api/friend-requests/${requesterProfileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "accept" }),
      });

      if (response.ok) {
        fetchAllRequests(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    }
  };

  const handleRejectFriendRequest = async (requesterProfileId: string) => {
    try {
      const response = await fetch(`/api/friend-requests/${requesterProfileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reject" }),
      });

      if (response.ok) {
        fetchAllRequests(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to reject friend request:", error);
    }
  };

  const handleAcceptMessageRequest = async (requesterProfileId: string) => {
    try {
      const response = await fetch(`/api/message-requests/${requesterProfileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "accept" }),
      });

      if (response.ok) {
        fetchAllRequests(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to accept message request:", error);
    }
  };

  const handleRejectMessageRequest = async (requesterProfileId: string) => {
    try {
      const response = await fetch(`/api/message-requests/${requesterProfileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reject" }),
      });

      if (response.ok) {
        fetchAllRequests(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to reject message request:", error);
    }
  };

  // Enhanced filtering logic
  const getFilteredMessageRequests = () => {
    let filtered = pendingMessageRequests;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request =>
        request.requesterProfile.name.toLowerCase().includes(query) ||
        request.requesterProfile.email.toLowerCase().includes(query) ||
        request.message?.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getFilteredFriendRequests = () => {
    let filtered = pendingFriendRequests;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request =>
        request.requesterProfile.name.toLowerCase().includes(query) ||
        request.requesterProfile.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredMessageRequests = getFilteredMessageRequests();
  const filteredFriendRequests = getFilteredFriendRequests();

  const clearSearch = () => {
    setSearchQuery("");
    setSearchFilter("all");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-white" />
          <h1 className="text-white font-semibold">Message Requests</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-4 py-2 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "requests" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("requests")}
            className={activeTab === "requests" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Message Requests ({filteredMessageRequests.length})
          </Button>
          <Button
            variant={activeTab === "friends" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("friends")}
            className={activeTab === "friends" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Friend Requests ({filteredFriendRequests.length})
          </Button>
        </div>
      </div>

      {/* Enhanced Search */}
      <div className="p-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="requests-search-input"
              placeholder="Search requests by name, email, or message... (Ctrl+F)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Search Filters */}
          {(searchQuery || searchFilter !== "all") && (
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filter:</span>
              <Button
                variant={searchFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchFilter("all")}
                className="h-6 text-xs"
              >
                All
              </Button>
              <Button
                variant={searchFilter === "messages" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchFilter("messages")}
                className="h-6 text-xs"
              >
                Messages
              </Button>
              <Button
                variant={searchFilter === "friends" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchFilter("friends")}
                className="h-6 text-xs"
              >
                Friends
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : (
            <>
              {activeTab === "requests" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    Message Requests — {filteredMessageRequests.length}
                    {searchQuery && (
                      <span className="text-xs text-gray-500 ml-2">
                        (filtered from {pendingMessageRequests.length})
                      </span>
                    )}
                  </h3>
                  
                  <div className="space-y-3">
                    {filteredMessageRequests.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">
                          {searchQuery ? "No message requests match your search" : "No message requests"}
                        </p>
                      </div>
                    ) : (
                      filteredMessageRequests.map((request) => (
                        <div key={request.id} className="bg-[#1E1F22] rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div
                              onClick={() => onOpen("userProfile", { profile: request.requesterProfile })}
                              className="cursor-pointer"
                            >
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={request.requesterProfile.imageUrl} />
                                <AvatarFallback className="bg-blue-500">
                                  <span className="text-white text-lg font-semibold">
                                    {request.requesterProfile.name.charAt(0).toUpperCase()}
                                  </span>
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="cursor-pointer">
                                  <h4 className="text-white font-medium">{request.requesterProfile.name}</h4>
                                  <p className="text-sm text-gray-400">Wants to send you a message</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleAcceptMessageRequest(request.requesterProfile.id)}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                    onClick={() => handleRejectMessageRequest(request.requesterProfile.id)}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Decline
                                  </Button>
                                </div>
                              </div>
                              <div className="bg-[#2B2D31] rounded p-3 mt-2">
                                <p className="text-gray-300 text-sm">
                                  "{request.message}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === "friends" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    Friend Requests — {filteredFriendRequests.length}
                    {searchQuery && (
                      <span className="text-xs text-gray-500 ml-2">
                        (filtered from {pendingFriendRequests.length})
                      </span>
                    )}
                  </h3>
                  
                  <div className="space-y-3">
                    {filteredFriendRequests.length === 0 ? (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">
                          {searchQuery ? "No friend requests match your search" : "No pending friend requests"}
                        </p>
                      </div>
                    ) : (
                      filteredFriendRequests.map((request) => (
                        <div key={request.id} className="bg-[#1E1F22] rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div
                              onClick={() => onOpen("userProfile", { profile: request.requesterProfile })}
                              className="cursor-pointer"
                            >
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={request.requesterProfile.imageUrl} />
                                <AvatarFallback className="bg-green-500">
                                  <span className="text-white text-lg font-semibold">
                                    {request.requesterProfile.name.charAt(0).toUpperCase()}
                                  </span>
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="cursor-pointer">
                                  <h4 className="text-white font-medium">{request.requesterProfile.name}</h4>
                                  <p className="text-sm text-gray-400">Wants to be your friend</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleAcceptFriendRequest(request.requesterProfile.id)}
                                  >
                                    <UserPlus className="h-4 w-4 mr-1" />
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                    onClick={() => handleRejectFriendRequest(request.requesterProfile.id)}
                                  >
                                    <UserMinus className="h-4 w-4 mr-1" />
                                    Decline
                                  </Button>
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm">
                                "Hey! I'd like to connect with you!"
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}; 