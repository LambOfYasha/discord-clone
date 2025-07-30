"use client";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/hooks/use-navigation-store";
import { useUserProfile } from "@/hooks/use-user-profile";

interface UserProfileSectionProps {
  profile: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
}

export const UserProfileSection = ({ profile: initialProfile }: UserProfileSectionProps) => {
  const { signOut } = useUser();
  const router = useRouter();
  const { isCollapsed } = useNavigationStore();
  const { profile: dynamicProfile, loading } = useUserProfile();

  // Use dynamic profile if available, otherwise fall back to initial profile
  const profile = dynamicProfile || initialProfile;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Fallback values in case profile data is incomplete
  const displayName = profile?.name || "User";
  const displayEmail = profile?.email || "";
  const displayImage = profile?.imageUrl || "";

  if (loading) {
    return (
      <div className="mt-auto p-3">
        <div className={cn(
          "w-full flex items-center gap-x-2 p-2",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
          {!isCollapsed && (
            <div className="flex flex-col items-start min-w-0">
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-1" />
              <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-auto p-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-x-2 p-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <UserAvatar src={displayImage} className="h-8 w-8" />
            {!isCollapsed && (
              <div className="flex flex-col items-start min-w-0">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 truncate max-w-[120px]">
                  {displayName}
                </p>
                {displayEmail && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[120px]">
                    {displayEmail}
                  </p>
                )}
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" alignOffset={11} forceMount>
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            {displayEmail && (
              <p className="text-xs leading-none text-muted-foreground">
                {displayEmail}
              </p>
            )}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/profile")}
            className="cursor-pointer"
          >
            <User className="h-4 w-4 mr-2" />
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/settings")}
            className="cursor-pointer"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-rose-500 cursor-pointer"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}; 