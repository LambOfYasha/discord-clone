import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { ThreadsList } from "@/components/chat/threads-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ChannelType } from "@/prisma/generated/postgres";
import { redirect } from "next/navigation";

type Params = Promise<{ channelId: string; serverId: string }>;

interface ChannelIdPageProps {
  params: Params;
}
const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  // Await the params, since they are now a promise
  const resolvedParams = await params;
  const { channelId, serverId } = resolvedParams;
  
  // Check authentication first
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await currentProfile();
  if (!profile) {
    redirect("/setup");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!member || !channel || !server) {
    redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex h-full">
      <div className="flex-1 flex flex-col">
        <ChatHeader
          name={channel.name}
          serverId={channel.serverId}
          type="channel"
          currentMember={member}
          socketQuery={{
            channelId: channel.id,
            serverId: channel.serverId,
          }}
          server={server}
        />
        {channel.type === ChannelType.TEXT && (
          <>
            <ChatMessages
              member={member}
              name={channel.name}
              chatId={channel.id}
              type="channel"
              apiUrl="/api/messages"
              socketUrl="/api/socket/messages"
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
              paramKey="channelId"
              paramValue={channel.id}
            />
            <ChatInput
              apiUrl="/api/socket/messages"
              name={channel.name}
              type="channel"
              query={{ channelId: channel.id, serverId: channel.serverId }}
            />
          </>
        )}
        {channel.type === ChannelType.AUDIO && (
          <MediaRoom chatId={channel.id} video={true} audio={true} />
        )}
      </div>
      <ThreadsList 
        channelId={channel.id} 
        serverId={serverId} 
        currentMember={member}
      />
    </div>
  );
};
export default ChannelIdPage;
