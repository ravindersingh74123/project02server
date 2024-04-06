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
import { Resell } from "./models/model-resell.js";
import { Travel } from "./models/model-travel.js";
import { Business } from "./models/model-business.js";
import { Course } from "./models/model-lost&.js";
import User from "./models/user.model.js";

app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT ;

const __dirname = path.resolve();



app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


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
app.post("/server1/resell", upload.single("image"), async function (req, res) {
  const createPayload = req.body;
  const imageName = req.file.filename;

  // put it in mongodb
  await Resell.create({
    title: createPayload.title,
    name: createPayload.name,
    price:createPayload.price,
    image: imageName,
  });
  res.json({
    msg: "Todo created",
  });
});
app.post("/server1/lost", upload.single("image"), async function (req, res) {
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
app.post("/server1/travel", async function (req, res) {
  const createPayload = req.body;
  

  // put it in mongodb
  await Travel.create({
    destination: createPayload.destination,
    user: createPayload.user,
    date:createPayload.date,
    
  });
  res.json({
    msg: "Todo created",
  });
});
app.post("/server1/business", async function (req, res) {
  const createPayload = req.body;
  

  // put it in mongodb
  await Business.create({
    businessName: createPayload.businessName,
    user: createPayload.user,
    details:createPayload.details,
    
  });
  res.json({
    msg: "Todo created",
  });
});


app.get("/lost", async function (req, res) {
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
app.get("/business", async function (req, res) {
  try {
    // Fetch all todos from the database
    const todos = await Business.find();

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
app.get("/resell", async function (req, res) {
  try {
    // Fetch all todos from the database
    const todos = await Resell.find();

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
app.get("/travel", async function (req, res) {
  try {
    // Fetch all todos from the database
    const todos = await Travel.find();

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
app.use(express.static(path.join(__dirname, "/backend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "backend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});

