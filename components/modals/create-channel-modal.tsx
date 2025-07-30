"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomPopup from "@/components/custom-popup";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@/prisma/generated/postgres";
import { Loader2, Hash, Mic, Video } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .max(100, {
      message: "Channel name must be less than 100 characters",
    })
    .refine((name) => name !== "general", {
      message: "Channel name can not be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const params = useParams();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isModalOpen = isOpen && type === "createChannel";
  const { channelType } = data;
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType || ChannelType.TEXT,
    },
  });
  
  useEffect(() => {
    if (channelType) {
      form.setValue("type", channelType);
    } else {
      form.setValue("type", ChannelType.TEXT);
    }
  }, [channelType, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serverId,
        },
      });
      await axios.post(url, values);
      form.reset();
      onClose();
      router.refresh();
      setTimeout(() => {
        setIsPopupOpen(true);
      }, 500);
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    form.reset();
    setError(null);
    onClose();
  };

  const getChannelIcon = (type: ChannelType) => {
    switch (type) {
      case ChannelType.TEXT:
        return <Hash className="w-4 h-4" />;
      case ChannelType.AUDIO:
        return <Mic className="w-4 h-4" />;
      case ChannelType.VIDEO:
        return <Video className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-md mx-auto">
          <DialogHeader className="pt-8 px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Hash className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center font-bold mb-2">
              Create channel
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500 text-sm leading-relaxed">
              Create a text, audio, or video channel for your server members to communicate.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="px-6 space-y-6">
                {/* Channel Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Channel name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-0 bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 text-black focus-visible:ring-offset-0 transition-all duration-200"
                          placeholder="Enter a channel name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-zinc-400">
                        This is how your channel will appear to others
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Channel Type Select */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Channel type
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-100 border-0 focus:ring-2 focus:ring-indigo-500 text-black ring-offset-0 capitalize focus:ring-offset-0 outline-none transition-all duration-200">
                            <SelectValue placeholder="Select a channel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ChannelType).map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize"
                            >
                              <div className="flex items-center gap-2">
                                {getChannelIcon(type)}
                                {type.toLowerCase()}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs text-zinc-400">
                        Choose how members will interact in this channel
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="bg-gray-50 px-6 py-4">
                <div className="flex gap-3 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    variant="primary" 
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Channel"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <CustomPopup
        isOpen={isPopupOpen}
        message="Channel created successfully!"
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};
