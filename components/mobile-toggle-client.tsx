"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import VisuallyHidden from "@/components/visually-hidden";

interface MobileToggleClientProps {
  serverId: string;
}

export const MobileToggleClient = ({ serverId }: MobileToggleClientProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <VisuallyHidden>
          <SheetTitle>Server Menu</SheetTitle>
        </VisuallyHidden>
        {/* We'll need to pass the server sidebar as a prop or create a client version */}
        <div className="flex flex-col h-full w-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
          <div className="p-4">
            <p className="text-sm text-zinc-500">Server Menu</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 