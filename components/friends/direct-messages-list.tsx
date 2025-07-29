"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send,
  MoreVertical,
  Phone,
  Video,
  Info
} from "lucide-react";

export const DirectMessagesList = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("Davyon כוח");

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">D</span>
          </div>
          <div>
            <h1 className="text-white font-semibold">{selectedUser}</h1>
            <p className="text-xs text-gray-400">Online</p>
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
            <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">D</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium text-sm">{selectedUser}</span>
                <span className="text-xs text-gray-400">Today at 2:30 PM</span>
              </div>
              <p className="text-gray-300 text-sm">Hey! How are you doing?</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">א</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium text-sm">אביר (Brian)</span>
                <span className="text-xs text-gray-400">Today at 2:32 PM</span>
              </div>
              <p className="text-gray-300 text-sm">I'm doing great! Just working on this Discord clone project. How about you?</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">D</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium text-sm">{selectedUser}</span>
                <span className="text-xs text-gray-400">Today at 2:33 PM</span>
              </div>
              <p className="text-gray-300 text-sm">That sounds interesting! What technologies are you using?</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">א</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium text-sm">אביר (Brian)</span>
                <span className="text-xs text-gray-400">Today at 2:35 PM</span>
              </div>
              <p className="text-gray-300 text-sm">I'm using Next.js 15, TypeScript, Tailwind CSS, and Prisma for the database. It's been a great learning experience!</p>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-[#1E1F22] bg-[#2B2D31]">
        <div className="flex items-center space-x-2">
          <Input
            placeholder={`Message @${selectedUser}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && message.trim()) {
                // Handle send message
                setMessage("");
              }
            }}
          />
          <Button
            size="sm"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
            onClick={() => {
              if (message.trim()) {
                // Handle send message
                setMessage("");
              }
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 