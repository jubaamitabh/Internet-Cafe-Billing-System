require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const initSocketHelper = require("./src/services/socketService");

const app = express();
const server = http.createServer(app);

// Inisialisasi Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Dalam production, batasi origin ke URL Front-End
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Load auth controller (dummy route example)
const authController = require("./src/controllers/authController");
app.post("/api/login", authController.login);

// Setup Socket logic
initSocketHelper(io);

// Cek status server
app.get("/api/status", (req, res) => {
  res.json({ message: "Billing API is running smoothly." });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[SERVER] Backend is running on port ${PORT}`);
});
