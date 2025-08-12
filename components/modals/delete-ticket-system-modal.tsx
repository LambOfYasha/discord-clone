"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Server } from "@/prisma/generated/postgres";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const DeleteTicketSystemModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const server = data.server;
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteTicketSystem";

  const handleDelete = async () => {
    if (!server?.id) return;
    
    setIsLoading(true);

    try {
      const response = await fetch(`/api/servers/${server.id}/ticket-system`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Ticket system deleted successfully!");
        onClose();
      } else {
        const error = await response.text();
        toast.error(error || "Failed to delete ticket system");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete ticket system");
    } finally {
      setIsLoading(false);
    }
  };

  if (!server) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Ticket System
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
            Are you sure you want to delete the ticket system? This action cannot be undone.
            <br />
            <br />
            This will:
            <br />
            • Remove all ticket system configuration
            <br />
            • Close all open tickets
            <br />
            • Delete all ticket history
          </DialogDescription>
        </DialogHeader>
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
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Ticket System"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
