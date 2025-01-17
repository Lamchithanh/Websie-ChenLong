import express from "express";
import db from "../config/db.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép tải lên file hình ảnh!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Serve static files from uploads directory
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Upload avatar endpoint
router.post(
  "/customer/profile/avatar",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID không được cung cấp",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Không có file được tải lên",
        });
      }

      // Create URL-friendly path for database and response
      const avatarPath = `/api/uploads/${path.basename(req.file.path)}`;

      // Update avatar path in database
      await db.query("UPDATE customers SET avatar = ? WHERE user_id = ?", [
        avatarPath,
        userId,
      ]);

      // Return success response with the file path
      res.json({
        success: true,
        message: "Tải lên ảnh đại diện thành công",
        avatarPath: avatarPath,
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi tải lên ảnh đại diện",
        error: error.message,
      });
    }
  }
);

export default router;
