import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { ExpressPeerServer, PeerServer } from "peer";

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
  port: 443,
  path: "/peer",
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

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("rondando em http://localhost:" + port);
});
