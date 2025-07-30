"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/use-modal-store";
import { Search, User, Plus, Check, X, Hash } from "lucide-react";

export const AddFriendModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [userIdInput, setUserIdInput] = useState("");
  const [isSendingById, setIsSendingById] = useState(false);
  const [sendByIdMessage, setSendByIdMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const isModalOpen = isOpen && type === "addFriend";

  useEffect(() => {
    if (isModalOpen) {
      fetchUsers();
      fetchPendingRequests();
      fetchCurrentUserId();
    }
  }, [isModalOpen]);

  const fetchCurrentUserId = async () => {
    try {
      const response = await fetch("/api/current-user");
      if (response.ok) {
        const data = await response.json();
        setCurrentUserId(data.id);
      }
    } catch (error) {
      console.error("Failed to fetch current user ID:", error);
    }
  };

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await fetch("/api/members");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch("/api/friend-requests");
      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data.pending.map((req: any) => req.targetProfileId));
        setSentRequests(data.sent.map((req: any) => req.targetProfileId));
      }
    } catch (error) {
      console.error("Failed to fetch friend requests:", error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendFriendRequest = async (targetProfileId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/friend-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetProfileId,
        }),
      });

      if (response.ok) {
        setSentRequests(prev => [...prev, targetProfileId]);
      } else {
        console.error("Failed to send friend request");
      }
    } catch (error) {
      console.error("Failed to send friend request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRequest = async (targetProfileId: string) => {
    try {
      const response = await fetch(`/api/friend-requests/${targetProfileId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSentRequests(prev => prev.filter(id => id !== targetProfileId));
      }
    } catch (error) {
      console.error("Failed to cancel friend request:", error);
    }
  };

  const handleSendFriendRequestById = async () => {
    if (!userIdInput.trim()) {
      setSendByIdMessage("Please enter a user ID");
      return;
    }

    setIsSendingById(true);
    setSendByIdMessage("");

    try {
      const response = await fetch("/api/friend-requests/send-by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdInput.trim(),
        }),
      });

      if (response.ok) {
        setSendByIdMessage("Friend request sent successfully!");
        setUserIdInput("");
        fetchPendingRequests(); // Refresh the list
      } else {
        const errorData = await response.text();
        setSendByIdMessage(errorData);
      }
    } catch (error) {
      console.error("Failed to send friend request:", error);
      setSendByIdMessage("Failed to send friend request");
    } finally {
      setIsSendingById(false);
    }
  };

  const getRequestStatus = (profileId: string) => {
    if (pendingRequests.includes(profileId)) {
      return "pending";
    }
    if (sentRequests.includes(profileId)) {
      return "sent";
    }
    return "none";
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl text-center font-bold">
            Add Friend
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Search for users to add as friends
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          {/* Send by User ID */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Hash className="h-4 w-4 mr-2" />
              Send Friend Request by User ID
            </h3>
            {currentUserId && (
              <p className="text-xs text-gray-500 mb-2">
                Your User ID: <span className="font-mono bg-gray-200 px-1 rounded">{currentUserId}</span>
              </p>
            )}
            <div className="flex space-x-2">
              <Input
                placeholder="Enter user ID..."
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleSendFriendRequestById}
                disabled={isSendingById}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                {isSendingById ? "Sending..." : "Send"}
              </Button>
            </div>
            {sendByIdMessage && (
              <p className={`text-sm mt-2 ${
                sendByIdMessage.includes("successfully") 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {sendByIdMessage}
              </p>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search for users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Users List */}
          <ScrollArea className="max-h-60">
            <div className="space-y-2">
              {isLoadingUsers ? (
                <div className="text-center py-4 text-zinc-500">
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-zinc-500">
                  {searchQuery ? "No users found" : "No users available"}
                </div>
              ) : (
                filteredUsers.map((user) => {
                  const requestStatus = getRequestStatus(user.profile.id);
                  
                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-zinc-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profile.imageUrl} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {user.profile.name}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {user.profile.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {requestStatus === "pending" && (
                          <Badge variant="secondary" className="text-xs">
                            Pending
                          </Badge>
                        )}
                        {requestStatus === "sent" && (
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline" className="text-xs">
                              Sent
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              onClick={() => handleCancelRequest(user.profile.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {requestStatus === "none" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-600"
                            onClick={() => handleSendFriendRequest(user.profile.id)}
                            disabled={isLoading}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 