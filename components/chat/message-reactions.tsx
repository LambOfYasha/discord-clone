"use client";

import { useState } from "react";
import { Member, Profile } from "@/prisma/generated/postgres";
import { Reaction } from "@/prisma/generated/mongo";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { Smile } from "lucide-react";
import { EmojiPicker } from "@/components/emoji-picker";
import axios from "axios";
import qs from "query-string";

interface MessageReactionsProps {
  messageId: string;
  reactions: (Reaction & {
    member: Member & {
      profile: Profile;
    };
  })[];
  currentMember: Member;
  socketQuery: Record<string, string>;
}

export const MessageReactions = ({
  messageId,
  reactions,
  currentMember,
  socketQuery,
}: MessageReactionsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Group reactions by emoji
  const reactionGroups = reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {} as Record<string, typeof reactions>);

  const handleReaction = async (emoji: string) => {
    try {
      setIsLoading(true);
      const existingReaction = reactions.find(
        (r) => r.emoji === emoji && r.memberId === currentMember.id
      );

      const url = qs.stringifyUrl({
        url: `/api/socket/messages/${messageId}/reactions`,
        query: socketQuery,
      });

      if (existingReaction) {
        // Remove reaction
        await axios.delete(url, { data: { emoji } });
      } else {
        // Add reaction
        await axios.post(url, { emoji });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    handleReaction(emoji);
  };

  return (
    <div className="flex items-center gap-x-1 mt-2">
      {Object.entries(reactionGroups).map(([emoji, reactionList]) => {
        const hasReacted = reactionList.some(
          (r) => r.memberId === currentMember.id
        );
        return (
          <Button
            key={emoji}
            variant="ghost"
            size="sm"
            disabled={isLoading}
            onClick={() => handleReaction(emoji)}
            className={cn(
              "h-6 px-2 text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition",
              hasReacted && "bg-blue-100 dark:bg-blue-900"
            )}
          >
            <span className="mr-1">{emoji}</span>
            <span className="text-xs">{reactionList.length}</span>
          </Button>
        );
      })}
      <ActionTooltip label="Add reaction">
        <EmojiPicker onChange={handleEmojiSelect}>
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoading}
            className="h-6 w-6 p-0 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <Smile className="h-3 w-3" />
          </Button>
        </EmojiPicker>
      </ActionTooltip>
    </div>
  );
};

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
} 