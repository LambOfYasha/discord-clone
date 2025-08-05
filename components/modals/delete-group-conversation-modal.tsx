"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomPopup from "@/components/custom-popup";

export const DeleteGroupConversationModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isModalOpen = isOpen && type === "deleteGroupConversation";
  const { groupConversation } = data;
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/group-conversations/${groupConversation?.id}`);
      onClose();
      router.refresh();
      setTimeout(() => {
        setIsPopupOpen(true);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Group Conversation
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to delete the group conversation{" "}
              <span className="font-semibold text-indigo-500">
                {groupConversation?.name}
              </span>
              ? This will permanently delete all messages and remove all members. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button
                disabled={isLoading}
                onClick={onClose}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                variant="primary"
                onClick={onClick}
              >
                Delete Group
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CustomPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Group Deleted"
        description={`The group conversation "${groupConversation?.name}" has been permanently deleted.`}
        type="success"
      />
    </>
  );
}; 