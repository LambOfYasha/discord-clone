"use client";

import { UserProfile } from "@/components/user/user-profile";

interface DmRoomSidebarProps {
  profile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
}

export const DmRoomSidebar = ({ profile }: DmRoomSidebarProps) => {
  return (
    <div className="flex flex-col h-full w-60 bg-[#2B2D31]">
      {/* Placeholder for future DM room sidebar content */}
      <div className="flex-1 p-4">
        <div className="text-white text-sm font-semibold mb-4">
          Direct Messages
        </div>
        {/* Future: Add DM room specific content here */}
      </div>
      
      {/* User Profile */}
      <UserProfile variant="friends" profile={profile} />
    </div>
  );
}; 