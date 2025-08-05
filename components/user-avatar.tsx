"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
  name?: string;
}

export const UserAvatar = ({ src, className, name }: UserAvatarProps) => {
  // Generate fallback initials from name or src
  const getInitials = () => {
    if (name) {
      return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
    }
    if (src) {
      // Try to extract name from URL
      const nameFromSrc = src.split('/').pop()?.split('.')[0];
      if (nameFromSrc) {
        return nameFromSrc.charAt(0).toUpperCase();
      }
    }
    return "?";
  };

  const initials = getInitials();

  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      {src ? (
        <AvatarImage 
          src={src} 
          alt={name || "Avatar"}
          className="object-cover"
        />
      ) : null}
      <AvatarFallback className="bg-zinc-700 text-zinc-200">
        <span className="text-xs font-medium">{initials}</span>
      </AvatarFallback>
    </Avatar>
  );
};
