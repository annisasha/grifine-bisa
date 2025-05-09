import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// Konfigurasi CORS dengan opsi yang lebih spesifik
const corsOptions = {
  origin: 'https://grifine.vercel.app',  // Ganti dengan URL frontend kamu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions)); // Gunakan CORS dengan konfigurasi
app.use(express.json());     // Untuk parsing request body

// Database Connection
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", chatRoutes);

export default app;
