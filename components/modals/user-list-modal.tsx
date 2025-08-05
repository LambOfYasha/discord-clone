"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import { ShieldCheck, Shield } from "lucide-react";
import { MemberRole } from "../../prisma/generated/postgres";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 text-black-500 ml-2" />,
  ADMIN: <ShieldCheck className="h-4 w-4 text-green-500 ml-2" />,
};

export const UserListModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "userList";
  const { server, room } = data as { 
    server?: ServerWithMembersWithProfiles;
    room?: {
      id: string;
      type: "dm" | "group";
      name: string;
      members: any[];
    };
  };

  // Determine if we're showing server members or room members
  const isServerView = !!server;
  const members = isServerView ? server?.members : room?.members || [];
  const title = isServerView ? "Members" : (room?.type === "dm" ? "Direct Message" : "Group Members");

  // For now, we'll simulate online status
  // In a real implementation, this would be tracked via WebSocket or database
  const getOnlineStatus = (memberId: string) => {
    // Simulate online status - in real app, this would come from WebSocket or database
    const onlineMembers = members?.slice(0, Math.ceil(members.length / 2)) || [];
    return onlineMembers.some(member => member.id === memberId);
  };

  const onlineMembers = members?.filter(member => getOnlineStatus(member.id)) || [];
  const offlineMembers = members?.filter(member => !getOnlineStatus(member.id)) || [];

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-4xl text-center font-bold mb-3">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {members?.length} Members
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-8 max-h-[420px] pr-6">
            {/* Online Members */}
            {onlineMembers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zinc-500 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online — {onlineMembers.length}
                </h3>
                {onlineMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-x-2 mb-3">
                    <div className="relative">
                      <UserAvatar src={isServerView ? member.profile.imageUrl : member.profile?.imageUrl || member.imageUrl} />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex gap-y-1 flex-col">
                      <div className="text-xs font-semibold flex items-center">
                        {isServerView ? member.profile.name : member.profile?.name || member.name}
                        {isServerView && roleIconMap[member.role]}
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">
                          {isServerView ? member.profile.email : member.profile?.email || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Offline Members */}
            {offlineMembers.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-500 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mr-2"></div>
                  Offline — {offlineMembers.length}
                </h3>
                {offlineMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-x-2 mb-3">
                    <div className="relative">
                      <UserAvatar src={isServerView ? member.profile.imageUrl : member.profile?.imageUrl || member.imageUrl} />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-zinc-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex gap-y-1 flex-col">
                      <div className="text-xs font-semibold flex items-center">
                        {isServerView ? member.profile.name : member.profile?.name || member.name}
                        {isServerView && roleIconMap[member.role]}
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">
                          {isServerView ? member.profile.email : member.profile?.email || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}; 