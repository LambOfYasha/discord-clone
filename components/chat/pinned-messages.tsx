"use client";

import { useState, useEffect, useRef } from "react";
import { Member, Profile } from "@/prisma/generated/postgres";
import { Message } from "@/prisma/generated/mongo";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { format } from "date-fns";
import { Pin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import qs from "query-string";

interface PinnedMessagesProps {
  channelId: string;
  currentMember: Member;
  socketQuery: Record<string, string>;
}

type MessageWithMember = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const PinnedMessages = ({
  channelId,
  currentMember,
  socketQuery,
}: PinnedMessagesProps) => {
  const [pinnedMessages, setPinnedMessages] = useState<MessageWithMember[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchPinnedMessages = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: "/api/messages",
        query: {
          ...socketQuery,
          pinned: "true",
        },
      });
      const response = await axios.get(url);
      setPinnedMessages(response.data.items || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpin = async (messageId: string) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/socket/messages/${messageId}/pin`,
        query: socketQuery,
      });
      await axios.delete(url);
      setPinnedMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPinnedMessages();
    }
  }, [isOpen, channelId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
      >
        <Pin className="h-4 w-4 mr-2" />
        Pinned Messages
      </Button>
    );
  }

  return (
    <div ref={modalRef} className="absolute top-12 right-0 z-50 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 min-w-80 shadow-lg max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Pin className="h-4 w-4 mr-2" />
          Pinned Messages
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-sm text-zinc-500">Loading pinned messages...</p>
        </div>
      ) : pinnedMessages.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-zinc-500">No pinned messages</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {pinnedMessages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-x-2 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700"
            >
              <UserAvatar src={message.member.profile.imageUrl} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-x-2">
                  <p className="font-semibold text-sm">
                    {message.member.profile.name}
                  </p>
                  <span className="text-xs text-zinc-500">
                    {format(new Date(message.createdAt), "MMM d, yyyy 'at' HH:mm")}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2">
                  {message.content}
                </p>
              </div>
              {(currentMember.role === "ADMIN" || currentMember.role === "MODERATOR") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUnpin(message.id)}
                  className="h-6 w-6 p-0 text-zinc-500 hover:text-zinc-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 