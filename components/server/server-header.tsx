"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "../../prisma/generated/postgres";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Edit,
  LogOut,
  PlusCircle,
  Trash,
  UserPlus,
  Users,
  User,
  Hash,
  X,
  Folder,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  useEffect(() => {
    checkFollowStatus();
  }, [server.id]);

  const checkFollowStatus = async () => {
    try {
      const response = await fetch(`/api/server-follows?serverId=${server.id}`);
      if (response.ok) {
        const data = await response.json();
        setIsFollowing(data.isFollowing);
      }
    } catch (error) {
      console.error("Failed to check follow status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    if (followLoading) return;

    setFollowLoading(true);
    try {
      const response = await fetch("/api/server-follows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serverId: server.id }),
      });

      if (response.ok) {
        setIsFollowing(true);
        toast.success("Started following server");
      } else {
        const error = await response.text();
        toast.error(error || "Failed to follow server");
      }
    } catch (error) {
      console.error("Follow error:", error);
      toast.error("Failed to follow server");
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (followLoading) return;

    setFollowLoading(true);
    try {
      const response = await fetch(`/api/server-follows?serverId=${server.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsFollowing(false);
        toast.success("Unfollowed server");
      } else {
        const error = await response.text();
        toast.error(error || "Failed to unfollow server");
      }
    } catch (error) {
      console.error("Unfollow error:", error);
      toast.error("Failed to unfollow server");
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <div className="flex items-center border-neutral-200 dark:border-neutral-800 border-b-2 h-12">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="font-semibold flex items-center text-md px-3 h-12 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition flex-1">
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs text-black dark:text-neutral-400 space-y-[2px] font-medium">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("invite", { server })}
              className="dark:text-white text-black hover:!bg-indigo-600 hover:!text-white dark:hover:bg-indigo-500 text-sm cursor-pointer px-3 py-2"
            >
              Invite People
              <UserPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="text-sm cursor-pointer px-3 py-2"
              onClick={() => onOpen("editServer", { server })}
            >
              Edit Server
              <Edit className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="text-sm cursor-pointer px-3 py-2"
              onClick={() => onOpen("members", { server })}
            >
              Manage Members
              <Users className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="text-sm cursor-pointer px-3 py-2"
              onClick={() => onOpen("createChannel", { server })}
            >
              Create Channel
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="text-sm cursor-pointer px-3 py-2"
              onClick={() => onOpen("createCategory", { server })}
            >
              Create Category
              <Folder className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {!isLoading && (
            <DropdownMenuItem
              onClick={isFollowing ? handleUnfollow : handleFollow}
              disabled={followLoading}
              className="text-sm cursor-pointer px-3 py-2"
            >
              {followLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              ) : isFollowing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Unfollow Server
                </>
              ) : (
                <>
                  <Hash className="h-4 w-4 mr-2" />
                  Follow Server
                </>
              )}
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("deleteServer", { server })}
              className="text-rose-500 hover:!text-white hover:!bg-red-500 dark:hover:bg-red-700 text-sm cursor-pointer px-3 py-2"
            >
              Delete Server
              <Trash className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("leaveServer", { server })}
              className="text-rose-500 hover:!text-white hover:!bg-red-500 dark:hover:bg-red-700 text-sm cursor-pointer px-3 py-2"
            >
              Leave Server
              <LogOut className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Member List Button */}
      <button
        onClick={() => onOpen("userList", { server })}
        className="px-3 h-12 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition flex items-center"
        title="View Members"
      >
        <User className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      </button>
    </div>
  );
};
