"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface InviteMessageCardProps {
  serverName: string;
  inviteUrl: string;
  serverImageUrl?: string;
  memberCount?: number;
  messageId: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export const InviteMessageCard = ({
  serverName,
  inviteUrl,
  serverImageUrl,
  memberCount = 0,
  messageId,
  onAccept,
  onDecline,
}: InviteMessageCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");
  const router = useRouter();

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      // Extract invite code from URL
      const inviteCode = inviteUrl.split("/").pop();
      
      if (inviteCode) {
        const response = await axios.post(`/api/invite/${inviteCode}`);
        if (response.status === 200) {
          setStatus("accepted");
          onAccept?.();
          // Navigate to the server
          router.push(`/servers/${response.data.server.id}`);
        }
      }
    } catch (error) {
      console.error("Failed to accept invite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    setStatus("declined");
    onDecline?.();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
  };

  if (status === "accepted") {
    return (
      <Card className="w-full max-w-md bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Invitation accepted!</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "declined") {
    return (
      <Card className="w-full max-w-md bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <X className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800 font-medium">Invitation declined</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={serverImageUrl} />
            <AvatarFallback className="bg-indigo-500">
              <span className="text-white font-semibold">
                {serverName.charAt(0).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{serverName}</CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{memberCount} members</span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
            Server Invite
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            You've been invited to join this server. Click accept to join or decline to ignore.
          </p>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleAccept}
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              {isLoading ? "Joining..." : "Accept"}
            </Button>
            <Button
              onClick={handleDecline}
              disabled={isLoading}
              variant="outline"
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <Button
              onClick={handleCopyLink}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Copy Link
            </Button>
            <Button
              onClick={() => window.open(inviteUrl, "_blank")}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              Open in Browser
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 