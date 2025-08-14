"use client";

import React, { memo, useMemo, useCallback, useState, useEffect } from "react";
import { Member, MemberRole, Profile } from "../../prisma/generated/postgres";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { Edit, FileIcon, ShieldCheck, Trash, Smile, Reply, Pin, MessageSquare, Forward } from "lucide-react";
import Image from "next/image";
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
import { MessageReactions } from "../chat/message-reactions";
import { Reaction } from "@/prisma/generated/mongo";
import { EmojiPicker } from "@/components/emoji-picker";
import { MessageThread } from "../chat/message-thread";
import { InviteMessageCard } from "../chat/invite-message-card";
import { Markdown } from "@/components/markdown";
import { EmbedMessage } from "../chat/embed-message";
import { PollDisplay } from "@/components/poll/poll-display";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl?: string | null;
  deleted?: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  reactions?: (Reaction & {
    member: Member & {
      profile: Profile;
    }
  })[];
  poll?: any;
  embed?: any;
  invite?: any;
  threadId?: string;
  replyTo?: string;
  replyToMessage?: any;
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatItemOptimized = memo<ChatItemProps>(({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
  reactions = [],
  poll,
  embed,
  invite,
  threadId,
  replyTo,
  replyToMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: content },
  });

  // Memoized values
  const isOwner = useMemo(() => currentMember.id === member.id, [currentMember.id, member.id]);
  const canDeleteMessage = useMemo(() => 
    isOwner || currentMember.role === MemberRole.ADMIN || currentMember.role === MemberRole.MODERATOR,
    [isOwner, currentMember.role]
  );
  const canEditMessage = useMemo(() => isOwner && !deleted, [isOwner, deleted]);
  const isAdmin = useMemo(() => currentMember.role === MemberRole.ADMIN, [currentMember.role]);
  const isModerator = useMemo(() => currentMember.role === MemberRole.MODERATOR, [currentMember.role]);
  const isGuest = useMemo(() => currentMember.role === MemberRole.GUEST, [currentMember.role]);

  // Memoized file type
  const fileType = useMemo(() => fileUrl?.split(".").pop(), [fileUrl]);
  const isPdf = useMemo(() => fileType === "pdf", [fileType]);
  const isImage = useMemo(() => 
    fileType === "png" || fileType === "jpg" || fileType === "jpeg" || fileType === "gif" || fileType === "webp",
    [fileType]
  );

  // Memoized handlers
  const onMemberClick = useCallback(async () => {
    if (member.id === currentMember.id) {
      return;
    }
    try {
      const existingRoomsResponse = await fetch('/api/rooms');
      let room = null;
      
      if (existingRoomsResponse.ok) {
        const existingRooms = await existingRoomsResponse.json();
        room = existingRooms.find((r: any) => 
          r.type === "dm" && 
          r.members.some((m: any) => m.id === member.id)
        );
      }
      
      if (!room) {
        const response = await fetch('/api/rooms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
      
      router.push(`/direct-messages?roomId=${room.id}`);
    } catch (error) {
      console.error('Error creating DM:', error);
    }
  }, [member.id, currentMember.id, router]);

  const onDelete = useCallback(async () => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/messages/${id}`,
        query: socketQuery,
      });

      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
  }, [id, socketQuery]);

  const onPin = useCallback(async () => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/messages/${id}/pin`,
        query: socketQuery,
      });

      await axios.patch(url);
    } catch (error) {
      console.log(error);
    }
  }, [id, socketQuery]);

  const onForward = useCallback(() => {
    onOpen("forwardMessage", { message: { id, content, fileUrl, member } });
  }, [onOpen, id, content, fileUrl, member]);

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/messages/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }, [id, socketQuery, form]);

  const onCancel = useCallback(() => {
    form.reset();
    setIsEditing(false);
  }, [form]);

  const onReply = useCallback(() => {
    onOpen("replyMessage", { message: { id, content, fileUrl, member } });
  }, [onOpen, id, content, fileUrl, member]);

  const onThread = useCallback(() => {
    setShowThread(!showThread);
  }, [showThread]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Memoized JSX elements
  const memberRoleIcon = useMemo(() => {
    if (member.role === MemberRole.ADMIN) {
      return <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />;
    }
    if (member.role === MemberRole.MODERATOR) {
      return <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />;
    }
    return null;
  }, [member.role]);

  const fileContent = useMemo(() => {
    if (!fileUrl) return null;

    if (isPdf) {
      return (
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
          <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            PDF File
          </a>
        </div>
      );
    }

    if (isImage) {
      return (
        <div className="relative w-80 h-80 mt-2">
          <Image
            src={fileUrl}
            alt={content}
            fill
            className="object-cover rounded-md"
          />
        </div>
      );
    }

    return null;
  }, [fileUrl, isPdf, isImage, content]);

  const actionButtons = useMemo(() => (
    <div className="hidden group-hover:flex items-center gap-x-2 absolute -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm p-1">
      {canEditMessage && (
        <ActionTooltip label="Edit">
          <Edit
            onClick={() => setIsEditing(true)}
            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
          />
        </ActionTooltip>
      )}
      {canDeleteMessage && (
        <ActionTooltip label="Delete">
          <Trash
            onClick={onDelete}
            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
          />
        </ActionTooltip>
      )}
      {!isGuest && (
        <>
          <ActionTooltip label="Reply">
            <Reply
              onClick={onReply}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Forward">
            <Forward
              onClick={onForward}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          {(isAdmin || isModerator) && (
            <ActionTooltip label="Pin">
              <Pin
                onClick={onPin}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Thread">
            <MessageSquare
              onClick={onThread}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </>
      )}
    </div>
  ), [canEditMessage, canDeleteMessage, isGuest, isAdmin, isModerator, onDelete, onReply, onForward, onPin, onThread]);

  if (deleted) {
    return (
      <div className="group flex items-start gap-x-2 w-full">
        <UserAvatar src={member.profile.imageUrl} />
        <div className="flex flex-col w-full max-w-[320px]">
          <div className="flex items-center gap-x-2">
            <p className="text-sm font-semibold flex items-center">
              {member.profile.name}
              {memberRoleIcon}
            </p>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
            This message was deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative p-4 hover:bg-black/5 dark:hover:bg-white/5 transition w-full">
      {actionButtons}
      <div className="flex items-start gap-x-2 w-full">
        <UserAvatar src={member.profile.imageUrl} />
        <div className="flex flex-col w-full max-w-[320px]">
          <div className="flex items-center gap-x-2">
            <p 
              onClick={onMemberClick}
              className="text-sm font-semibold flex items-center hover:underline cursor-pointer"
            >
              {member.profile.name}
              {memberRoleIcon}
            </p>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
            {isUpdated && (
              <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                (edited)
              </span>
            )}
          </div>
          {replyToMessage && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Replying to <span className="font-medium">{replyToMessage.member.profile.name}</span>
            </div>
          )}
          {!isEditing && (
            <>
              {invite && <InviteMessageCard invite={invite} />}
              {embed && <EmbedMessage embed={embed} />}
              {poll && <PollDisplay poll={poll} />}
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                <Markdown content={content} />
              </div>
              {fileContent}
              {reactions.length > 0 && (
                <MessageReactions reactions={reactions} messageId={id} />
              )}
            </>
          )}
          {isEditing && (
            <Form {...form}>
              <form
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={form.formState.isSubmitting}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={form.formState.isSubmitting} size="sm" type="submit">
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
      {showThread && (
        <MessageThread
          messageId={id}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
        />
      )}
    </div>
  );
});

ChatItemOptimized.displayName = "ChatItemOptimized";

export default ChatItemOptimized;
