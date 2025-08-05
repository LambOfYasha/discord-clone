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
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

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
        {isModerator && <DropdownMenuSeparator />}
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
