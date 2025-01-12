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

    const [products] = await db.query(`
      SELECT 
        p.*,
        pi.image_url,
        c.name as category_name
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
      AND (pi.is_thumbnail = 1 OR pi.is_thumbnail IS NULL)  /* Lấy ảnh thumbnail */
      ORDER BY p.created_at DESC
    `);

    console.log(`Found ${products.length} products`);

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm nào",
      });
    }

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error in GET /products:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
});

// Get specifications by product ID
router.get("/products/:id/specifications", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching specifications for product ID:", id);

    // Kiểm tra bảng có tồn tại không
    const [tables] = await db.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = 'WebSite_Chenglong' 
      AND TABLE_NAME = 'specifications'
    `);

    if (tables.length === 0) {
      console.error("Table specifications does not exist");
      return res.status(500).json({
        success: false,
        message: "Lỗi cấu trúc database",
      });
    }

    // Kiểm tra sản phẩm tồn tại
    const [product] = await db.query("SELECT id FROM products WHERE id = ?", [
      id,
    ]);

    if (!product || product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Lấy thông số kỹ thuật
    const [specifications] = await db.query(
      `SELECT * FROM specifications WHERE product_id = ?`,
      [id]
    );

    if (!specifications || specifications.length === 0) {
      return res.json({
        success: true,
        data: {
          class: "Chưa có thông tin",
          used_for: "Chưa có thông tin",
          max_horsepower: "Chưa có thông tin",
          peak_torque: "Chưa có thông tin",
          front_axle_suspension: "Chưa có thông tin",
          rear_axle_suspension: "Chưa có thông tin",
          sleeper: "Chưa có thông tin",
        },
      });
    }

    res.json({
      success: true,
      data: specifications[0],
    });
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    });

    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông số kỹ thuật",
      error: error.message,
      details: {
        code: error.code,
        sqlMessage: error.sqlMessage,
      },
    });
  }
});

// Thêm thông số kỹ thuật cho sản phẩm
router.post("/products/:id/specifications", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      class: truckClass,
      used_for,
      max_horsepower,
      peak_torque,
      front_axle_suspension,
      rear_axle_suspension,
      sleeper,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO product_specifications 
       (product_id, class, used_for, max_horsepower, peak_torque, 
        front_axle_suspension, rear_axle_suspension, sleeper)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        truckClass,
        used_for,
        max_horsepower,
        peak_torque,
        front_axle_suspension,
        rear_axle_suspension,
        sleeper,
      ]
    );

    res.json({
      success: true,
      message: "Thêm thông số kỹ thuật thành công",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error("Error adding specifications:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi thêm thông số kỹ thuật",
      error: error.message,
    });
  }
});

// Cập nhật thông số kỹ thuật
router.put("/products/:id/specifications", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      class: truckClass,
      used_for,
      max_horsepower,
      peak_torque,
      front_axle_suspension,
      rear_axle_suspension,
      sleeper,
    } = req.body;

    await db.query(
      `UPDATE product_specifications 
       SET class = ?, used_for = ?, max_horsepower = ?, peak_torque = ?,
           front_axle_suspension = ?, rear_axle_suspension = ?, sleeper = ?
       WHERE product_id = ?`,
      [
        truckClass,
        used_for,
        max_horsepower,
        peak_torque,
        front_axle_suspension,
        rear_axle_suspension,
        sleeper,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Cập nhật thông số kỹ thuật thành công",
    });
  } catch (error) {
    console.error("Error updating specifications:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật thông số kỹ thuật",
      error: error.message,
    });
  }
});

// Get product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching product details for ID:", id);

    // Lấy thông tin sản phẩm và hình ảnh
    const [products] = await db.query(
      `SELECT p.*, c.name as category_name, b.name as brand_name,
        GROUP_CONCAT(pi.image_url) as images
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id 
       LEFT JOIN brands b ON p.brand_id = b.id
       LEFT JOIN product_images pi ON p.id = pi.product_id
       WHERE p.id = ?
       GROUP BY p.id`,
      [id]
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Format lại dữ liệu sản phẩm
    const product = {
      ...products[0],
      images: products[0].images ? products[0].images.split(",") : [],
    };

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin sản phẩm",
      error: error.message,
    });
  }
});

export default router;
