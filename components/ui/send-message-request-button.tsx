"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { MessageSquare } from "lucide-react";

interface SendMessageRequestButtonProps {
  targetProfile: {
    id: string;
    name: string;
    imageUrl: string;
  };
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const SendMessageRequestButton = ({
  targetProfile,
  variant = "outline",
  size = "sm",
  className,
}: SendMessageRequestButtonProps) => {
  const { onOpen } = useModal();

  const handleClick = () => {
    onOpen("sendMessageRequest", { targetProfile });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Send Message
    </Button>
  );
}; 