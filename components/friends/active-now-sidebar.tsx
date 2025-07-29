"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export const ActiveNowSidebar = () => {
  return (
    <div className="w-60 flex-shrink-0 bg-[#2B2D31] border-l border-[#1E1F22]">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-12 flex items-center px-4 border-b border-[#1E1F22]">
          <h2 className="text-white font-semibold">Active Now</h2>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-4">
          <div className="text-center">
            <div className="text-gray-400 text-sm">
              <p className="mb-2">It's quiet for now...</p>
              <p className="text-xs">
                When a friend starts an activity—like playing a game or hanging out on voice—we'll show it here!
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}; 