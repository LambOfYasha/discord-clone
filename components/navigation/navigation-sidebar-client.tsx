"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { NavigationHome } from "@/components/navigation/navigation-home";
import { NavigationDiscovery } from "@/components/navigation/navigation-discovery";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { useNavigationStore } from "@/hooks/use-navigation-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface NavigationSidebarClientProps {
  servers: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

export const NavigationSidebarClient = ({ servers }: NavigationSidebarClientProps) => {
  const { isCollapsed, toggleCollapse } = useNavigationStore();
  const [mounted, setMounted] = useState(false);

  // Delay rendering auth-dependent UI until after mount to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a stable shell that matches on server and first client render
  if (!mounted) {
    return (
      <div className={cn(
        "space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3 transition-all duration-300",
        isCollapsed ? "w-0 overflow-hidden" : "w-[72px]"
      )}>
        {/* keep layout height without dynamic content */}
      </div>
    );
  }

  return (
    <>
      {/* Toggle Button - Always visible */}
      <Button
        onClick={toggleCollapse}
        variant="ghost"
        size="sm"
        className={cn(
          "absolute h-6 w-6 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 z-50 transition-all duration-300",
          isCollapsed ? "left-3 top-6" : "left-[69px] top-6"
        )}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation Sidebar Content */}
      <div className={cn(
        "space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3 transition-all duration-300",
        isCollapsed ? "w-0 overflow-hidden" : "w-[72px]"
      )}>
        <NavigationHome />
        <NavigationAction />
        <NavigationDiscovery />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <ScrollArea className="flex-1 w-full">
          {servers.map((server) => (
            <div key={server.id} className="mb-4">
              <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))}
        </ScrollArea>
        <SignedOut>
          <div className="flex pb-3 mt-auto items-center flex-col gap-y-4">
            <ModeToggle />
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex pb-3 mt-auto items-center flex-col gap-y-4">
            <ModeToggle />
          </div>
        </SignedIn>
      </div>
    </>
  );
};