"use client";

import { useNavigationStore } from "@/hooks/use-navigation-store";
import { cn } from "@/lib/utils";

interface MainLayoutClientProps {
  children: React.ReactNode;
  navigationSidebar: React.ReactNode;
}

export const MainLayoutClient = ({ children, navigationSidebar }: MainLayoutClientProps) => {
  const { isCollapsed } = useNavigationStore();

  return (
    <>
      <div className={cn(
        "h-full flex z-30 flex-col fixed inset-y-0 transition-all duration-300",
        isCollapsed ? "w-0" : "w-[72px]"
      )}>
        {navigationSidebar}
      </div>
      <main className={cn(
        "h-full w-full transition-all duration-300",
        isCollapsed ? "pl-0" : "pl-[72px]"
      )}>
        {children}
      </main>
    </>
  );
}; 