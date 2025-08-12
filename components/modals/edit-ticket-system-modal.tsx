"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "@/hooks/use-modal-store";
import { Server } from "@/prisma/generated/postgres";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EditTicketSystemModalProps {
  server: Server;
}

interface Channel {
  id: string;
  name: string;
  type: string;
}

interface TicketSystem {
  id: string;
  channelId: string;
  welcomeMessage: string;
  maxOpenTickets: number;
  autoCloseHours: number;
  isActive: boolean;
}

export const EditTicketSystemModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const server = data.server;
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [ticketSystem, setTicketSystem] = useState<TicketSystem | null>(null);
  const [formData, setFormData] = useState({
    channelId: "",
    welcomeMessage: "",
    maxOpenTickets: 3,
    autoCloseHours: 72,
    isActive: true,
  });

  const isModalOpen = isOpen && type === "editTicketSystem";

  useEffect(() => {
    if (isModalOpen && server?.id) {
      fetchChannels();
      fetchTicketSystem();
    }
  }, [isModalOpen, server?.id]);

  const fetchChannels = async () => {
    if (!server?.id) return;
    
    try {
      const response = await fetch(`/api/channels?serverId=${server.id}`);
      if (response.ok) {
        const data = await response.json();
        const textChannels = data.filter((channel: Channel) => channel.type === "TEXT");
        setChannels(textChannels);
      }
    } catch (error) {
      console.error("Failed to fetch channels:", error);
      toast.error("Failed to load channels");
    }
  };

  const fetchTicketSystem = async () => {
    if (!server?.id) return;
    
    try {
      const response = await fetch(`/api/servers/${server.id}/ticket-system`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setTicketSystem(data);
          setFormData({
            channelId: data.channelId || "",
            welcomeMessage: data.welcomeMessage || "",
            maxOpenTickets: data.maxOpenTickets || 3,
            autoCloseHours: data.autoCloseHours || 72,
            isActive: data.isActive !== false,
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch ticket system:", error);
      toast.error("Failed to load ticket system configuration");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!server?.id) return;
    
    setIsLoading(true);

    try {
      const response = await fetch(`/api/servers/${server.id}/ticket-system`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Ticket system updated successfully!");
        onClose();
      } else {
        const error = await response.text();
        toast.error(error || "Failed to update ticket system");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update ticket system");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!server) {
    return null;
  }

  if (!ticketSystem) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Ticket System
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
            Update the ticket support system configuration
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 px-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="channelId" className="text-sm font-semibold">
                Ticket Channel
              </Label>
              <Select
                value={formData.channelId}
                onValueChange={(value) => handleChange("channelId", value)}
                disabled={isLoading}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a channel for tickets" />
                </SelectTrigger>
                <SelectContent>
                  {channels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      #{channel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="welcomeMessage" className="text-sm font-semibold">
                Welcome Message
              </Label>
              <Textarea
                id="welcomeMessage"
                placeholder="Welcome message shown when users access the ticket system..."
                value={formData.welcomeMessage}
                onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                disabled={isLoading}
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxOpenTickets" className="text-sm font-semibold">
                  Max Open Tickets per User
                </Label>
                <Input
                  id="maxOpenTickets"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxOpenTickets}
                  onChange={(e) => handleChange("maxOpenTickets", parseInt(e.target.value))}
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="autoCloseHours" className="text-sm font-semibold">
                  Auto-close After (Hours)
                </Label>
                <Input
                  id="autoCloseHours"
                  type="number"
                  min="1"
                  max="720"
                  value={formData.autoCloseHours}
                  onChange={(e) => handleChange("autoCloseHours", parseInt(e.target.value))}
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                disabled={isLoading}
                className="rounded"
              />
              <Label htmlFor="isActive" className="text-sm font-semibold">
                Enable Ticket System
              </Label>
            </div>
          </div>

          <DialogFooter className="bg-gray-100 dark:bg-[#2B2D31] px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.channelId}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Ticket System"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
