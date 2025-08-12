"use client";

import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Edit, Trash2, MessageSquare } from "lucide-react";

interface TicketSystemStatusProps {
  serverId: string;
  ticketSystem: {
    id: string;
    isActive: boolean;
    welcomeMessage: string;
    maxOpenTickets: number;
    autoCloseHours: number;
    channel: {
      id: string;
      name: string;
    };
  };
}

export const TicketSystemStatus = ({
  serverId,
  ticketSystem
}: TicketSystemStatusProps) => {
  const { onOpen } = useModal();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Ticket System Status
        </CardTitle>
        <CardDescription>
          Current configuration and status of the ticket support system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={ticketSystem.isActive ? "default" : "secondary"}>
              {ticketSystem.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpen("editTicketSystem", { serverId, ticketSystem })}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpen("deleteTicketSystem", { serverId, ticketSystem })}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Channel:</span>
              <span className="text-sm font-medium">#{ticketSystem.channel.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Max Open Tickets:</span>
              <span className="text-sm font-medium">{ticketSystem.maxOpenTickets}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Auto-close After:</span>
              <span className="text-sm font-medium">{ticketSystem.autoCloseHours}h</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Welcome Message:</div>
            <div className="text-sm bg-muted p-2 rounded-md">
              {ticketSystem.welcomeMessage}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
