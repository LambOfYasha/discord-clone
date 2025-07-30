"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { useNavigationStore } from "@/hooks/use-navigation-store";

interface navigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: navigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const { isCollapsed } = useNavigationStore();
  
  const onClick = () => {
    if (params?.serverId !== id) {
      router.push(`/servers/${id}`);
    }
  };
  
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group flex relative items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] group-hover:rounded-[16px] transition-all overflow-hidden rounded-[24px]",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          {imageUrl && imageUrl.trim() !== "" ? (
            <Image fill src={imageUrl} alt="Server image" />
          ) : (
            <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </button>
    </ActionTooltip>
  );
};
