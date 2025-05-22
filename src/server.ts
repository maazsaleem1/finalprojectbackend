import app from "./app";
import { PORT } from "./config/environment";
import fs from "fs";
import { Server } from "socket.io";
import http from "http";

const SERVER_PORT = PORT || 5000;

async function startServer() {
  try {
    let createServer: any;
      createServer = http.createServer(app);
      const io = new Server(createServer, {
        cors: {
          origin: "*", 
          methods: ["GET", "POST"],
        },
      });
      createServer.listen(SERVER_PORT, () => {
        console.log(`HTTP server running on port ${SERVER_PORT}`);
      });
    
  } catch (err) {
    console.error("Error starting the server:", err);
  }
}

startServer();
