"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus, Hash, HashOff } from "lucide-react";
import { toast } from "sonner";

interface FollowButtonProps {
  type: "user" | "server";
  targetId: string;
  isFollowing: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
  className?: string;
}

export const FollowButton = ({
  type,
  targetId,
  isFollowing,
  onFollowChange,
  className = ""
}: FollowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const endpoint = type === "user" ? "/api/follows" : "/api/server-follows";
      const body = type === "user" ? { targetProfileId: targetId } : { serverId: targetId };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setFollowing(true);
        onFollowChange?.(true);
        toast.success(`Started following ${type === "user" ? "user" : "server"}`);
      } else {
        const error = await response.text();
        toast.error(error || `Failed to follow ${type === "user" ? "user" : "server"}`);
      }
    } catch (error) {
      console.error("Follow error:", error);
      toast.error(`Failed to follow ${type === "user" ? "user" : "server"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const endpoint = type === "user" 
        ? `/api/follows?targetProfileId=${targetId}`
        : `/api/server-follows?serverId=${targetId}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        setFollowing(false);
        onFollowChange?.(false);
        toast.success(`Unfollowed ${type === "user" ? "user" : "server"}`);
      } else {
        const error = await response.text();
        toast.error(error || `Failed to unfollow ${type === "user" ? "user" : "server"}`);
      }
    } catch (error) {
      console.error("Unfollow error:", error);
      toast.error(`Failed to unfollow ${type === "user" ? "user" : "server"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (following) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant={following ? "outline" : "default"}
      size="sm"
      className={`${following ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "bg-[#5865F2] hover:bg-[#4752C4]"} ${className}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : following ? (
        <>
          {type === "user" ? (
            <UserMinus className="h-4 w-4 mr-2" />
          ) : (
            <HashOff className="h-4 w-4 mr-2" />
          )}
          Unfollow
        </>
      ) : (
        <>
          {type === "user" ? (
            <UserPlus className="h-4 w-4 mr-2" />
          ) : (
            <Hash className="h-4 w-4 mr-2" />
          )}
          Follow
        </>
      )}
    </Button>
  );
}; 