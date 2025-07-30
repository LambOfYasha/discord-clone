"use client";
import { useEffect, useState, useRef } from "react";
import { LiveKitRoom, useLocalParticipant, useParticipants, useRoomContext } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Monitor, MessageSquare, Users, Volume2, VolumeX, Crown, Shield, MoreVertical, UserX, Volume1, Maximize2, Minimize2, Activity, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  const { user } = useUser();
       const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean | null>(null);

  // Check audio permissions
  useEffect(() => {
    const checkAudioPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasAudioPermission(true);
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        setHasAudioPermission(false);
      }
    };
    checkAudioPermission();
  }, []);



  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    user: string;
    avatar: string;
    message: string;
    timestamp: Date;
  }>>([]);
       const [newMessage, setNewMessage] = useState("");

  // Set up video element when camera is enabled
  useEffect(() => {
    if (isVideoEnabled && localParticipant && videoElementRef.current) {
      // Get user media directly for the video element
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoElementRef.current!.srcObject = stream;
          console.log("Video stream set up successfully");
        })
        .catch(error => {
          console.error("Error setting up video stream:", error);
        });
    }
  }, [isVideoEnabled, localParticipant]);

  // Video element ref for fullscreen functionality
  const videoElementRef = useRef<HTMLVideoElement>(null);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

    const toggleAudio = async () => {
     try {
       if (!localParticipant || room.state !== 'connected') {
         return;
       }

       if (isAudioEnabled) {
         await localParticipant.setMicrophoneEnabled(false);
         setIsAudioEnabled(false);
       } else {
         // Request microphone permission first
         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
         // Stop the test stream
         stream.getTracks().forEach(track => track.stop());
         
         await localParticipant.setMicrophoneEnabled(true);
         setIsAudioEnabled(true);
       }
     } catch (error) {
       console.error("Error toggling audio:", error);
     }
   };

       const toggleVideo = async () => {
      try {
        if (!localParticipant || room.state !== 'connected') {
          return;
        }

        if (isVideoEnabled) {
          await localParticipant.setCameraEnabled(false);
          setIsVideoEnabled(false);
        } else {
          // Request camera permission first
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          // Stop the test stream
          stream.getTracks().forEach(track => track.stop());
          
          await localParticipant.setCameraEnabled(true);
          setIsVideoEnabled(true);
        }
      } catch (error) {
        console.error("Error toggling video:", error);
      }
    };

       const toggleScreenShare = async () => {
      try {
        if (isScreenSharing) {
          await localParticipant.setScreenShareEnabled(false);
          setIsScreenSharing(false);
        } else {
          await localParticipant.setScreenShareEnabled(true);
          setIsScreenSharing(true);
        }
      } catch (error) {
        console.error("Error toggling screen share:", error);
      }
    };

    const toggleFullscreen = () => {
      const videoElement = videoElementRef.current;
      if (!videoElement) return;

      if (!isFullscreen) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if ((videoElement as any).webkitRequestFullscreen) {
          (videoElement as any).webkitRequestFullscreen();
        } else if ((videoElement as any).msRequestFullscreen) {
          (videoElement as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    };

  const leaveChannel = () => {
    room.disconnect();
    window.history.back();
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        user: user?.firstName + " " + user?.lastName || "Unknown",
        avatar: user?.imageUrl || "",
        message: newMessage,
        timestamp: new Date(),
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const muteParticipant = async (participant: any) => {
    // This would require server-side implementation
    console.log("Mute participant:", participant.identity);
  };

  const deafenParticipant = async (participant: any) => {
    // This would require server-side implementation
    console.log("Deafen participant:", participant.identity);
  };

  const kickParticipant = async (participant: any) => {
    // This would require server-side implementation
    console.log("Kick participant:", participant.identity);
  };

     const getParticipantStatus = (participant: any) => {
     const micTrack = participant.getTrackPublication('microphone');
     const isMuted = !micTrack?.isMuted;
     const isDeafened = !micTrack?.isSubscribed;
     const isSpeaking = micTrack?.audioLevel > 0.1;
     
     return { isMuted, isDeafened, isSpeaking };
   };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main content area */}
      <div className="flex-1 flex">
                                   {/* Video area */}
          <div className="flex-1 bg-gray-900 rounded-lg p-4 mr-4">
            <div className="h-full flex items-center justify-center">
                             {isVideoEnabled && localParticipant ? (
                                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <Avatar className="w-24 h-24 mx-auto mb-4">
                          <AvatarFallback className="bg-indigo-500 text-white text-2xl">
                            {getInitials(`${user?.firstName} ${user?.lastName}`)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-white text-lg font-medium">Camera Active</h3>
                        <p className="text-gray-400 text-sm mt-2">
                          Your camera is now enabled and broadcasting
                        </p>
                                                 <div className="mt-2 px-3 py-1 bg-green-600 text-white rounded-full text-xs">
                           Video Active
                         </div>
                                                  {/* Video indicator */}
                          <div className="mt-4 p-3 bg-green-800 rounded-lg">
                            <p className="text-green-200 text-sm">
                              Camera track published and broadcasting
                            </p>
                          </div>
                          
                                                     {/* Audio indicator */}
                           {isAudioEnabled && (
                             <div className="mt-2 p-3 bg-blue-800 rounded-lg">
                               <p className="text-blue-200 text-sm">
                                 Microphone active and broadcasting
                               </p>
                             </div>
                           )}
                          
                                                     {/* Actual video feed */}
                           <div className="mt-4 w-full max-w-md mx-auto relative">
                             <video
                               ref={videoElementRef}
                               autoPlay
                               playsInline
                               muted
                               className="w-full h-48 bg-black rounded-lg object-cover transition-all duration-200"
                             />
                             {/* Fullscreen button */}
                             <button
                               onClick={toggleFullscreen}
                               className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-lg transition-all duration-200"
                               title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                             >
                               {isFullscreen ? (
                                 <Minimize2 className="w-4 h-4 text-white" />
                               ) : (
                                 <Maximize2 className="w-4 h-4 text-white" />
                               )}
                             </button>
                           </div>
                      </div>
                    </div>
                  </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarFallback className="bg-indigo-500 text-white text-2xl">
                        {getInitials(`${user?.firstName} ${user?.lastName}`)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-white text-lg font-medium">Voice Channel</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      {participants.length} participant{participants.length !== 1 ? 's' : ''} in channel
                    </p>
                                         <div className={`mt-2 px-3 py-1 rounded-full text-xs ${
                       room.state === 'connected' 
                         ? 'bg-green-600 text-white' 
                         : 'bg-yellow-600 text-white'
                     }`}>
                       {room.state === 'connected' ? 'Connected' : 'Connecting...'}
                     </div>
                     
                     {/* Audio indicator */}
                     {isAudioEnabled && (
                       <div className="mt-2 p-3 bg-blue-800 rounded-lg">
                         <p className="text-blue-200 text-sm">
                           Microphone active and broadcasting
                         </p>
                       </div>
                     )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {participants.map((participant) => (
                      <div key={participant.identity} className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-500 text-white text-xs">
                            {getInitials(participant.identity)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white text-sm">{participant.identity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        {/* Participants sidebar */}
        {showParticipants && (
          <div className="w-80 bg-gray-800 rounded-lg p-4">
                         <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-semibold">Participants ({participants.length})</h3>
              <button
                onClick={() => setShowParticipants(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
                                            {/* All participants including local */}
               {participants.map((participant) => {
                 const { isMuted, isDeafened, isSpeaking } = getParticipantStatus(participant);
                 const isLocalUser = participant.identity === `${user?.firstName} ${user?.lastName}`;
                 return (
                   <div key={participant.identity} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg">
                     <div className="flex items-center gap-3">
                       <Avatar className="w-8 h-8">
                         <AvatarImage src={isLocalUser ? user?.imageUrl : undefined} />
                         <AvatarFallback className={`text-white text-xs ${isLocalUser ? 'bg-indigo-500' : 'bg-gray-500'}`}>
                           {getInitials(participant.identity)}
                         </AvatarFallback>
                       </Avatar>
                       <div className="flex items-center gap-2">
                         <span className={`text-sm font-medium ${isSpeaking ? 'text-green-400' : 'text-white'}`}>
                           {participant.identity}{isLocalUser ? ' (You)' : ''}
                         </span>
                         {isLocalUser && <Crown className="w-4 h-4 text-yellow-500" />}
                         {participant.identity.includes("Admin") && !isLocalUser && <Shield className="w-4 h-4 text-green-500" />}
                       </div>
                     </div>
                     <div className="flex items-center gap-1">
                       {!isMuted && <MicOff className="w-4 h-4 text-red-500" />}
                       {isDeafened && <VolumeX className="w-4 h-4 text-red-500" />}
                       {!isLocalUser && (
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                               <MoreVertical className="w-4 h-4 text-gray-400" />
                             </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem onClick={() => muteParticipant(participant)}>
                               <MicOff className="w-4 h-4 mr-2" />
                               Mute User
                             </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => deafenParticipant(participant)}>
                               <VolumeX className="w-4 h-4 mr-2" />
                               Deafen User
                             </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => kickParticipant(participant)} className="text-red-500">
                               <UserX className="w-4 h-4 mr-2" />
                               Kick from Channel
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                       )}
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>
        )}

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
            <div className="flex-1 bg-gray-900 rounded p-3 mb-4 max-h-96 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <p className="text-gray-400 text-sm">No messages yet. Start the conversation!</p>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback className="bg-indigo-500 text-white text-xs">
                          {getInitials(msg.user)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-medium">{msg.user}</span>
                          <span className="text-gray-400 text-xs">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded px-3 py-2 text-sm"
              />
              <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
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

        <button
          onClick={() => setShowParticipants(!showParticipants)}
          className={`p-3 rounded-full transition-colors ${
            showParticipants 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          <Users className="w-5 h-5" />
        </button>

                 <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full">
           <Users className="w-4 h-4 text-gray-400" />
           <span className="text-white text-sm">{participants.length}</span>
         </div>

                 <button
           onClick={leaveChannel}
           className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
         >
           <PhoneOff className="w-5 h-5" />
         </button>

         {/* Status button */}
         <button
           onClick={() => setShowStatusModal(true)}
           className="p-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
           title="Voice Status"
         >
           <Activity className="w-5 h-5" />
         </button>
       </div>

       {/* Status Modal */}
       {showStatusModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-white text-lg font-semibold">Voice Status</h3>
               <button
                 onClick={() => setShowStatusModal(false)}
                 className="text-gray-400 hover:text-white text-xl"
               >
                 ×
               </button>
             </div>
             
             <div className="space-y-4">
               {/* Connection Status */}
               <div className="bg-gray-700 rounded-lg p-4">
                 <h4 className="text-white font-medium mb-2">Connection</h4>
                 <div className="flex items-center gap-2">
                   <div className={`w-3 h-3 rounded-full ${
                     room.state === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                   }`} />
                   <span className="text-gray-300 text-sm">
                     {room.state === 'connected' ? 'Connected' : 'Connecting...'}
                   </span>
                 </div>
               </div>

               {/* Audio Status */}
               <div className="bg-gray-700 rounded-lg p-4">
                 <h4 className="text-white font-medium mb-2">Audio</h4>
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">Microphone</span>
                     <div className="flex items-center gap-2">
                       {isAudioEnabled ? (
                         <Mic className="w-4 h-4 text-green-500" />
                       ) : (
                         <MicOff className="w-4 h-4 text-red-500" />
                       )}
                       <span className="text-gray-300 text-sm">
                         {isAudioEnabled ? 'Enabled' : 'Disabled'}
                       </span>
                     </div>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">Permission</span>
                     <span className="text-gray-300 text-sm">
                       {hasAudioPermission ? 'Granted' : 'Denied'}
                     </span>
                   </div>
                 </div>
               </div>

               {/* Video Status */}
               <div className="bg-gray-700 rounded-lg p-4">
                 <h4 className="text-white font-medium mb-2">Video</h4>
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">Camera</span>
                     <div className="flex items-center gap-2">
                       {isVideoEnabled ? (
                         <Video className="w-4 h-4 text-green-500" />
                       ) : (
                         <VideoOff className="w-4 h-4 text-red-500" />
                       )}
                       <span className="text-gray-300 text-sm">
                         {isVideoEnabled ? 'Enabled' : 'Disabled'}
                       </span>
                     </div>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">Fullscreen</span>
                     <span className="text-gray-300 text-sm">
                       {isFullscreen ? 'Active' : 'Inactive'}
                     </span>
                   </div>
                 </div>
               </div>

               {/* Screen Share Status */}
               <div className="bg-gray-700 rounded-lg p-4">
                 <h4 className="text-white font-medium mb-2">Screen Share</h4>
                 <div className="flex items-center justify-between">
                   <span className="text-gray-300 text-sm">Status</span>
                   <div className="flex items-center gap-2">
                     {isScreenSharing ? (
                       <Monitor className="w-4 h-4 text-green-500" />
                     ) : (
                       <Monitor className="w-4 h-4 text-gray-500" />
                     )}
                     <span className="text-gray-300 text-sm">
                       {isScreenSharing ? 'Sharing' : 'Not Sharing'}
                     </span>
                   </div>
                 </div>
               </div>

               {/* Room Info */}
               <div className="bg-gray-700 rounded-lg p-4">
                 <h4 className="text-white font-medium mb-2">Room Info</h4>
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">Participants</span>
                     <span className="text-gray-300 text-sm">{participants.length}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">Room ID</span>
                     <span className="text-gray-300 text-sm font-mono text-xs">{room.name || 'Voice Channel'}</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };
