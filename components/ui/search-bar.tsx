"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";

interface SearchFilter {
  label: string;
  value: string;
  count?: number;
}

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  filters?: SearchFilter[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
  showKeyboardShortcut?: boolean;
  className?: string;
}

export const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  filters,
  selectedFilter,
  onFilterChange,
  showKeyboardShortcut = true,
  className = ""
}: SearchBarProps) => {
  const [inputId] = useState(() => `search-input-${Math.random().toString(36).substr(2, 9)}`);

  // Keyboard shortcut for search (Ctrl+F)
  useEffect(() => {
    if (!showKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById(inputId);
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputId, showKeyboardShortcut]);

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  const hasFilters = filters && filters.length > 0;
  const hasSearchOrFilters = value || (selectedFilter && selectedFilter !== "all");

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id={inputId}
          placeholder={showKeyboardShortcut ? `${placeholder} (Ctrl+F)` : placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10 bg-[#1E1F22] border-[#1E1F22] text-white placeholder:text-gray-400"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Search Filters */}
      {hasFilters && hasSearchOrFilters && (
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">Filter:</span>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange?.(filter.value)}
              className="h-6 text-xs"
            >
              {filter.label}
              {filter.count !== undefined && (
                <span className="ml-1 text-xs opacity-70">({filter.count})</span>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
