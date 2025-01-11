import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Products API is working" });
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    console.log("API called: GET /products");

    const [products] = await db.query("SELECT * FROM products");
    console.log(`Found ${products.length} products`);

    if (!products || products.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: "No products found",
      });
    }

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách sản phẩm",
      error: error.message,
    });
  }
});

export default router;
