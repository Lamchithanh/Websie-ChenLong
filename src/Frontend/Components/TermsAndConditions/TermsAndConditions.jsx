import PropTypes from "prop-types";
import styles from "./TermsAndConditions.module.scss";

const TermsAndConditions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Điều Khoản và Điều Kiện</h2>
          <button className={styles.closeButton} onClick={onClose} title="Đóng">
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.section}>
            <h3>1. Điều Khoản Chung</h3>
            <p>
              Bằng cách đặt hàng trên website của chúng tôi, bạn đồng ý với các
              điều khoản và điều kiện sau đây.
            </p>
          </div>

          <div className={styles.section}>
            <h3>2. Đặt Hàng và Thanh Toán</h3>
            <ul>
              <li>Đơn hàng chỉ được xác nhận khi bạn điền đầy đủ thông tin.</li>
              <li>
                Chúng tôi có quyền từ chối hoặc hủy đơn hàng vì bất kỳ lý do gì.
              </li>
              <li>
                Giá cả và thông tin sản phẩm có thể thay đổi mà không cần báo
                trước.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>3. Vận Chuyển và Giao Hàng</h3>
            <ul>
              <li>
                Thời gian giao hàng có thể thay đổi tùy thuộc vào địa điểm và
                điều kiện vận chuyển.
              </li>
              <li>
                Khách hàng có trách nhiệm kiểm tra hàng hóa khi nhận hàng.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>4. Bảo Hành và Đổi Trả</h3>
            <ul>
              <li>Sản phẩm được bảo hành theo chính sách của nhà sản xuất.</li>
              <li>
                Quy trình đổi trả tuân theo quy định của công ty và pháp luật.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>5. Quyền Riêng Tư</h3>
            <p>
              Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng theo quy
              định của pháp luật.
            </p>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.acceptButton} onClick={onClose}>
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

TermsAndConditions.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TermsAndConditions;
