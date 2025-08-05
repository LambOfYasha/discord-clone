"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw, Users, Send, X } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

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

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invite";
  const { server } = data;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "friends">("link");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<Set<string>>(new Set());
  const [sendingInvites, setSendingInvites] = useState(false);
  const [sentInvites, setSentInvites] = useState<Set<string>>(new Set());
  
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  useEffect(() => {
    if (isModalOpen && activeTab === "friends") {
      fetchFriends();
    }
  }, [isModalOpen, activeTab]);

  const fetchFriends = async () => {
    try {
      const response = await fetch("/api/friends");
      if (response.ok) {
        const data = await response.json();
        setFriends(data.friends || []);
      }
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFriendSelection = (friendId: string) => {
    const newSelected = new Set(selectedFriends);
    if (newSelected.has(friendId)) {
      newSelected.delete(friendId);
    } else {
      newSelected.add(friendId);
    }
    setSelectedFriends(newSelected);
  };

  const sendInviteToFriends = async () => {
    if (selectedFriends.size === 0) return;

    setSendingInvites(true);
    try {
      const selectedFriendsArray = Array.from(selectedFriends);
      
      for (const friendId of selectedFriendsArray) {
        const friend = friends.find(f => f.id === friendId);
        if (!friend) continue;

                 try {
           // First, try to get existing DM room
           const existingRoomsResponse = await fetch("/api/rooms");
           let room = null;
           
           if (existingRoomsResponse.ok) {
             const existingRooms = await existingRoomsResponse.json();
             // Find existing DM with this friend
             room = existingRooms.find((r: any) => 
               r.type === "dm" && 
               r.members.some((m: any) => m.id === friend.memberId)
             );
           }
           
           // If no existing DM, create a new one
           if (!room) {
             const roomResponse = await fetch("/api/rooms", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({
                 type: "dm",
                 targetMemberId: friend.memberId,
               }),
             });

             if (roomResponse.ok) {
               room = await roomResponse.json();
             }
           }

           if (room) {
            
                         // Get server member count for the invite message
             const memberCount = server?.members?.length || 0;
             
             // Send invite message
             const messageResponse = await fetch(`/api/rooms/${room.id}/messages`, {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({
                 content: `🎉 **Server Invitation**\n\nYou've been invited to join **${server?.name}**!\n\n**Invite Link:** ${inviteUrl}\n\nClick the link above to join the server.`,
                 fileUrl: null,
               }),
             });

            if (messageResponse.ok) {
              setSentInvites(prev => new Set([...prev, friendId]));
            }
          }
        } catch (error) {
          console.error(`Failed to send invite to ${friend.profile.name}:`, error);
        }
      }
    } finally {
      setSendingInvites(false);
    }
  };

  const onlineFriends = friends.filter(friend => friend.status === "online");
  const allFriends = friends;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-4xl text-center font-bold mb-3">
              Invite your friends!
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Share this link with your friends and colleagues and invite them
              to join your server.
            </DialogDescription>
          </DialogHeader>
          
          {/* Tab Navigation */}
          <div className="flex items-center px-6 border-b border-zinc-200">
            <Button
              variant={activeTab === "link" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("link")}
              className="mr-2"
            >
              Invite Link
            </Button>
            <Button
              variant={activeTab === "friends" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("friends")}
              className="flex items-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Send to Friends
            </Button>
          </div>

          {activeTab === "link" && (
            <div className="p-6">
              <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                Server Invite Link
              </Label>
              <div className="flex items-center mt-2 gap-x-2">
                <Input
                  disabled={isLoading}
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                  value={inviteUrl}
                  readOnly
                />
                <Button size="icon" onClick={onCopy} disabled={isLoading}>
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                disabled={isLoading}
                onClick={onNew}
                variant="link"
                size="sm"
                className="text-zinc-500 mt-4 text-xs"
              >
                Generate a new link
                <RefreshCw className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {activeTab === "friends" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-semibold text-zinc-700">
                  Select friends to invite
                </Label>
                {selectedFriends.size > 0 && (
                  <Button
                    onClick={sendInviteToFriends}
                    disabled={sendingInvites}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {sendingInvites ? "Sending..." : `Send to ${selectedFriends.size} friend${selectedFriends.size > 1 ? 's' : ''}`}
                  </Button>
                )}
              </div>

              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {allFriends.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-zinc-500">No friends found</p>
                    </div>
                  ) : (
                    allFriends.map((friend) => {
                      const isSelected = selectedFriends.has(friend.id);
                      const isSent = sentInvites.has(friend.id);
                      
                      return (
                        <div
                          key={friend.id}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                            isSelected 
                              ? "bg-indigo-50 border-indigo-200" 
                              : "hover:bg-gray-50 border-gray-200"
                          }`}
                          onClick={() => toggleFriendSelection(friend.id)}
                        >
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
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div>
                              <p className="text-zinc-900 font-medium">{friend.profile.name}</p>
                              <p className="text-sm text-zinc-500">{friend.statusText}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isSent && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Sent
                              </Badge>
                            )}
                            {isSelected && !isSent && (
                              <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
