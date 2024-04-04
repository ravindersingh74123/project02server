import path from "path";
import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

import cors from "cors";
import { Course } from "./models/model-lost&.js";
import User from "./models/user.model.js";

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
import multer, { diskStorage } from "multer";
app.use(express.static("public"));

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(
      null,
      file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
app.post("/server1/todo", upload.single("image"), async function (req, res) {
  const createPayload = req.body;
  const imageName = req.file.filename;

  // put it in mongodb
  await Course.create({
    title: createPayload.title,
    name: createPayload.name,
    image: imageName,
  });
  res.json({
    msg: "Todo created",
  });
});

app.get("/todos", async function (req, res) {
  try {
    // Fetch all todos from the database
    const todos = await Course.find();

    // Send the todos as a JSON response
    res.json({
      todos,
    });
  } catch (error) {
    // If an error occurs during database query or processing
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});

// import path from "path";
// import express from "express";
// import multer from "multer";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import connectToMongoDB from "./db/connectToMongoDB.js";
// import { app, server } from "./socket/socket.js";
// import { Course } from "./models/title.js";
// import User from "./models/user.model.js";

// const __dirname = path.resolve();

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// // Initialize express app

// // Middleware
// app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
// app.use(cookieParser());
// app.use(cors());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// // Serve static files from the frontend build directory
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // File upload route using multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post("/server1/todo", upload.single("image"), async (req, res) => {
//   try {
//     const { title, name } = req.body;
//     const image = {
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     };

//     // Create a new Todo object and save it to the database
//     const newTodo = new Course({
//       title,
//       name,
//       image,
//     });
//     await newTodo.save();

//     res.json({ success: true, message: "Todo added successfully" });
//   } catch (error) {
//     console.error("Error adding todo:", error);
//     res.status(500).json({ success: false, error: "Failed to add todo" });
//   }
// });

// // Fetch all todos
// app.get("/todos", async (req, res) => {
//     try {
//         const todos = await Course.find();
//         res.json({ todos });
//     } catch (error) {
//         console.error("Error fetching todos:", error);
//         res.status(500).json({ error: "Failed to fetch todos" });
//     }
// });

// // Fetch user details by userId
// app.get('/users/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error("Error fetching user details:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // Catch-all route to serve the frontend index.html
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// // Start server
// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server Running on port ${PORT}`);
// });
