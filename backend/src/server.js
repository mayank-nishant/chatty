import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Absolute path setup
const __dirname = path.resolve();

// Frontend build path
const frontendPath = path.join(__dirname, "../frontend/dist");

// Serve frontend static files
app.use(express.static(frontendPath));

// Catch-all route for React/Vite frontend
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
