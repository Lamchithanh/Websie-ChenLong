import { useNavigate } from "react-router-dom";
import { Home, RefreshCw, Mail } from "lucide-react";
import styles from "../../Styles/NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* 404 Title with decorative elements */}
        <div className={styles.relativeWrapper}>
          <h1 className={styles.title}>404</h1>
          <div className={styles.imageWrapper}>
            <img
              src="/api/placeholder/96/96"
              alt="404 illustration"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.contentWrapper}>
          {/* Main Content */}
          <div>
            <h2 className={styles.subtitle}>Ôi không! Không tìm thấy trang</h2>
            <p className={styles.description}>
              Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
              không khả dụng.
            </p>
          </div>

          {/* Animated Icons */}
          <div className={styles.iconWrapper}>
            <RefreshCw className={styles.spinIcon} />
            <Home className={styles.bounceIcon} />
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button onClick={() => navigate("/")} className={styles.homeButton}>
              <Home className={styles.icon} />
              <span>Về Trang Chủ</span>
            </button>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              <RefreshCw className={styles.icon} />
              <span>Quay Lại</span>
            </button>
          </div>

          {/* Help Section */}
          <div className={styles.helpSection}>
            <p className={styles.helpText}>
              <Mail className={styles.icon} />
              Cần trợ giúp? Liên hệ với đội hỗ trợ của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
