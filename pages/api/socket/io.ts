import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
export const config = {
  api: {
    bodyParser: false,
  },
};
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      // Performance and stability settings
      transports: ['polling', 'websocket'], // Start with polling, upgrade to websocket
      allowEIO3: true,
      cors: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
      // Connection settings
      pingTimeout: 60000,
      pingInterval: 25000,
      upgradeTimeout: 10000,
      maxHttpBufferSize: 1e6, // 1MB
      // WebSocket specific settings
      allowUpgrades: true,
      perMessageDeflate: false, // Disable compression for better performance
      httpCompression: true,
      // Additional stability settings
      connectTimeout: 45000,
      maxHttpBufferSize: 1e6,
    });
    
    // Add connection logging
    io.on("connection", (socket) => {
      console.log("Socket.IO client connected:", socket.id);
      
      socket.on("disconnect", (reason) => {
        console.log("Socket.IO client disconnected:", socket.id, "Reason:", reason);
      });
    });
    
    res.socket.server.io = io;
  }
  res.end();
};
export default ioHandler;
