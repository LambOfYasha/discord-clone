"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Keep data fresh for 5 minutes
        staleTime: 5 * 60 * 1000,
        // Cache data for 10 minutes
        gcTime: 10 * 60 * 1000,
        // Retry failed requests 3 times
        retry: 3,
        // Refetch on window focus only if data is stale
        refetchOnWindowFocus: false,
        // Refetch on reconnect
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
      },
    },
  }));
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
