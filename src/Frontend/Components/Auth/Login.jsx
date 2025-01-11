import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        setError(data.message || "Đăng nhập thất bại");
        toast.error(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Có lỗi xảy ra khi đăng nhập");
      toast.error("Có lỗi xảy ra khi đăng nhập");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Đăng nhập</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email của bạn"
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
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Đăng nhập
          </button>
        </form>
        <div className={styles.forgotPassword}>
          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
