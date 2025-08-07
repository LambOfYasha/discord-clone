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
import qs from "query-string";
import CustomPopup from "@/components/custom-popup";

export const DeleteCategoryModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteCategory";
  const { category, server } = data;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/categories/${category?.id}`,
        query: { serverId: server?.id },
      });
      await axios.delete(url);
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
            <DialogTitle className="text-4xl text-center font-bold mb-3 text-red-500">
              Delete Category?
            </DialogTitle>
            <DialogDescription className="text-center text-black">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-indigo-500">
                {category?.name}
              </span>
              ?
              <br />
              <span className="text-red-500">
                This action cannot be undone. All channels in this category will be moved to uncategorized.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex w-full items-center justify-between">
              <Button disabled={isLoading} onClick={onClose} variant="ghost">
                No, take me back
              </Button>
              <Button
                disabled={isLoading}
                onClick={onClick}
                className="hover:bg-red-500 text-black hover:text-white"
              >
                Yes, I confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CustomPopup
        isOpen={isPopupOpen}
        message="Category deleted successfully!"
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};
