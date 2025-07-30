"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isSearching: boolean;
}

export const MessageSearch = ({
  onSearch,
  onClear,
  isSearching,
}: MessageSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
      <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="pl-10 bg-zinc-200/90 dark:bg-zinc-700/75 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isSearching}
          />
        </div>
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={isSearching}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={!query.trim() || isSearching}
          className="bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Search
        </Button>
      </form>
    </div>
  );
}; 