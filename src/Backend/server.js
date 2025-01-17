import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import uploadsRoutes from "./routes/uploadsRoutes.js";

// Lấy __dirname trong ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files từ thư mục uploads
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);
app.use("/api", uploadsRoutes);

const port = process.env.VITE_PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
