"use client";

import { Globe } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/hooks/use-navigation-store";

export const NavigationDiscovery = () => {
  const pathname = usePathname();
  const { isCollapsed } = useNavigationStore();
  const isActive = pathname === "/discovery";

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Discover Servers">
        <Link href="/discovery">
          <div className="group flex items-center">
            <div className={cn(
              "flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500",
              isActive && "rounded-[16px] bg-emerald-500"
            )}>
              <Globe
                className={cn(
                  "group-hover:text-white transition text-emerald-500",
                  isActive && "text-white"
                )}
                size={25}
              />
            </div>
          </div>
        </Link>
      </ActionTooltip>
    </div>
  );
}; 