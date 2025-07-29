"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ActiveNowSidebarProps {
  initialCollapsed?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ActiveNowSidebar = ({ initialCollapsed = false, collapsed, onToggleCollapse }: ActiveNowSidebarProps) => {
  // If controlled, use prop; otherwise, fallback to uncontrolled (for backward compatibility)
  const [internalCollapsed, setInternalCollapsed] = useState(initialCollapsed);
  const isCollapsed = typeof collapsed === 'boolean' ? collapsed : internalCollapsed;
  const handleToggle = () => {
    if (onToggleCollapse) onToggleCollapse();
    else setInternalCollapsed((c) => !c);
  };

  return (
    <div className={`flex-shrink-0 bg-[#2B2D31] border-l border-[#1E1F22] transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-12 flex items-center px-4 border-b border-[#1E1F22] justify-between">
          {!isCollapsed && <h2 className="text-white font-semibold">Active Now</h2>}
          <button
            className="ml-auto text-gray-400 hover:text-white p-1"
            onClick={handleToggle}
            aria-label={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Content */}
        {!isCollapsed && (
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
        )}
      </div>
    </div>
  );
}; 