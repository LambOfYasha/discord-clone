"use client";
import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  paramKey: "channelId" | "conversationId" | "roomId";
  apiUrl: string;
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  paramKey,
  apiUrl,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();
  const fetchMessages = async ({ pageParam = undefined }) => {
    const query: any = {
      cursor: pageParam,
    };
    
    // Only add paramKey if it's not roomId (since roomId is already in the URL)
    if (paramKey !== "roomId") {
      query[paramKey] = paramValue;
    }
    
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query,
      },
      { skipNull: true }
    );
    const res = await fetch(url, {
      credentials: 'include',
    });
    return res.json();
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: 1000,
      initialPageParam: undefined,
    });
  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
