import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import jobAppRoutes from "./routes/jobAppRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import settings from "./routes/settings.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

connect();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://jobcompass-frontend.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/jobapp", jobAppRoutes);
app.use("/api", analyticsRoutes);
app.use("/api/settings", settings); // Prefixing the settings route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
