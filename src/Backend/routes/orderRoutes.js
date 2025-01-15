import express from "express";
import db from "../config/db.js";

const router = express.Router();

// API tạo yêu cầu tư vấn mới
router.post("/inquiries", async (req, res) => {
  try {
    const { name, email, phone, address, productId, message } = req.body;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // 1. Tạo hoặc cập nhật thông tin khách hàng
      const [customerResult] = await connection.execute(
        `INSERT INTO customers (name, email, phone, address)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         address = VALUES(address)`,
        [name, email, phone, address]
      );

      const customerId = customerResult.insertId;

      // 2. Tạo yêu cầu tư vấn
      await connection.execute(
        `INSERT INTO inquiries (customer_id, product_id, message)
         VALUES (?, ?, ?)`,
        [customerId, productId, message]
      );

      await connection.commit();
      connection.release();

      res.status(201).json({
        success: true,
        message: "Đã gửi yêu cầu tư vấn thành công",
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo yêu cầu tư vấn",
      error: error.message,
    });
  }
});

router.get("/trucks", async (req, res) => {
  try {
    const { category } = req.query;

    // Truy vấn cơ sở dữ liệu, bỏ cột "p.model"
    let query = `
      SELECT 
        p.id,
        p.name,
        p.thumbnail, 
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
    `;

    // Thêm điều kiện lọc theo danh mục nếu có
    if (category && category !== "All") {
      query += ` AND c.name = ?`;
    }

    query += ` ORDER BY p.created_at DESC`;

    // Thực hiện truy vấn
    const [trucks] = await db.query(
      query,
      category !== "All" ? [category] : []
    );

    // Format lại dữ liệu trả về
    const formattedTrucks = trucks.map((truck) => ({
      id: truck.id,
      name: truck.name,
      thumbnail: truck.thumbnail,
      category: truck.category_name,
    }));

    res.json({
      success: true,
      data: formattedTrucks,
    });
  } catch (error) {
    console.error("Error fetching trucks:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách xe",
      error: error.message,
    });
  }
});

router.get("/truck-categories", async (req, res) => {
  try {
    const [categories] = await db.query(`
      SELECT id, name 
      FROM categories
      ORDER BY created_at ASC
    `);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh mục",
    });
  }
});

export default router;
