"use client";

import { useState, useEffect } from "react";
import { FriendsSidebar } from "@/components/friends/friends-sidebar";
import { DirectMessagesSidebar } from "@/components/friends/direct-messages-sidebar";
import { ActiveNowSidebar } from "@/components/friends/active-now-sidebar";
import { DirectMessagesList } from "@/components/friends/direct-messages-list";

// Add room types for better type safety
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

interface DirectMessagesPageClientProps {
  servers: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

export default function DirectMessagesPageClient({ servers }: DirectMessagesPageClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activityCollapsed, setActivityCollapsed] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (response.ok) {
          const roomsData = await response.json();
          setRooms(roomsData);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="h-full flex">
      {/* Friends & Direct Messages Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-[#2B2D31] border-r border-[#1E1F22]`}>
        <div className="flex flex-col h-full">
          {/* Friends Section */}
          <FriendsSidebar servers={servers} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((c) => !c)} />
          
          {/* Direct Messages Section */}
          <DirectMessagesSidebar rooms={rooms} loading={loading} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#313338]">
        <DirectMessagesList rooms={rooms} loading={loading} />
      </div>

      {/* Active Now Sidebar */}
      <ActiveNowSidebar collapsed={activityCollapsed} onToggleCollapse={() => setActivityCollapsed((c) => !c)} />
    </div>
  );
} 