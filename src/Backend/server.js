import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", productRoutes);

const port = process.env.VITE_PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
