"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MessageSquare, Paperclip, Bold, Italic, Strikethrough, Code, Quote, Link, List, ListOrdered, ChevronDown, ChevronUp } from "lucide-react";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [showToolbar, setShowToolbar] = useState(true);
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values, {
        withCredentials: true,
      });
      form.reset();
      router.refresh();
    } catch (error: any) {
      console.error("Chat input error:", error);
      
      // Show user-friendly error message
      if (error.response?.status === 503) {
        alert("Message service is temporarily unavailable. Please try again later.");
      } else if (error.response?.status === 401) {
        alert("You are not authorized to send messages in this room.");
      } else {
        alert("Failed to send message. Please try again.");
      }
    }
  };
  const content = form.watch("content");
  const handleSelect = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    setSelection({ start, end });
  };
  const replaceContent = (next: string, newCursorStart?: number, newCursorEnd?: number) => {
    form.setValue("content", next, { shouldDirty: true });
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        const posStart = newCursorStart ?? next.length;
        const posEnd = newCursorEnd ?? posStart;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(posStart, posEnd);
      }
    });
  };
  const wrapSelection = (before: string, after?: string) => {
    const a = before;
    const b = after ?? before;
    const start = selection.start;
    const end = selection.end;
    const selected = content.slice(start, end);
    const updated = content.slice(0, start) + a + selected + b + content.slice(end);
    replaceContent(updated, start + a.length, end + a.length);
  };
  const blockWrap = (fence: string) => {
    const start = selection.start;
    const end = selection.end;
    const selected = content.slice(start, end);
    const prefix = selected.startsWith("\n") || start === 0 ? "" : "\n";
    const suffix = selected.endsWith("\n") || end === content.length ? "" : "\n";
    const wrapped = `${prefix}${fence}\n${selected}\n${fence}${suffix}`;
    const updated = content.slice(0, start) + wrapped + content.slice(end);
    const newPos = start + wrapped.length;
    replaceContent(updated, newPos, newPos);
  };
  const linePrefix = (prefix: string) => {
    const start = selection.start;
    const end = selection.end;
    const before = content.slice(0, start);
    const selected = content.slice(start, end);
    const after = content.slice(end);
    const lines = selected.split(/\n/);
    const prefixed = lines.map((l) => (l.length ? `${prefix} ${l}` : l)).join("\n");
    const updated = before + prefixed + after;
    replaceContent(updated, start, start + prefixed.length);
  };
  const makeLink = () => {
    const start = selection.start;
    const end = selection.end;
    const selected = content.slice(start, end).trim();
    const isUrl = /^https?:\/\//i.test(selected);
    const label = isUrl ? "link" : selected || "label";
    const url = isUrl ? selected : "https://";
    const snippet = `[${label}](${url})`;
    const updated = content.slice(0, start) + snippet + content.slice(end);
    const cursor = start + snippet.length;
    replaceContent(updated, cursor, cursor);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  {showToolbar ? (
                    <div className="flex items-center justify-between mb-2 px-2 py-1 rounded-md border bg-zinc-100/50 dark:bg-zinc-800/50">
                      <div className="flex items-center gap-1">
                        <button type="button" title="Bold" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("**")}> <Bold className="w-4 h-4"/> </button>
                        <button type="button" title="Italic" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("*")}> <Italic className="w-4 h-4"/> </button>
                        <button type="button" title="Strikethrough" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("~~")}> <Strikethrough className="w-4 h-4"/> </button>
                        <span className="mx-1 h-4 w-px bg-zinc-300 dark:bg-zinc-600" />
                        <button type="button" title="Inline code" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => wrapSelection("`")}> <Code className="w-4 h-4"/> </button>
                        <button type="button" title="Code block" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => blockWrap("```")}> <Code className="w-4 h-4"/> </button>
                        <span className="mx-1 h-4 w-px bg-zinc-300 dark:bg-zinc-600" />
                        <button type="button" title="Quote" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => linePrefix(">")}> <Quote className="w-4 h-4"/> </button>
                        <button type="button" title="Bulleted list" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => linePrefix("-")}> <List className="w-4 h-4"/> </button>
                        <button type="button" title="Numbered list" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => linePrefix("1.")}> <ListOrdered className="w-4 h-4"/> </button>
                        <span className="mx-1 h-4 w-px bg-zinc-300 dark:bg-zinc-600" />
                        <button type="button" title="Link" className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={makeLink}> <Link className="w-4 h-4"/> </button>
                      </div>
                      <button 
                        type="button" 
                        title="Hide toolbar"
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors" 
                        onClick={() => setShowToolbar(false)}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end mb-2">
                      <button 
                        type="button" 
                        title="Show toolbar"
                        className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors border bg-zinc-100/50 dark:bg-zinc-800/50" 
                        onClick={() => setShowToolbar(true)}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-16 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                      >
                        <Plus className="text-white dark:text-[#313338]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      align="start"
                      className="w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    >
                      <DropdownMenuItem
                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                        className="flex items-center gap-x-2 cursor-pointer"
                      >
                        <Paperclip className="h-4 w-4" />
                        <span>Add Attachment</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onOpen("createThread", { apiUrl, query })}
                        className="flex items-center gap-x-2 cursor-pointer"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Create Thread</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Textarea
                    ref={textareaRef}
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    disabled={isLoading}
                    className="px-14 py-3 min-h-[52px] max-h-[200px] bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 resize-y"
                    value={content}
                    onChange={(e) => field.onChange(e.target.value)}
                    onSelect={handleSelect}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="absolute top-16 right-8">
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
  );
};
