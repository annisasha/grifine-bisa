import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"; // Pastikan chatRoutes sudah diimpor dengan benar

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();  // Pastikan koneksi ke DB berhasil sebelum menjalankan server

// Routes
app.use("/api", authRoutes);
app.use("/api", chatRoutes);  // Pastikan rute ini benar

// Menjalankan server setelah koneksi ke database berhasil
const PORT = process.env.PORT || 5000; // Set port dari environment variable, jika tidak default ke 5000
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

export default app;  // Ekspor default
