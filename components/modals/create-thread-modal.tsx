"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Thread name is required.",
  }),
});

export const CreateThreadModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "createThread";
  const { apiUrl, query, parentMessage } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // Use the correct API URL for threads
      const url = "/api/threads";

      const requestData = {
        ...values,
        parentMessageId: parentMessage?.id || null,
        channelId: query?.channelId,
      };

      console.log("Thread creation request:", {
        url,
        data: requestData,
        query,
        parentMessage
      });

      await axios.post(url, requestData);

      form.reset();
      // Refresh the page to show the new thread
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Thread creation error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Thread
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {parentMessage?.id 
              ? "Create a thread to continue the conversation."
              : "Create a new thread to start a focused discussion."
            }
          </DialogDescription>
          {parentMessage && (
            <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
              <div className="flex items-center gap-x-2 mb-2">
                <span className="text-xs text-zinc-500">Replying to</span>
              </div>
              <div className="flex items-start gap-x-2">
                <div className="flex-1">
                  <div className="flex items-center gap-x-2">
                    <p className="font-semibold text-sm">
                      {parentMessage.member?.profile?.name || "Unknown"}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                    {parentMessage.content}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Thread Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter thread name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <Button
                  disabled={isLoading}
                  onClick={handleClose}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} variant="primary">
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
