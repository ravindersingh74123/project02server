import express from "express";
 import { WebSocketServer } from 'ws'
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const secretKeyJWT = "asdasdsadasdasdasdsa";
const port = 8000;

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

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/login", (req, res) => {
//   const token = jwt.sign({ _id: "asdasjdhkasdasdas" }, secretKeyJWT);

//   res
//     .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
//     .json({
//       message: "Login Success",
//     });
// });

// io.use((socket, next) => {
//   cookieParser()(socket.request, socket.request.res, (err) => {
//     if (err) return next(err);

//     const token = socket.request.cookies.token;
//     if (!token) return next(new Error("Authentication Error"));

//     const decoded = jwt.verify(token, secretKeyJWT);
//     next();
//   });
// });




// io.on("connection", (socket) => {
  
//   socket.on("join-room", (room) => {
//     console.log(room)
//     socket.join(room);
//   });
//   socket.on("message", ({messageInput,Index,name}) => {
   
//     // Broadcast the message to everyone in the room corresponding to the message's room
//     console.log(name)
//     socket.to(Index).emit("receive-message", name,messageInput);
//   });
  
//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// // io.on("connection", (socket) => {
// //   console.log("User Connected", socket.id);

// //   socket.on("message", ({ message ,room}) => {
 
// //     // socket.to(room).emit("receive-message", message);
// //     io.emit("receive-message", message);
    
// //     io.emit("receive", room);
// //   });

  

  
// // });

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("join-room", (roomId) => {
//     console.log(`User ${socket.id} joined room ${roomId}`);
//     socket.join(roomId);
//   });

//   socket.on("message", (data) => {
//     console.log("Message received:", data);
//     io.to(data.room).emit("receive-message", {
//       text: data.text,
//       sender: data.sender,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });





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
    console.log(roomIndex)
  });
  

  socket.on("message", (data) => {
    // Broadcast the message to everyone in the room corresponding to the message's room
    io.to(data.room).emit("receive-message", {
      text: data.text,
      sender: data.sender,
      room:data.room
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



