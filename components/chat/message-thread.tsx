"use client";

import { useState } from "react";
import { Member, Profile } from "@/prisma/generated/postgres";
import { Message } from "@/prisma/generated/mongo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { format } from "date-fns";
import { Reply, X } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import qs from "query-string";

interface MessageThreadProps {
  message: Message & {
    member: Member & {
      profile: Profile;
    };
  };
  currentMember: Member;
  socketQuery: Record<string, string>;
  onClose: () => void;
}

export const MessageThread = ({
  message,
  currentMember,
  socketQuery,
  onClose,
}: MessageThreadProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with content:", replyContent);
    
    if (!replyContent.trim()) {
      console.log("No content to submit");
      return;
    }

    try {
      setIsSubmitting(true);
      const url = qs.stringifyUrl({
        url: "/api/socket/messages",
        query: socketQuery,
      });

      // Check if the original message already contains quoted content
      const hasQuotedContent = message.content.includes('> ');
      
      // If the original message already has quoted content, don't add it again
      // Just use the reply content directly
      const finalContent = hasQuotedContent ? replyContent : `> ${message.content}\n\n${replyContent}`;

      console.log("Submitting to URL:", url);
      console.log("Request body:", {
        content: finalContent,
        replyTo: message.id,
      });

      const response = await axios.post(url, {
        content: finalContent,
        replyTo: message.id,
      });

      console.log("Reply submitted successfully:", response.data);
      setReplyContent("");
      onClose();
    } catch (error) {
      console.log("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold flex items-center">
            <Reply className="h-5 w-5 mr-2" />
            Reply to message
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {/* Original message */}
          <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-x-2 mb-2">
              <Reply className="h-4 w-4 text-zinc-500" />
              <span className="text-xs text-zinc-500">Replying to</span>
            </div>
            <div className="flex items-start gap-x-2">
              <UserAvatar src={message.member.profile.imageUrl} />
              <div className="flex-1">
                <div className="flex items-center gap-x-2">
                  <p className="font-semibold text-sm">
                    {message.member.profile.name}
                  </p>
                  <span className="text-xs text-zinc-500">
                    {format(new Date(message.createdAt), "MMM d, yyyy 'at' HH:mm")}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                  {message.content}
                </p>
              </div>
            </div>
          </div>

                                {/* Reply form */}
           <form onSubmit={handleSubmit} className="space-y-4">
             <div className="flex items-start gap-x-2">
               <UserAvatar src={currentMember.profile?.imageUrl} />
               <div className="flex-1">
                 <Input
                   value={replyContent}
                   onChange={(e) => setReplyContent(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       handleSubmit(e as any);
                     }
                   }}
                   placeholder="Write a reply... (Press Enter to submit)"
                   className="bg-zinc-200/90 dark:bg-zinc-700/75 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                   disabled={isSubmitting}
                 />
                 {replyContent && (
                   <div className="mt-2 p-2 bg-zinc-100 dark:bg-zinc-700 rounded text-xs">
                     <div className="text-zinc-500 mb-1">Preview:</div>
                     <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-3 italic text-zinc-500 dark:text-zinc-400">
                       {message.content}
                     </div>
                     <div className="mt-2">{replyContent}</div>
                   </div>
                 )}
               </div>
             </div>
             <div className="flex justify-end gap-x-2">
               <Button
                 type="button"
                 variant="ghost"
                 onClick={onClose}
                 disabled={isSubmitting}
               >
                 Cancel
               </Button>
               <Button
                 type="submit"
                 disabled={!replyContent.trim() || isSubmitting}
                 className="bg-indigo-500 hover:bg-indigo-600 text-white"
               >
                 Reply
               </Button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
}; 