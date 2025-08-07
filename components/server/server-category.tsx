"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Settings } from "lucide-react";
import { Channel, ChannelType, MemberRole } from "@/prisma/generated/postgres";
import { ServerChannel } from "./server-channel";
import { ServerSection } from "./server-section";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerCategoryProps {
  id: string;
  name: string;
  channels: Channel[];
  role?: MemberRole;
  server: any;
}

const iconMap = {
  [ChannelType.TEXT]: "text",
  [ChannelType.AUDIO]: "audio",
  [ChannelType.VIDEO]: "video",
};

export const ServerCategory = ({
  id,
  name,
  channels,
  role,
  server,
}: ServerCategoryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { onOpen } = useModal();

  const textChannels = channels.filter((channel) => channel.type === ChannelType.TEXT);
  const voiceChannels = channels.filter((channel) => channel.type === ChannelType.AUDIO);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full text-xs font-semibold text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
      >
        <ChevronDown
          className={`h-4 w-4 mr-1 transition-transform ${
            isExpanded ? "rotate-0" : "-rotate-90"
          }`}
        />
        {name}
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-[2px]">
          {textChannels.length > 0 && (
            <div className="mb-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Text Channels
                </span>
                {role !== MemberRole.GUEST && (
                  <ActionTooltip label="Create Channel" side="top">
                    <button
                      onClick={() => onOpen("createChannel", { 
                        channelType: ChannelType.TEXT,
                        categoryId: id 
                      })}
                      className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </ActionTooltip>
                )}
              </div>
              <div className="space-y-[2px]">
                {textChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    server={server}
                    role={role}
                  />
                ))}
              </div>
            </div>
          )}
          
          {voiceChannels.length > 0 && (
            <div className="mb-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Voice Channels
                </span>
                {role !== MemberRole.GUEST && (
                  <ActionTooltip label="Create Channel" side="top">
                    <button
                      onClick={() => onOpen("createChannel", { 
                        channelType: ChannelType.AUDIO,
                        categoryId: id 
                      })}
                      className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </ActionTooltip>
                )}
              </div>
              <div className="space-y-[2px]">
                {voiceChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    server={server}
                    role={role}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
