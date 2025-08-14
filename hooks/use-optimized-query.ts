"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface OptimizedQueryOptions {
  staleTime?: number;
  gcTime?: number;
  retry?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
}

interface OptimizedMutationOptions {
  retry?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useOptimizedQuery = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options: OptimizedQueryOptions = {}
) => {
  const {
    staleTime = 5 * 60 * 1000, // 5 minutes
    gcTime = 10 * 60 * 1000, // 10 minutes
    retry = 3,
    refetchOnWindowFocus = false,
    refetchOnReconnect = true,
  } = options;

  return useQuery({
    queryKey,
    queryFn,
    staleTime,
    gcTime,
    retry,
    refetchOnWindowFocus,
    refetchOnReconnect,
  });
};

export const useOptimizedMutation = <T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options: OptimizedMutationOptions = {}
) => {
  const queryClient = useQueryClient();
  const { retry = 1, onSuccess, onError } = options;

  return useMutation({
    mutationFn,
    retry,
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["servers"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      onSuccess?.(data);
    },
    onError,
  });
};

// Prefetch hook for critical data
export const usePrefetchQuery = () => {
  const queryClient = useQueryClient();

  const prefetchUserData = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: ["profile"],
      queryFn: () => fetch("/api/current-user").then((res) => res.json()),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);

  const prefetchServers = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: ["servers"],
      queryFn: () => fetch("/api/servers").then((res) => res.json()),
      staleTime: 2 * 60 * 1000,
    });
  }, [queryClient]);

  return { prefetchUserData, prefetchServers };
};

// Optimized infinite query for messages
export const useOptimizedInfiniteQuery = <T>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam?: any }) => Promise<T>,
  options: OptimizedQueryOptions = {}
) => {
  const {
    staleTime = 2 * 60 * 1000, // 2 minutes for messages
    gcTime = 5 * 60 * 1000, // 5 minutes
    retry = 2,
    refetchOnWindowFocus = false,
    refetchOnReconnect = true,
  } = options;

  return useQuery({
    queryKey,
    queryFn,
    staleTime,
    gcTime,
    retry,
    refetchOnWindowFocus,
    refetchOnReconnect,
  });
};
