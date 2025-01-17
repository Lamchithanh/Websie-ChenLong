import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Lấy thông tin khách hàng
router.get("/customer/profile", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({
        success: false,
        message: "User ID không hợp lệ",
      });
    }

    const userIdInt = parseInt(userId);

    const [customers] = await db.query(
      `SELECT 
        c.id,
        c.avatar,
        c.phone,
        c.id_card,
        c.address,
        u.full_name,
        u.email
      FROM customers c 
      JOIN users u ON c.user_id = u.id 
      WHERE u.id = ?`,
      [userIdInt]
    );

    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin khách hàng",
      });
    }

    const customer = customers[0];
    let addressObject = {
      streetAddress: "",
      ward: "",
      district: "",
      province: "",
    };

    try {
      if (customer.address) {
        addressObject = JSON.parse(customer.address);
      }
    } catch (error) {
      console.error("Error parsing address:", error);
    }

    res.json({
      success: true,
      data: {
        personalInfo: {
          fullName: customer.full_name || "",
          email: customer.email || "",
          phone: customer.phone || "",
          idCard: customer.id_card || "",
          avatar: customer.avatar || "",
        },
        address: addressObject,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
});

// Cập nhật hoặc thêm mới thông tin khách hàng
router.put("/customer/profile", async (req, res) => {
  try {
    const { userId } = req.query;
    const { personalInfo = {}, address = {} } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID không được cung cấp",
      });
    }

    // Chuyển đổi dữ liệu address sang JSON string
    const addressJSON = JSON.stringify({
      streetAddress: address.streetAddress || "",
      ward: address.ward || "",
      district: address.district || "",
      province: address.province || "",
    });

    // Cập nhật hoặc thêm mới thông tin trong bảng customers
    await db.query(
      `INSERT INTO customers (user_id, phone, id_card, address, avatar) 
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         phone = VALUES(phone),
         id_card = VALUES(id_card),
         address = VALUES(address),
         avatar = VALUES(avatar)`,
      [
        userId,
        personalInfo.phone || null,
        personalInfo.idCard || null,
        addressJSON,
        personalInfo.avatar || null,
      ]
    );

    // Cập nhật full_name trong bảng users
    if (personalInfo.fullName) {
      await db.query(
        `UPDATE users 
         SET full_name = ?
         WHERE id = ?`,
        [personalInfo.fullName, userId]
      );
    }

    res.json({
      success: true,
      message: "Cập nhật thông tin thành công",
    });
  } catch (error) {
    console.error("Error updating customer profile:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
});

export default router;
