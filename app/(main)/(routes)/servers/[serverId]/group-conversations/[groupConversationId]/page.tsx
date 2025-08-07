import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";

interface GroupConversationIdPageProps {
  params: {
    serverId: string;
    groupConversationId: string;
  };
  searchParams: {
    video?: string;
  };
}

const GroupConversationIdPage = async ({
  params,
  searchParams,
}: GroupConversationIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/setup");
  }

  const groupConversation = await postgres.groupConversation.findUnique({
    where: {
      id: params.groupConversationId,
    },
    include: {
      members: {
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  if (!groupConversation) {
    return redirect("/");
  }

  // Check if current user is a member of this group
  const currentMember = groupConversation.members.find(
    member => member.profileId === profile.id
  );

  if (!currentMember) {
    return redirect("/");
  }

  // Fetch server data with members
  const server = await postgres.server.findUnique({
    where: {
      id: params.serverId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const video = searchParams.video;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={groupConversation.name}
        serverId={params.serverId}
        type="group-conversation"
        server={server}
      />
      {video && (
        <MediaRoom chatId={groupConversation.id} video={true} audio={true} />
      )}
      {!video && (
        <>
          <ChatMessages
            member={currentMember.member}
            name={groupConversation.name}
            chatId={groupConversation.id}
            type="group-conversation"
            apiUrl="/api/group-messages"
            paramKey="groupConversationId"
            paramValue={groupConversation.id}
            socketUrl="/api/socket/group-messages"
            socketQuery={{
              groupConversationId: groupConversation.id,
            }}
          />
          <ChatInput
            name={groupConversation.name}
            type="group-conversation"
            apiUrl="/api/socket/group-messages"
            query={{
              groupConversationId: groupConversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export default GroupConversationIdPage; 