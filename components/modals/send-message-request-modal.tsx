"use client";

import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send } from "lucide-react";
import axios from "axios";

export const SendMessageRequestModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "sendMessageRequest";
  const { targetProfile } = data;

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || !targetProfile) return;

    setIsLoading(true);
    try {
      await axios.post("/api/message-requests", {
        targetProfileId: targetProfile.id,
        message: message.trim(),
      });

      setMessage("");
      onClose();
    } catch (error) {
      console.error("Failed to send message request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  if (!targetProfile) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#2B2D31] text-white border-[#1E1F22]">
        <DialogHeader>
          <DialogTitle className="text-white">Send Message Request</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send a message request to {targetProfile.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Target User Info */}
          <div className="flex items-center space-x-3 p-3 bg-[#1E1F22] rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src={targetProfile.imageUrl} />
              <AvatarFallback className="bg-blue-500">
                <span className="text-white font-semibold">
                  {targetProfile.name.charAt(0).toUpperCase()}
                </span>
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">{targetProfile.name}</p>
              <p className="text-sm text-gray-400">Message will be sent as a request</p>
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400 resize-none"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-400 text-right">
              {message.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-[#1E1F22] text-white hover:bg-[#1E1F22]"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 