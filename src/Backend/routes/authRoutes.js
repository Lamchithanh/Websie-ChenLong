import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

const router = express.Router();

// Test route để kiểm tra API hoạt động
router.get("/test", (req, res) => {
  res.json({ message: "Auth API is working" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("=== New Login Attempt ===");
    console.log("Time:", new Date().toISOString());
    console.log("Login data:", { email, password });

    // Kiểm tra user trong database với email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    console.log("Database response:", users);

    if (users.length === 0) {
      console.log("User not found");
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    const user = users[0];
    console.log("Found user:", {
      id: user.id,
      email: user.email,
      username: user.username,
    });

    // So sánh mật khẩu
    const isValidPassword = password === user.password;
    console.log("Password validation:", {
      isValid: isValidPassword,
      provided: password,
      stored: user.password,
    });

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, username, email, full_name, role, status FROM users"
    );
    console.log("All users:", users); // Log ra terminal
    res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, full_name, phone } = req.body;
    console.log("Register attempt:", { username, email, full_name, phone });

    // Kiểm tra username, email và phone đã tồn tại chưa
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?",
      [username, email, phone]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập, email hoặc số điện thoại đã tồn tại",
      });
    }

    // Thêm user mới với số điện thoại
    const [result] = await db.query(
      `INSERT INTO users (username, email, password, full_name, phone) 
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, password, full_name, phone]
    );

    console.log("User created:", result.insertId);

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
});

export default router;
