"use client";
import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference, AudioTrack, VideoTrack, useRoom, useLocalParticipant, useParticipants, useRoomContext, useTrack } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Monitor, MessageSquare, Users } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean | null>(null);

  // Check audio permissions when component mounts
  useEffect(() => {
    const checkAudioPermission = async () => {
      try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasAudioPermission(true);
        // Stop the stream immediately after checking
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error("Audio permission denied:", error);
        setHasAudioPermission(false);
      }
    };

    if (audio) {
      checkAudioPermission();
    }
  }, [audio]);

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) {
      return;
    }
    const name = `${user.firstName} ${user.lastName}`;
    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  // Show audio permission warning if needed
  if (audio && hasAudioPermission === false) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="flex items-center gap-2 mb-4">
          <MicOff className="h-8 w-8 text-red-500" />
          <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            Microphone Access Required
          </h3>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-md mb-4">
          To join this voice channel, you need to allow microphone access in your browser.
          Please check your browser settings and refresh the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VoiceChannelInterface />
    </LiveKitRoom>
  );
};

// Separate component for voice channel interface
const VoiceChannelInterface = () => {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const toggleAudio = async () => {
    if (isAudioEnabled) {
      await localParticipant.setMicrophoneEnabled(false);
      setIsAudioEnabled(false);
    } else {
      await localParticipant.setMicrophoneEnabled(true);
      setIsAudioEnabled(true);
    }
  };

  const toggleVideo = async () => {
    if (isVideoEnabled) {
      await localParticipant.setCameraEnabled(false);
      setIsVideoEnabled(false);
    } else {
      await localParticipant.setCameraEnabled(true);
      setIsVideoEnabled(true);
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      await localParticipant.setScreenShareEnabled(false);
      setIsScreenSharing(false);
    } else {
      await localParticipant.setScreenShareEnabled(true);
      setIsScreenSharing(true);
    }
  };

  const leaveChannel = () => {
    room.disconnect();
    window.history.back();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Video area */}
        <div className="flex-1 bg-gray-900 rounded-lg p-4 mr-4">
          <VideoConference />
        </div>

        {/* Chat sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Voice Chat</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="flex-1 bg-gray-900 rounded p-3 mb-4">
              <p className="text-gray-400 text-sm">Chat messages will appear here</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded px-3 py-2 text-sm"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 p-4 bg-gray-800 rounded-lg mt-4">
        <button
          onClick={toggleAudio}
          className={`p-3 rounded-full transition-colors ${
            isAudioEnabled 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full transition-colors ${
            isVideoEnabled 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`p-3 rounded-full transition-colors ${
            isScreenSharing 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          <Monitor className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowChat(!showChat)}
          className={`p-3 rounded-full transition-colors ${
            showChat 
              ? 'bg-purple-500 hover:bg-purple-600 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-white text-sm">{participants.length + 1}</span>
        </div>

        <button
          onClick={leaveChannel}
          className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
