import http from "http";
import express from "express";
import { Server } from "socket.io";
import "dotenv/config";

import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

if (!process.env.CLIENT_URL) {
  throw new Error("Missing required environment variable: CLIENT_URL");
}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId.toString()];
}

const emitOnlineUsers = () => {
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
};

io.on("connection", (socket) => {
  const userId = socket.userId?.toString();

  if (!userId) {
    socket.disconnect();
    return;
  }

  userSocketMap[userId] = socket.id;

  if (process.env.NODE_ENV === "development") {
    console.info(`User connected: ${socket.user?.fullName} (${userId})`);
  }

  emitOnlineUsers();

  socket.on("disconnect", () => {
    delete userSocketMap[userId];

    if (process.env.NODE_ENV === "development") {
      console.info(`User disconnected: ${socket.user?.fullName} (${userId})`);
    }

    emitOnlineUsers();
  });
});

export { io, app, server };
