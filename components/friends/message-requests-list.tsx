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
  Search
} from "lucide-react";

export const MessageRequestsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("requests");
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/friends");
      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data.pendingRequests);
      }
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
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
        fetchPendingRequests(); // Refresh data
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
        fetchPendingRequests(); // Refresh data
      }
    } catch (error) {
      console.error("Failed to reject friend request:", error);
    }
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
            Message Requests
          </Button>
          <Button
            variant={activeTab === "friends" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("friends")}
            className={activeTab === "friends" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Friend Requests
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
          />
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
                    Message Requests — 0
                  </h3>
                  
                  <div className="text-center py-8">
                    <p className="text-gray-400">No message requests</p>
                  </div>
                </div>
              )}

              {activeTab === "friends" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">
                    Friend Requests — {pendingRequests.length}
                  </h3>
                  
                  <div className="space-y-3">
                    {pendingRequests.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">No pending friend requests</p>
                      </div>
                    ) : (
                      pendingRequests.map((request) => (
                        <div key={request.id} className="bg-[#1E1F22] rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={request.requesterProfile.imageUrl} />
                              <AvatarFallback className="bg-green-500">
                                <span className="text-white text-lg font-semibold">
                                  {request.requesterProfile.name.charAt(0).toUpperCase()}
                                </span>
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="text-white font-medium">{request.requesterProfile.name}</h4>
                                  <p className="text-sm text-gray-400">Wants to be your friend</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleAcceptRequest(request.requesterProfile.id)}
                                  >
                                    <UserPlus className="h-4 w-4 mr-1" />
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                    onClick={() => handleRejectRequest(request.requesterProfile.id)}
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