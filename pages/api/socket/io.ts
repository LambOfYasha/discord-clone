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
    
    // Get the origin for CORS
    const getOrigin = () => {
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
      }
      if (process.env.APP_URL) {
        return process.env.APP_URL;
      }
      return "http://localhost:3000";
    };
    
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      // Performance and stability settings
      transports: ['polling', 'websocket'], // Start with polling, upgrade to websocket
      allowEIO3: true,
      cors: {
        origin: getOrigin(),
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
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
      // Error handling
      handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
          "Access-Control-Allow-Origin": getOrigin(),
          "Access-Control-Allow-Methods": "GET,POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true"
        });
        res.end();
      },
    });
    
    // Add connection logging
    io.on("connection", (socket) => {
      console.log("Socket.IO client connected:", socket.id);
      
      socket.on("disconnect", (reason) => {
        console.log("Socket.IO client disconnected:", socket.id, "Reason:", reason);
      });
      
      socket.on("error", (error) => {
        console.error("Socket.IO client error:", socket.id, "Error:", error);
      });
    });
    
    // Add server error handling
    io.engine.on("connection_error", (err) => {
      console.error("Socket.IO connection error:", err);
    });
    
    res.socket.server.io = io;
  }
  res.end();
};
export default ioHandler;
