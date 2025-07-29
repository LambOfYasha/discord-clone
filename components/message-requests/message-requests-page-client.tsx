"use client";

import { useState } from "react";
import { FriendsSidebar } from "@/components/friends/friends-sidebar";
import { DirectMessagesSidebar } from "@/components/friends/direct-messages-sidebar";
import { ActiveNowSidebar } from "@/components/friends/active-now-sidebar";
import { MessageRequestsList } from "@/components/friends/message-requests-list";

interface MessageRequestsPageClientProps {
  servers: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

export default function MessageRequestsPageClient({ servers }: MessageRequestsPageClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activityCollapsed, setActivityCollapsed] = useState(false);

  return (
    <div className="h-full flex">
      {/* Friends & Direct Messages Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-[#2B2D31] border-r border-[#1E1F22]`}>
        <div className="flex flex-col h-full">
          {/* Friends Section */}
          <FriendsSidebar servers={servers} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((c) => !c)} />
          
          {/* Direct Messages Section */}
          <DirectMessagesSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#313338]">
        <MessageRequestsList />
      </div>

      {/* Active Now Sidebar */}
      <ActiveNowSidebar collapsed={activityCollapsed} onToggleCollapse={() => setActivityCollapsed((c) => !c)} />
    </div>
  );
} 