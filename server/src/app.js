import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

export default app;
