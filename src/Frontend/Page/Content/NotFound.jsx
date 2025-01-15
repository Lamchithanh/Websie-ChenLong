import { useNavigate } from "react-router-dom";
import { Home, RefreshCw } from "lucide-react";
import styles from "../../Styles/NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <h1 className={styles.title404}>404</h1>

        <div className={styles.mainContent}>
          <h2 className={styles.heading}>Ôi không! Không tìm thấy trang</h2>
          <p className={styles.description}>
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
            không khả dụng.
          </p>

          <div className={styles.iconContainer}>
            <RefreshCw className="w-12 h-12 text-gray-400 animate-spin" />
            <Home className="w-12 h-12 text-gray-400 animate-pulse" />
          </div>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => navigate("/")}
              className={styles.primaryButton}
            >
              <Home className="w-5 h-5" />
              Về Trang Chủ
            </button>
            <button
              onClick={() => navigate(-1)}
              className={styles.secondaryButton}
            >
              <RefreshCw className="w-5 h-5" />
              Quay Lại
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Cần trợ giúp? Liên hệ với đội hỗ trợ của chúng tôi</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
