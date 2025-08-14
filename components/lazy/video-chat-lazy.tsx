"use client";

import React, { Suspense, lazy } from "react";
import { Loader2, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load the video chat component
const VideoChat = lazy(() => import("@/components/chat-video-button"));

interface VideoChatLazyProps {
  isVideo: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const VideoChatLazy: React.FC<VideoChatLazyProps> = ({ isVideo, onToggle, disabled }) => {
  return (
    <Suspense
      fallback={
        <Button
          onClick={onToggle}
          disabled={disabled}
          size="icon"
          variant="ghost"
          className="h-8 w-8 md:h-8 md:w-8"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      }
    >
      <VideoChat isVideo={isVideo} onToggle={onToggle} disabled={disabled} />
    </Suspense>
  );
};

export default VideoChatLazy;
