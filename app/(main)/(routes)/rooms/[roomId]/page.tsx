import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
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

  // Fetch room details using the new room API
  const roomResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/rooms/${roomId}`, {
    cache: 'no-store',
  });

  if (!roomResponse.ok) {
    return redirect("/");
  }

  const room = await roomResponse.json();

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
            apiUrl="/api/rooms"
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
            apiUrl="/api/socket/rooms"
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