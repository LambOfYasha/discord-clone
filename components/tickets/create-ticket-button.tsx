"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface CreateTicketButtonProps {
  serverId: string;
}

export const CreateTicketButton = ({ serverId }: CreateTicketButtonProps) => {
  const { onOpen } = useModal();

  const handleClick = () => {
    onOpen("createTicket", { serverId });
  };

  return (
    <Button onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-700">
      <Plus className="h-4 w-4 mr-2" />
      Create Ticket
    </Button>
  );
};

