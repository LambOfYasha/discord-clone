"use client";

import { useState } from "react";
import { FriendsSidebar } from "@/components/friends/friends-sidebar";
import { DirectMessagesSidebar } from "@/components/friends/direct-messages-sidebar";
import { ActiveNowSidebar } from "@/components/friends/active-now-sidebar";
import { FriendsList } from "@/components/friends/friends-list";

interface FriendsPageClientProps {
  servers: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
  profile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
}

export default function FriendsPageClient({ servers, profile }: FriendsPageClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activityCollapsed, setActivityCollapsed] = useState(false);

  return (
    <div className="h-full flex">
      {/* Friends & Direct Messages Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-[#2B2D31] border-r border-[#1E1F22]`}>
        <div className="flex flex-col h-full">
          {/* Friends Section */}
          <FriendsSidebar servers={servers} profile={profile} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((c) => !c)} />
          
          {/* Direct Messages Section */}
          <DirectMessagesSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#313338]">
        <FriendsList />
      </div>

      {/* Active Now Sidebar */}
      <ActiveNowSidebar collapsed={activityCollapsed} onToggleCollapse={() => setActivityCollapsed((c) => !c)} />
    </div>
  );
}; 