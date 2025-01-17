import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password, // Được hash tại backend
          full_name: formData.fullName,
          phone: formData.phone,
        }),
      });

      console.log("Payload sent to API:", {
        username: formData.username,
        email: formData.email,
        password: formData.password, // Kiểm tra mật khẩu trước khi gửi
        full_name: formData.fullName,
        phone: formData.phone,
      });

      const data = await response.json();

      if (response.ok) {
        // Chuyển đến trang đăng nhập sau khi đăng ký thành công
        navigate("/login");
      } else {
        setError(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Có lỗi xảy ra khi đăng ký");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Đăng ký tài khoản</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
              minLength="6"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Nhập số điện thoại"
              pattern="[0-9]{10}"
              title="Số điện thoại phải có 10 chữ số"
            />
          </div>

          <button type="submit" className={styles.registerButton}>
            Đăng ký
          </button>
        </form>
        <div className={styles.loginLink}>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
