"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Users, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import { ThreadView } from "./thread-view";
import { Member, Profile } from "@prisma/generated/postgres";

interface Thread {
  id: string;
  name: string;
  messageCount: number;
  createdAt: string;
  parentMessageId?: string;
}

interface ThreadsListProps {
  channelId: string;
  serverId: string;
  currentMember: Member & {
    profile: Profile;
  };
}

export const ThreadsList = ({ channelId, serverId, currentMember }: ThreadsListProps) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  const fetchThreads = async () => {
    try {
      const response = await axios.get(`/api/threads?channelId=${channelId}`);
      setThreads(response.data || []);
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [channelId]);

  // Refresh threads when the page is focused (in case a new thread was created)
  useEffect(() => {
    const handleFocus = () => {
      fetchThreads();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [channelId]);

  const handleEditThread = (threadId: string, newName: string) => {
    setThreads(prev => prev.map(thread => 
      thread.id === threadId ? { ...thread, name: newName } : thread
    ));
  };

  const handleDeleteThread = (threadId: string) => {
    setThreads(prev => prev.filter(thread => thread.id !== threadId));
    if (selectedThread?.id === threadId) {
      setSelectedThread(null);
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          title="Expand threads"
        >
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </button>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <MessageSquare className="h-4 w-4 text-zinc-500" />
          <span className="text-xs text-zinc-500">{threads.length}</span>
        </div>
      </div>
    );
  }

  if (selectedThread) {
    return (
      <div className="w-80 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 flex flex-col">
        <div className="flex items-center justify-between p-2 border-b border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setSelectedThread(null)}
            className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            title="Back to threads"
          >
            <ChevronLeft className="h-4 w-4 text-zinc-500" />
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            title="Collapse sidebar"
          >
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </button>
        </div>
        <div className="flex-1">
          <ThreadView
            threadId={selectedThread.id}
            channelId={channelId}
            serverId={serverId}
            currentMember={currentMember}
            threadName={selectedThread.name}
            onClose={() => setSelectedThread(null)}
            onEditThread={handleEditThread}
            onDeleteThread={handleDeleteThread}
          />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-80 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Threads</h3>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            title="Collapse sidebar"
          >
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </button>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="text-sm text-zinc-500">Loading threads...</div>
        </div>
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="w-80 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Threads</h3>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            title="Collapse sidebar"
          >
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-8 text-center flex-1">
          <MessageSquare className="h-8 w-8 text-zinc-400 mb-2" />
          <p className="text-sm text-zinc-500 mb-1">No threads yet</p>
          <p className="text-xs text-zinc-400">
            Create a thread to start a focused discussion
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Threads</h3>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          title="Collapse sidebar"
        >
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </button>
      </div>
      <div className="space-y-2 p-4 flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition cursor-pointer"
            onClick={() => setSelectedThread(thread)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-x-2">
                <MessageSquare className="h-4 w-4 text-zinc-500" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {thread.name}
                </span>
              </div>
              <div className="flex items-center gap-x-4 mt-1">
                <span className="text-xs text-zinc-500">
                  {thread.messageCount} messages
                </span>
                <span className="text-xs text-zinc-500">
                  Created {format(new Date(thread.createdAt), "MMM d")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-1 text-xs text-zinc-500">
              <Users className="h-3 w-3" />
              <span>1</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
