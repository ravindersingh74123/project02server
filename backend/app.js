import express from "express";

import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const roomSockets = {};

io.on("connection", (socket) => {
  console.log("Client connected: " + socket.id);

  socket.on("join-room", (roomIndex) => {
    // Join the room corresponding to the card index
    socket.join(roomIndex);

    // Maintain a mapping of room index to connected sockets
    if (!roomSockets[roomIndex]) {
      roomSockets[roomIndex] = [];
    }
    roomSockets[roomIndex].push(socket);
    console.log(roomIndex);
  });

  socket.on("message", (data) => {
    // Broadcast the message to everyone in the room corresponding to the message's room
    io.to(data.room).emit("receive-message", {
      text: data.text,
      sender: data.sender,
      room: data.room,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
    // Remove the disconnected socket from the roomSockets mapping
    for (const roomIndex in roomSockets) {
      roomSockets[roomIndex] = roomSockets[roomIndex].filter(
        (sock) => sock.id !== socket.id
      );
    }
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
