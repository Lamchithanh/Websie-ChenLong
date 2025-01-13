import express from "express";
import db from "../config/db.js";

const router = express.Router();

// API test kết nối
router.get("/test-connection", async (req, res) => {
  try {
    const [result] = await db.query("SELECT 1");
    res.json({
      success: true,
      message: "Kết nối database thành công",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi kết nối database:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi kết nối database",
      error: error.message,
    });
  }
});

// // API lấy danh sách sản phẩm
// router.get("/products", async (req, res) => {
//   try {
//     const [products] = await db.query(`
//       SELECT
//         p.id,
//         p.name,
//         p.slug as model,
//         p.price,
//         p.short_description,
//         p.description,
//         p.thumbnail as image_url,
//         p.status,
//         c.name as category_name,
//         b.name as brand_name
//       FROM products p
//       LEFT JOIN categories c ON p.category_id = c.id
//       LEFT JOIN brands b ON p.brand_id = b.id
//       WHERE p.status = 'active'
//       ORDER BY p.id DESC
//     `);

//     res.json({
//       success: true,
//       data: products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       success: false,
//       message: "Lỗi khi lấy danh sách sản phẩm",
//       error: error.message,
//     });
//   }
// });

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

// Thêm route để lấy danh sách xe theo category
router.get("/trucks", async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT 
        p.*,
        GROUP_CONCAT(pi.image_url) as images,
        c.name as category_name
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
    `;

    if (category && category !== "All") {
      query += ` AND c.name = ?`;
    }

    query += ` GROUP BY p.id ORDER BY p.created_at DESC`;

    const [trucks] = await db.query(
      query,
      category !== "All" ? [category] : []
    );

    // Format lại dữ liệu để phù hợp với component
    const formattedTrucks = trucks.map((truck) => ({
      model: truck.model,
      src: truck.images ? truck.images.split(",")[0] : null,
      name: truck.name,
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

// Thêm route mới để lấy danh sách categories có sản phẩm
router.get("/truck-categories", async (req, res) => {
  try {
    const [categories] = await db.query(`
      SELECT DISTINCT 
        c.name,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
      GROUP BY c.name
      HAVING product_count > 0
      ORDER BY c.name = 'All' DESC, c.name ASC
    `);

    res.json({
      success: true,
      data: ["All", ...categories.map((cat) => cat.name)],
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách danh mục",
      error: error.message,
    });
  }
});

export default router;
