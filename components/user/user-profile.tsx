"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  Headphones, 
  HeadphonesIcon, 
  Settings, 
  User,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Shield,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  collapsed?: boolean;
  variant?: "navigation" | "friends";
  profile?: {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
    status?: string;
    userId?: string;
    nickname?: string;
    bio?: string;
    website?: string;
    socialMedia?: any;
  };
  user?: {
    name: string;
    email: string;
    imageUrl?: string;
    status?: "ONLINE" | "IDLE" | "DO_NOT_DISTURB" | "INVISIBLE";
  };
}

const StatusIndicator = ({ status }: { status?: string }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ONLINE":
        return "bg-green-500";
      case "IDLE":
        return "bg-yellow-500";
      case "DO_NOT_DISTURB":
        return "bg-red-500";
      case "INVISIBLE":
        return "bg-gray-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "ONLINE":
        return "Online";
      case "IDLE":
        return "Idle";
      case "DO_NOT_DISTURB":
        return "Do Not Disturb";
      case "INVISIBLE":
        return "Invisible";
      default:
        return "Online";
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className={cn("w-2 h-2 rounded-full", getStatusColor(status))} />
      <span className="text-xs text-muted-foreground">{getStatusText(status)}</span>
    </div>
  );
};

export const UserProfile = ({ 
  collapsed = false, 
  variant = "friends",
  profile: initialProfile,
  user = {
    name: "אביר (Brian)",
    email: "brian@example.com",
    status: "IDLE"
  }
}: UserProfileProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { theme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const router = useRouter();
  const { profile: dynamicProfile, loading } = useUserProfile();
  const { onOpen } = useModal();

  // Ensure hydration safety
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use dynamic profile if available and client-side, otherwise fall back to initial profile or default user
  const profile = isClient && dynamicProfile ? dynamicProfile : initialProfile;
  const displayName = profile?.name || user.name;
  const displayEmail = profile?.email || user.email;
  const displayImage = profile?.imageUrl || user.imageUrl || "";
  const displayStatus = profile?.status || user.status || "ONLINE";

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const handleSignOut = () => {
    signOut(() => router.push("/"));
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex flex-col items-center gap-y-4 pb-3 mt-auto">
        <div className="flex items-center gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400"
            disabled
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400"
            disabled
          >
            <Headphones className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" className="h-[45px] w-[45px] p-0 rounded-full">
          <UserAvatar src={displayImage} name={displayName} className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  if (variant === "navigation") {
    return (
      <div className="flex flex-col items-center gap-y-4 pb-3 mt-auto">
        {/* Audio Controls */}
        <div className="flex items-center gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${isMuted ? 'text-red-500' : 'text-gray-400'} hover:text-white`}
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${isDeafened ? 'text-red-500' : 'text-gray-400'} hover:text-white`}
            onClick={() => setIsDeafened(!isDeafened)}
            title={isDeafened ? "Undeafen" : "Deafen"}
          >
            {isDeafened ? <HeadphonesIcon className="h-4 w-4" /> : <Headphones className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (profile) {
                    onOpen("userProfile", { 
                      profile: {
                        id: profile.id,
                        name: profile.name,
                        imageUrl: profile.imageUrl,
                        email: profile.email,
                        status: profile.status,
                        userId: profile.id, // Use id as userId since that's what we have
                        nickname: undefined,
                        bio: undefined,
                        website: undefined,
                        socialMedia: undefined
                      }
                    });
                  }
                }}
                className="cursor-pointer"
              >
                <Button variant="ghost" className="h-[45px] w-[45px] p-0 rounded-full">
                  <UserAvatar src={displayImage} name={displayName} className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="flex items-center gap-x-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (profile) {
                    onOpen("userProfile", { 
                      profile: {
                        id: profile.id,
                        name: profile.name,
                        imageUrl: profile.imageUrl,
                        email: profile.email,
                        status: profile.status,
                        userId: profile.id, // Use id as userId since that's what we have
                        nickname: undefined,
                        bio: undefined,
                        website: undefined,
                        socialMedia: undefined
                      }
                    });
                  }
                }}
                className="cursor-pointer"
              >
                <UserAvatar src={displayImage} name={displayName} className="h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{displayName}</p>
                <StatusIndicator status={displayStatus} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              <UserIcon className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy & Safety</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={() => router.push("/settings")}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-x-2 text-red-600 focus:text-red-600 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Friends sidebar variant
  return (
    <div className="p-3 border-t border-[#1E1F22] bg-[#1E1F22]">
      <div className="flex items-center space-x-2">
        <div
          onClick={() => {
            if (profile) {
              onOpen("userProfile", { 
                profile: {
                  id: profile.id,
                  name: profile.name,
                  imageUrl: profile.imageUrl,
                  email: profile.email,
                  status: profile.status,
                  userId: profile.id, // Use id as userId since that's what we have
                  nickname: undefined,
                  bio: undefined,
                  website: undefined,
                  socialMedia: undefined
                }
              });
            }
          }}
          className="cursor-pointer"
        >
          <UserAvatar src={displayImage} name={displayName} className="h-8 w-8" />
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{displayName}</p>
              <StatusIndicator status={displayStatus} />
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 w-6 p-0 ${isMuted ? 'text-red-500' : 'text-gray-400'} hover:text-white`}
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 w-6 p-0 ${isDeafened ? 'text-red-500' : 'text-gray-400'} hover:text-white`}
                onClick={() => setIsDeafened(!isDeafened)}
                title={isDeafened ? "Undeafen" : "Deafen"}
              >
                {isDeafened ? <HeadphonesIcon className="h-3 w-3" /> : <Headphones className="h-3 w-3" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex items-center gap-x-2">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (profile) {
                          onOpen("userProfile", { 
                            profile: {
                              id: profile.id,
                              name: profile.name,
                              imageUrl: profile.imageUrl,
                              email: profile.email,
                              status: profile.status,
                              userId: profile.id, // Use id as userId since that's what we have
                              nickname: undefined,
                              bio: undefined,
                              website: undefined,
                              socialMedia: undefined
                            }
                          });
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <UserAvatar src={displayImage} name={displayName} className="h-8 w-8" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{displayName}</p>
                      <StatusIndicator status={displayStatus} />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center gap-x-2 cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Privacy & Safety</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center gap-x-2 cursor-pointer"
                    onClick={() => router.push("/settings")}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center gap-x-2 text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 