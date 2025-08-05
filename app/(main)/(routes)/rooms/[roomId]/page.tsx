import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Params = Promise<{
  roomId: string;
}>;

type SearchParams = Promise<{
  video?: boolean;
}>;

interface RoomPageProps {
  params: Params;
  searchParams: SearchParams;
}

const RoomPage = async ({ params, searchParams }: RoomPageProps) => {
  const { roomId } = await params;
  const { video } = await searchParams;
  const profile = await currentProfile();
  
  if (!profile) {
    const authInstance = await auth();
    return authInstance.redirectToSignIn();
  }

  // Get current user's member record
  const currentMember = await postgres.member.findFirst({
    where: {
      profileId: profile.id,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  // Try to find as DM conversation first
  let conversation = await postgres.conversation.findUnique({
    where: {
      id: roomId,
    },
    include: {
      memberOne: {
        include: {
          profile: true,
        },
      },
      memberTwo: {
        include: {
          profile: true,
        },
      },
    },
  });

  let room;
  if (conversation) {
    // Check if current user is part of this conversation
    if (conversation.memberOneId !== currentMember.id && conversation.memberTwoId !== currentMember.id) {
      return redirect("/");
    }

    const otherMember = conversation.memberOneId === currentMember.id 
      ? conversation.memberTwo 
      : conversation.memberOne;

    room = {
      id: conversation.id,
      type: "dm",
      name: otherMember.profile.name,
      imageUrl: otherMember.profile.imageUrl,
      otherMember: otherMember,
      currentMember: currentMember,
      members: [conversation.memberOne, conversation.memberTwo],
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  } else {
    // Try to find as group conversation
    const groupConversation = await postgres.groupConversation.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: {
          include: {
            member: {
              include: {
                profile: true,
              },
            },
            profile: true,
          },
        },
      },
    });

    if (groupConversation) {
      // Check if current user is part of this group
      const isMember = groupConversation.members.some(
        (member) => member.profileId === profile.id
      );

      if (!isMember) {
        return redirect("/");
      }

      room = {
        id: groupConversation.id,
        type: "group",
        name: groupConversation.name,
        imageUrl: groupConversation.imageUrl,
        currentMember: currentMember,
        members: groupConversation.members.map((member) => member.member),
        createdAt: groupConversation.createdAt,
        updatedAt: groupConversation.updatedAt,
      };
    } else {
      return redirect("/");
    }
  }

  // Determine room type and get appropriate data
  const isDM = room.type === 'dm';
  const roomName = isDM ? room.otherMember?.profile?.name : room.name;
  const roomImage = isDM ? room.otherMember?.profile?.imageUrl : room.imageUrl;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={roomImage}
        name={roomName}
        serverId={roomId}
        type="conversation"
        room={room}
      />
      {video && (
        <MediaRoom chatId={roomId} video={true} audio={true} />
      )}
      {!video && (
        <>
                     <ChatMessages
             member={room.currentMember}
             name={roomName}
             chatId={roomId}
             type="conversation"
             apiUrl={`/api/rooms/${roomId}/messages`}
             paramKey="roomId"
             paramValue={roomId}
             socketUrl="/api/socket/rooms"
             socketQuery={{
               roomId: roomId,
             }}
           />
                     <ChatInput
             name={roomName}
             type="conversation"
             apiUrl={`/api/rooms/${roomId}/messages`}
             query={{
               roomId: roomId,
             }}
           />
        </>
      )}
    </div>
  );
};

export default RoomPage; 