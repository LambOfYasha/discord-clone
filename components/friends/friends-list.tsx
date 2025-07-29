"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  MessageSquare, 
  MoreVertical,
  Search,
  Plus
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

export const FriendsList = () => {
  const [activeTab, setActiveTab] = useState("online");
  const [searchQuery, setSearchQuery] = useState("");
  const { onOpen } = useModal();

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
            Online
          </Button>
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            All
          </Button>
          <Button
            variant={activeTab === "pending" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("pending")}
            className={activeTab === "pending" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Pending
          </Button>
          <Button
            variant={activeTab === "blocked" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("blocked")}
            className={activeTab === "blocked" ? "bg-[#5865F2] text-white" : "text-gray-400 hover:text-white"}
          >
            Blocked
          </Button>
        </div>
        
        <Button
          size="sm"
          className="ml-auto bg-[#5865F2] hover:bg-[#4752C4] text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Friend
        </Button>
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
          {activeTab === "online" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-4">
                Online — 1
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1E1F22] cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">P</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2B2D31]"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">PlusOnBlock</p>
                      <p className="text-sm text-gray-400">Waiting patiently for Ingrid</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
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
              </div>
            </div>
          )}

          {activeTab === "all" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-4">
                All Friends — 1
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1E1F22] cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">P</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2B2D31]"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">PlusOnBlock</p>
                      <p className="text-sm text-gray-400">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
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
              </div>
            </div>
          )}

          {activeTab === "pending" && (
            <div className="text-center py-8">
              <p className="text-gray-400">No pending friend requests</p>
            </div>
          )}

          {activeTab === "blocked" && (
            <div className="text-center py-8">
              <p className="text-gray-400">No blocked users</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}; 