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
    // Get the base URL for Socket.IO connection
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    
    console.log('Connecting to Socket.IO at:', baseUrl);
    
    const socketInstance = new (ClientIO as any)(
      baseUrl,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
        // Performance optimizations with fallback
        transports: ['polling', 'websocket'], // Start with polling, upgrade to websocket
        upgrade: true, // Allow upgrade to WebSocket
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
        // Additional stability settings
        autoConnect: true,
        query: {},
        // WebSocket specific settings
        perMessageDeflate: false,
        // Connection strategy
        upgradeTimeout: 10000,
        maxHttpBufferSize: 1e6,
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
      console.error("Error details:", {
        message: error.message,
        description: error.description,
        context: error.context,
        type: error.type
      });
      setIsConnected(false);
    });

    socketInstance.on("reconnect", (attemptNumber: number) => {
      console.log("Socket reconnected after", attemptNumber, "attempts");
      setIsConnected(true);
    });

    socketInstance.on("reconnect_error", (error: any) => {
      console.error("Socket reconnection error:", error);
    });

    socketInstance.on("connect_timeout", () => {
      console.error("Socket connection timeout");
      setIsConnected(false);
    });

    socketInstance.on("error", (error: any) => {
      console.error("Socket general error:", error);
      setIsConnected(false);
    });

    socketInstance.on("upgrade", () => {
      console.log("Socket transport upgraded to WebSocket");
    });

    socketInstance.on("upgradeError", (error: any) => {
      console.error("Socket upgrade error:", error);
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
