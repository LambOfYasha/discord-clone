"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Search, 
  Globe, 
  Users, 
  Crown,
  Hash,
  Shield
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

export const ServerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { onOpen } = useModal();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-white" />
          <h1 className="text-white font-semibold">Server Discovery</h1>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search servers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
          />
        </div>
      </div>



      {/* Join Server Section */}
      <div className="p-4 border-b border-[#1E1F22] bg-[#2B2D31]">
        <div className="bg-[#1E1F22] rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Join a Server</h3>
              <p className="text-sm text-gray-400">Enter an invite link</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter invite link..."
              className="flex-1 bg-[#2B2D31] border-[#1E1F22] text-white placeholder:text-gray-400"
            />
            <Button
              onClick={() => onOpen("invite")}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
            >
              Join
            </Button>
          </div>
        </div>
      </div>

      {/* Popular Servers */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">
            Popular Servers
          </h3>
          
          <div className="space-y-3">
            {/* Sample Popular Servers */}
            <div className="bg-[#1E1F22] rounded-lg p-4 hover:bg-[#2B2D31] cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#5865F2] rounded-full flex items-center justify-center">
                  <Hash className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">Developer Community</h4>
                  <p className="text-sm text-gray-400">1,234 members</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Active</span>
                    <span className="text-xs text-gray-400">Programming • Tech</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                >
                  Join
                </Button>
              </div>
            </div>

            <div className="bg-[#1E1F22] rounded-lg p-4 hover:bg-[#2B2D31] cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">Gaming Hub</h4>
                  <p className="text-sm text-gray-400">5,678 members</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Active</span>
                    <span className="text-xs text-gray-400">Gaming • Entertainment</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                >
                  Join
                </Button>
              </div>
            </div>

            <div className="bg-[#1E1F22] rounded-lg p-4 hover:bg-[#2B2D31] cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">Study Group</h4>
                  <p className="text-sm text-gray-400">890 members</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Moderate</span>
                    <span className="text-xs text-gray-400">Education • Learning</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                >
                  Join
                </Button>
              </div>
            </div>

            <div className="bg-[#1E1F22] rounded-lg p-4 hover:bg-[#2B2D31] cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">Art & Design</h4>
                  <p className="text-sm text-gray-400">2,345 members</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Active</span>
                    <span className="text-xs text-gray-400">Creative • Design</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}; 