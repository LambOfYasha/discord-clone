"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
        // Performance optimizations
        transports: ['websocket'], // Force WebSocket for better performance
        upgrade: false, // Disable polling upgrade
        rememberUpgrade: true, // Remember WebSocket preference
        timeout: 20000, // Connection timeout
        forceNew: false, // Reuse existing connections
        // Reconnection settings
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        // Buffer settings
        maxReconnectionAttempts: 5,
        // Ping/pong for connection health
        pingTimeout: 60000,
        pingInterval: 25000,
      }
    );

    socketInstance.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason: string) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error: any) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    socketInstance.on("reconnect", (attemptNumber: number) => {
      console.log("Socket reconnected after", attemptNumber, "attempts");
      setIsConnected(true);
    });

    socketInstance.on("reconnect_error", (error: any) => {
      console.error("Socket reconnection error:", error);
    });

    setSocket(socketInstance);

    return () => {
      console.log("Cleaning up socket connection");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
