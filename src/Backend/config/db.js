import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load biến môi trường
dotenv.config({ path: join(__dirname, "../../.env") });

// Tạo pool connection
const pool = mysql.createPool({
  host: process.env.VITE_DB_HOST,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASSWORD,
  database: process.env.VITE_DB_NAME,
  port: process.env.VITE_DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");

    // Test query để kiểm tra các bảng
    const [tables] = await connection.query("SHOW TABLES");
    console.log("Available tables:", tables);

    connection.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

// Thực hiện kiểm tra kết nối
checkConnection();

export default pool;
