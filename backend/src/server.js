import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const __dirname = path.resolve();

const frontendPath = path.join(__dirname, "frontend/dist");
const indexPath = path.join(frontendPath, "index.html");

console.log("ROOT:", __dirname);
console.log("FRONTEND PATH:", frontendPath);
console.log("INDEX PATH:", indexPath);
console.log("INDEX EXISTS:", fs.existsSync(indexPath));

app.use(express.static(frontendPath));

app.get("/{*any}", (req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
