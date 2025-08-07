"use client";

import { Member, MemberRole, Profile } from "../../prisma/generated/postgres";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { Edit, FileIcon, ShieldCheck, Trash, Smile, Reply, Pin, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter, useParams } from "next/navigation";
import { MessageReactions } from "./message-reactions";
import { Reaction } from "@/prisma/generated/mongo";
import { EmojiPicker } from "@/components/emoji-picker";
import { MessageThread } from "./message-thread";
import { InviteMessageCard } from "./invite-message-card";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string;
  deleted: boolean;
  pinned: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  reactions?: (Reaction & {
    member: Member & {
      profile: Profile;
    };
  })[];
  replyTo?: string;
}
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="text-black h-4 w-4 ml-2" />,
  ADMIN: <ShieldCheck className="text-green-500 h-4 w-4 ml-2" />,
};
const formSchema = z.object({
  content: z.string().min(1),
});
export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  pinned,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
  reactions = [],
  replyTo,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: content },
  });
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keyDown", handleKeyDown);
  }, []);
  const onMemberClick = async () => {
    if (member.id === currentMember.id) {
      return;
    }
    try {
      // First, try to get existing DM room
      const existingRoomsResponse = await fetch('/api/rooms');
      let room = null;
      
      if (existingRoomsResponse.ok) {
        const existingRooms = await existingRoomsResponse.json();
        // Find existing DM with this member
        room = existingRooms.find((r: any) => 
          r.type === "dm" && 
          r.members.some((m: any) => m.id === member.id)
        );
      }
      
      // If no existing DM, create a new one
      if (!room) {
        const response = await fetch('/api/rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            type: 'dm',
            targetMemberId: member.id,
          }),
        });
        
        if (response.ok) {
          room = await response.json();
        } else {
          console.error('Failed to create DM room');
          return;
        }
      }
      
      if (room) {
        router.push(`/rooms/${room.id}`);
      }
    } catch (error) {
      console.error('Error creating DM room:', error);
    }
  };
  useEffect(() => {
    form.reset({ content: content });
  }, [content, form]);
  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isOwner || isModerator);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const canPinMessage = !deleted && (isAdmin || isModerator);
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;
  const isLoading = form.formState.isSubmitting;

  // Check if this is an invite message
  const isInviteMessage = content.includes("🎉 **Server Invitation**") && content.includes("**Invite Link:**");
  
  // Extract server info from invite message
  const getInviteInfo = () => {
    if (!isInviteMessage) return null;
    
    const serverNameMatch = content.match(/\*\*(.*?)\*\*/);
    const inviteLinkMatch = content.match(/\*\*Invite Link:\*\* (.*?)(?:\n|$)/);
    
    if (serverNameMatch && inviteLinkMatch) {
      return {
        serverName: serverNameMatch[1],
        inviteUrl: inviteLinkMatch[1].trim(),
      };
    }
    
    return null;
  };

  const inviteInfo = getInviteInfo();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });
      await axios.patch(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReaction = async (emoji: string) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/socket/messages/${id}/reactions`,
        query: socketQuery,
      });
      await axios.post(url, { emoji });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePinMessage = async () => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/socket/messages/${id}/pin`,
        query: socketQuery,
      });
      if (pinned) {
        await axios.delete(url);
      } else {
        await axios.post(url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          className="cursor-pointer hover:drop-shadow-md transition"
          onClick={(e) => {
            e.stopPropagation();
            onOpen("userProfile", { profile: member.profile });
          }}
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p
                className="font-semibold md:text-sm mssg hover:underline cursor-pointer"
                onClick={onMemberClick}
              >
                {member.profile.name}
              </p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 text-end">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt="content"
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm ml-2 text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF file
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <div>
              {replyTo && (
                <div className="flex items-center gap-x-2 mb-2 text-xs text-zinc-500">
                  <Reply className="h-3 w-3" />
                  <span>Replying to a message</span>
                </div>
              )}
              
              {isInviteMessage && inviteInfo ? (
                <div className="mt-2">
                  <InviteMessageCard
                    serverName={inviteInfo.serverName}
                    inviteUrl={inviteInfo.inviteUrl}
                    messageId={id}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "text-sm text-zinc-600 dark:text-zinc-300",
                    deleted &&
                      "italic text-zinc-500 text-xs mt-1 dark:text-zinc-400"
                  )}
                >
                  {content.split('\n').map((line, index) => {
                    if (line.startsWith('> ')) {
                      return (
                        <div key={index} className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-3 my-2 italic text-zinc-500 dark:text-zinc-400">
                          {line.substring(2)}
                        </div>
                      );
                    }
                    return <div key={index}>{line}</div>;
                  })}
                  {isUpdated && !deleted && (
                    <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                      (edited)
                    </span>
                  )}
                </div>
              )}
              
              {!deleted && reactions.length > 0 && (
                <MessageReactions
                  messageId={id}
                  reactions={reactions}
                  currentMember={currentMember}
                  socketQuery={socketQuery}
                />
              )}
            </div>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center pt-2 gap-x-2 w-full"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/25 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button size="sm" variant="primary" disabled={isLoading}>
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
          {!deleted && (
            <>
              <ActionTooltip label="Reply">
                <Reply
                  onClick={() => setShowThread(true)}
                  className="cursor-pointer w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
              </ActionTooltip>
              <ActionTooltip label="Create Thread">
                <MessageSquare
                  onClick={() => onOpen("createThread", { 
                    apiUrl: "/api/threads",
                    query: socketQuery,
                    parentMessage: {
                      id,
                      content,
                      member: {
                        profile: member.profile
                      }
                    }
                  })}
                  className="cursor-pointer w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
              </ActionTooltip>
              <ActionTooltip label="Add reaction">
                <EmojiPicker onChange={(emoji) => handleReaction(emoji)}>
                  <Smile className="cursor-pointer w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
                </EmojiPicker>
              </ActionTooltip>
              {canPinMessage && (
                <ActionTooltip label={pinned ? "Unpin message" : "Pin message"}>
                  <Pin
                    onClick={handlePinMessage}
                    className={cn(
                      "cursor-pointer w-4 h-4 transition",
                      pinned
                        ? "text-yellow-500 hover:text-yellow-600"
                        : "text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                    )}
                  />
                </ActionTooltip>
              )}
            </>
          )}
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      {showThread && (
        <MessageThread
          message={{
            id,
            content,
            member,
            timestamp,
            fileUrl,
            deleted,
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
          currentMember={currentMember}
          socketQuery={socketQuery}
          onClose={() => setShowThread(false)}
        />
      )}
    </div>
  );
};
