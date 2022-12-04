import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { PeerServer } from "peer";

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
PeerServer({
  path: "/peer",
  port: 443,
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, username) => {
    console.log("room -->", roomId);
    console.log("user -->", userId);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId, username);
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId, username);
    });
    socket.on("chat", (content) => {
      socket.broadcast.to(roomId).emit("new-message", content);
    });
  });
});

const port = 3000;
server.listen(process.env.PORT || port, () => {
  console.log("rondando em http://localhost:" + process.env.PORT || port);
});
