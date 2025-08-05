"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ErrorImage } from "@/components/ui/error-image";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      {src ? (
        <ErrorImage
          src={src}
          alt="Avatar"
          className="h-full w-full object-cover rounded-full"
          fallbackIcon={<span className="text-xs font-medium">?</span>}
          fallbackClassName="h-full w-full bg-zinc-700 text-zinc-200 flex items-center justify-center rounded-full"
        />
      ) : (
        <AvatarFallback className="bg-zinc-700 text-zinc-200">
          <span className="text-xs font-medium">?</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};
