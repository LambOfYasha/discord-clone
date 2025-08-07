"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, X, Edit, Trash } from "lucide-react";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatItem } from "./chat-item";
import { Member, Profile } from "@prisma/generated/postgres";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThreadViewProps {
  threadId: string;
  channelId: string;
  serverId: string;
  currentMember: Member & {
    profile: Profile;
  };
  threadName: string;
  onClose: () => void;
  onEditThread: (threadId: string, newName: string) => void;
  onDeleteThread: (threadId: string) => void;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ThreadView = ({
  threadId,
  channelId,
  serverId,
  currentMember,
  threadName,
  onClose,
  onEditThread,
  onDeleteThread,
}: ThreadViewProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const messagesRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(threadName);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // Fetch thread messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/threads/${threadId}/messages`);
        setMessages(response.data.items || []);
      } catch (error) {
        console.error("Failed to fetch thread messages:", error);
      }
    };

    fetchMessages();
  }, [threadId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/threads/${threadId}/messages`, values, {
        withCredentials: true,
      });
      form.reset();
      router.refresh();
      
      // Refresh messages
      const response = await axios.get(`/api/threads/${threadId}/messages`);
      setMessages(response.data.items || []);
    } catch (error: any) {
      console.error("Thread message error:", error);
      if (error.response?.status === 401) {
        alert("You are not authorized to send messages in this thread.");
      } else {
        alert("Failed to send message. Please try again.");
      }
    }
  };

  const handleEditThread = async () => {
    try {
      await axios.patch(`/api/threads/${threadId}`, {
        name: editName,
      });
      onEditThread(threadId, editName);
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to edit thread:", error);
    }
  };

  const handleDeleteThread = async () => {
    if (confirm("Are you sure you want to delete this thread? This action cannot be undone.")) {
      try {
        await axios.delete(`/api/threads/${threadId}`);
        onDeleteThread(threadId);
        onClose();
      } catch (error) {
        console.error("Failed to delete thread:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#313338]">
      {/* Thread Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {isEditingName ? (
              <div className="flex items-center gap-x-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-6 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEditThread();
                    } else if (e.key === 'Escape') {
                      setIsEditingName(false);
                      setEditName(threadName);
                    }
                  }}
                  autoFocus
                />
                <Button size="sm" onClick={handleEditThread}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => {
                  setIsEditingName(false);
                  setEditName(threadName);
                }}>Cancel</Button>
              </div>
            ) : (
              <span>{threadName}</span>
            )}
          </h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {messages.length} messages
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEditingName(true)}>
                Edit Thread Name
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDeleteThread}
                className="text-red-600 dark:text-red-400"
              >
                Delete Thread
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={onClose}
            className="h-6 w-6 rounded-full bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition flex items-center justify-center"
          >
            <X className="h-4 w-4 text-white dark:text-[#313338]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4" ref={messagesRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 dark:text-zinc-400">
            <p>No messages in this thread yet.</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatItem
                key={message.id}
                id={message.id}
                content={message.content}
                member={message.member}
                timestamp={message.createdAt}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                pinned={false}
                currentMember={currentMember}
                isUpdated={false}
                socketUrl={`/api/threads/${threadId}/messages`}
                socketQuery={{
                  threadId,
                  channelId,
                  serverId,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative p-4 pb-6">
                    <button
                      type="button"
                      onClick={() => onOpen("messageFile", { 
                        apiUrl: `/api/threads/${threadId}/messages`,
                        query: { threadId, channelId, serverId }
                      })}
                      className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                    >
                      <Plus className="text-white dark:text-[#313338]" />
                    </button>
                    <Input
                      placeholder="Message thread..."
                      disabled={isSubmitting}
                      className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                      {...field}
                    />
                    <div className="absolute top-7 right-8">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value}${emoji}`)
                        }
                      />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
