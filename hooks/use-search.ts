import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseSearchOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
  filterFields?: Record<string, (item: T) => boolean>;
  debounceMs?: number;
  initialQuery?: string;
  initialFilter?: string;
}

interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  filteredData: T[];
  clearSearch: () => void;
  isSearching: boolean;
  searchStats: {
    total: number;
    filtered: number;
    hasResults: boolean;
  };
}

export function useSearch<T>({
  data,
  searchFields,
  filterFields = {},
  debounceMs = 300,
  initialQuery = "",
  initialFilter = "all"
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState(initialFilter);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Search function
  const searchInItem = useCallback((item: T, searchTerm: string): boolean => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    
    return searchFields.some(field => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      
      const stringValue = String(value).toLowerCase();
      return stringValue.includes(term);
    });
  }, [searchFields]);

  // Filter function
  const filterItem = useCallback((item: T, filterValue: string): boolean => {
    if (filterValue === "all" || !filterFields[filterValue]) return true;
    
    return filterFields[filterValue](item);
  }, [filterFields]);

  // Apply search and filter
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search
    if (debouncedQuery.trim()) {
      result = result.filter(item => searchInItem(item, debouncedQuery));
    }

    // Apply filter
    result = result.filter(item => filterItem(item, filter));

    return result;
  }, [data, debouncedQuery, filter, searchInItem, filterItem]);

  // Search statistics
  const searchStats = useMemo(() => ({
    total: data.length,
    filtered: filteredData.length,
    hasResults: filteredData.length > 0
  }), [data.length, filteredData.length]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery("");
    setFilter(initialFilter);
  }, [initialFilter]);

  return {
    query,
    setQuery,
    filter,
    setFilter,
    filteredData,
    clearSearch,
    isSearching,
    searchStats
  };
}

// Specialized hooks for common use cases
export function useFriendsSearch<T extends { profile: { name: string; email: string }; status?: string; statusText?: string }>(
  data: T[],
  options?: Partial<UseSearchOptions<T>>
) {
  return useSearch({
    data,
    searchFields: ['profile.name', 'profile.email', 'statusText'] as (keyof T)[],
    filterFields: {
      all: () => true,
      online: (item: T) => item.status === "online",
      offline: (item: T) => item.status !== "online"
    },
    ...options
  });
}

export function useRoomsSearch<T extends { 
  name?: string; 
  otherMember?: { profile: { name: string } }; 
  members?: Array<{ profile: { name: string } }>; 
  lastMessage?: string;
  type?: string;
}>(
  data: T[],
  options?: Partial<UseSearchOptions<T>>
) {
  return useSearch({
    data,
    searchFields: ['name', 'lastMessage'] as (keyof T)[],
    filterFields: {
      all: () => true,
      dm: (item: T) => item.type === "dm",
      group: (item: T) => item.type === "group"
    },
    ...options
  });
}

export function useRequestsSearch<T extends { 
  requesterProfile: { name: string; email: string }; 
  message?: string;
}>(
  data: T[],
  options?: Partial<UseSearchOptions<T>>
) {
  return useSearch({
    data,
    searchFields: ['requesterProfile.name', 'requesterProfile.email', 'message'] as (keyof T)[],
    filterFields: {
      all: () => true,
      messages: () => true, // This will be handled by the component logic
      friends: () => true   // This will be handled by the component logic
    },
    ...options
  });
}
