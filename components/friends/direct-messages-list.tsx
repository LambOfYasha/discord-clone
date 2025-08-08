"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send,
  MoreVertical,
  Phone,
  Video,
  Info,
  Search,
  Filter,
  X,
  Users,
  Hash
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Room {
  id: string;
  type: 'dm' | 'group';
  name?: string;
  imageUrl?: string;
  otherMember?: {
    profile: {
      id: string;
      name: string;
      imageUrl: string;
    };
  };
  members?: Array<{
    profile: {
      id: string;
      name: string;
      imageUrl: string;
    };
  }>;
  lastMessage?: string;
  unreadCount?: number;
}

export const DirectMessagesList = ({ rooms, loading }: { rooms: Room[], loading: boolean }) => {
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<"all" | "dm" | "group">("all");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const router = useRouter();

  // Keyboard shortcut for search (Ctrl+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('dm-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter rooms based on search query and filter
  useEffect(() => {
    let filtered = rooms;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(room => {
        // Search in room name
        if (room.name?.toLowerCase().includes(query)) return true;
        
        // Search in other member's name (for DMs)
        if (room.otherMember?.profile.name.toLowerCase().includes(query)) return true;
        
        // Search in all members' names (for group DMs)
        if (room.members?.some(member => 
          member.profile.name.toLowerCase().includes(query)
        )) return true;
        
        // Search in last message
        if (room.lastMessage?.toLowerCase().includes(query)) return true;
        
        return false;
      });
    }

    // Filter by type
    if (searchFilter === "dm") {
      filtered = filtered.filter(room => room.type === "dm");
    } else if (searchFilter === "group") {
      filtered = filtered.filter(room => room.type === "group");
    }

    setFilteredRooms(filtered);
  }, [rooms, searchQuery, searchFilter]);

  // Set first room as selected by default
  useEffect(() => {
    if (filteredRooms.length > 0 && !selectedRoom) {
      setSelectedRoom(filteredRooms[0]);
    }
  }, [filteredRooms, selectedRoom]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchFilter("all");
  };

  const getRoomDisplayName = (room: Room) => {
    if (room.name) return room.name;
    if (room.type === "dm" && room.otherMember) {
      return room.otherMember.profile.name;
    }
    if (room.type === "group" && room.members) {
      return room.members.map(m => m.profile.name).join(", ");
    }
    return "Unknown";
  };

  const getRoomAvatar = (room: Room) => {
    if (room.imageUrl) return room.imageUrl;
    if (room.type === "dm" && room.otherMember) {
      return room.otherMember.profile.imageUrl;
    }
    return null;
  };

  const getRoomAvatarFallback = (room: Room) => {
    if (room.name) return room.name.charAt(0).toUpperCase();
    if (room.type === "dm" && room.otherMember) {
      return room.otherMember.profile.name.charAt(0).toUpperCase();
    }
    if (room.type === "group" && room.members) {
      return room.members.length > 0 ? room.members[0].profile.name.charAt(0).toUpperCase() : "G";
    }
    return "?";
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    router.push(`/rooms/${room.id}`);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedRoom) {
      // Handle send message logic here
      console.log("Sending message to room:", selectedRoom.id, message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex">
      {/* Rooms List */}
      <div className="w-80 border-r border-[#1E1F22] bg-[#2B2D31] flex flex-col">
        {/* Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-[#1E1F22]">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-white" />
            <h1 className="text-white font-semibold">Direct Messages</h1>
          </div>
          <Button
            size="sm"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
            onClick={() => router.push('/friends')}
          >
            <Users className="h-4 w-4 mr-1" />
            New DM
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#1E1F22]">
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="dm-search-input"
                placeholder="Search conversations... (Ctrl+F)"
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
                  variant={searchFilter === "dm" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSearchFilter("dm")}
                  className="h-6 text-xs"
                >
                  DMs
                </Button>
                <Button
                  variant={searchFilter === "group" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSearchFilter("group")}
                  className="h-6 text-xs"
                >
                  Groups
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Rooms List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Loading conversations...</p>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">
                  {searchQuery ? "No conversations match your search" : "No direct messages yet"}
                </p>
                {!searchQuery && (
                  <Button
                    size="sm"
                    className="mt-4 bg-[#5865F2] hover:bg-[#4752C4] text-white"
                    onClick={() => router.push('/friends')}
                  >
                    Start a conversation
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedRoom?.id === room.id 
                        ? 'bg-[#5865F2] text-white' 
                        : 'hover:bg-[#1E1F22] text-gray-300'
                    }`}
                    onClick={() => handleRoomSelect(room)}
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={getRoomAvatar(room)} />
                        <AvatarFallback className="bg-[#5865F2] text-white">
                          {getRoomAvatarFallback(room)}
                        </AvatarFallback>
                      </Avatar>
                      {room.unreadCount && room.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {room.unreadCount > 99 ? '99+' : room.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium truncate">
                          {getRoomDisplayName(room)}
                        </p>
                        {room.type === "group" && (
                          <Hash className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                      {room.lastMessage && (
                        <p className="text-sm text-gray-400 truncate">
                          {room.lastMessage}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#313338]">
        {selectedRoom ? (
          <>
            {/* Header */}
            <div className="h-12 flex items-center justify-between px-4 border-b border-[#1E1F22] bg-[#2B2D31]">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={getRoomAvatar(selectedRoom)} />
                  <AvatarFallback className="bg-[#5865F2] text-white">
                    {getRoomAvatarFallback(selectedRoom)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-white font-semibold">{getRoomDisplayName(selectedRoom)}</h1>
                  <p className="text-xs text-gray-400">
                    {selectedRoom.type === "dm" ? "Direct Message" : "Group DM"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <Video className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {/* Sample Messages */}
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={getRoomAvatar(selectedRoom)} />
                    <AvatarFallback className="bg-[#5865F2] text-white">
                      {getRoomAvatarFallback(selectedRoom)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium text-sm">{getRoomDisplayName(selectedRoom)}</span>
                      <span className="text-xs text-gray-400">Today at 2:30 PM</span>
                    </div>
                    <p className="text-gray-300 text-sm">Hey! How are you doing?</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-yellow-500 text-white">א</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium text-sm">אביר (Brian)</span>
                      <span className="text-xs text-gray-400">Today at 2:32 PM</span>
                    </div>
                    <p className="text-gray-300 text-sm">I'm doing great! Just working on this Discord clone project. How about you?</p>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-[#1E1F22] bg-[#2B2D31]">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder={`Message @${getRoomDisplayName(selectedRoom)}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
                />
                <Button
                  size="sm"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 