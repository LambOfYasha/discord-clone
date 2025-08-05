import { Hash, User } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "@/components/chat-video-button";
import { PinnedMessages } from "./pinned-messages";
import { Member } from "@/prisma/generated/postgres";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  currentMember?: Member;
  socketQuery?: Record<string, string>;
  server?: ServerWithMembersWithProfiles;
  room?: {
    id: string;
    type: "dm" | "group";
    name: string;
    members: any[];
  };
}
const ChatHeader = ({ 
  serverId, 
  name, 
  type, 
  imageUrl, 
  currentMember, 
  socketQuery,
  server,
  room
}: ChatHeaderProps) => {
  const { onOpen } = useModal();

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="mr-2 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center gap-x-2">
        {type === "channel" && currentMember && socketQuery && (
          <div className="relative">
            <PinnedMessages
              channelId={socketQuery.channelId}
              currentMember={currentMember}
              socketQuery={socketQuery}
            />
          </div>
        )}
        {type === "conversation" && <ChatVideoButton />}
        {(server || room) && (
          <button
            onClick={() => onOpen("userList", { server, room })}
            className="p-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md"
            title="View Members"
          >
            <User className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          </button>
        )}
        <SocketIndicator />
      </div>
    </div>
  );
};
export default ChatHeader;
