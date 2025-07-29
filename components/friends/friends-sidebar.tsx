"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  User, 
  MessageSquare, 
  Crown, 
  ShoppingCart,
  Plus,
  Search
} from "lucide-react";

export const FriendsSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-3 border-b border-[#1E1F22]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Find or start a conversation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Friends Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center">
                <User className="h-4 w-4 mr-2" />
                Friends
              </h3>
            </div>
            
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1E1F22]"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Requests
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1E1F22]"
              >
                <Crown className="h-4 w-4 mr-2" />
                Nitro Home
                <span className="ml-auto bg-[#5865F2] text-white text-xs px-2 py-1 rounded">
                  REWARD
                </span>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1E1F22]"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded">
                  NEW
                </span>
              </Button>
            </div>
          </div>

          <Separator className="bg-[#1E1F22]" />

          {/* Direct Messages Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Direct Messages</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {/* Sample Direct Messages */}
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">D</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">Davyon כוח</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">J</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">Jonathan</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">K</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">kaymingss</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">G</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">GodHatesChristmas</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/direct-messages">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1E1F22] cursor-pointer">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">D</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">Discord</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs bg-blue-500 text-white px-1 rounded">✓ OFFICIAL</span>
                      <span className="text-xs text-gray-400">Official Discord Message</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* User Status Bar */}
      <div className="p-3 border-t border-[#1E1F22] bg-[#1E1F22]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">א</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">אביר (Brian)</p>
            <p className="text-xs text-gray-400">Idle</p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">🔇</span>
            </div>
            <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">🔇</span>
            </div>
            <div className="w-4 h-4 bg-gray-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">⚙️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 