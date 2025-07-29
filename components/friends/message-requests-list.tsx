"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
          {activeTab === "requests" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-4">
                Message Requests — 2
              </h3>
              
              <div className="space-y-3">
                {/* Sample Message Request */}
                <div className="bg-[#1E1F22] rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-[#5865F2] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">J</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">Jonathan</h4>
                          <p className="text-sm text-gray-400">Sent you a message</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        "Hey! I saw your project and wanted to connect. Would love to chat about it!"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E1F22] rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">S</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">Sarah</h4>
                          <p className="text-sm text-gray-400">Sent you a message</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        "Hi! I'm interested in collaborating on your Discord clone project."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "friends" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-4">
                Friend Requests — 1
              </h3>
              
              <div className="space-y-3">
                {/* Sample Friend Request */}
                <div className="bg-[#1E1F22] rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">M</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">Mike</h4>
                          <p className="text-sm text-gray-400">Wants to be your friend</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <UserMinus className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        "Hey! I'm a fellow developer and would love to connect!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}; 