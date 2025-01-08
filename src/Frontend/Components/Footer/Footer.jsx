import { useState } from "react";
import styles from "../../Styles/Footer.module.scss";

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    services: false,
    social: false,
    contact: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3
            onClick={() => toggleSection("about")}
            className={styles.columnHeader}
          >
            <span>Về</span>
            <span
              className={`${styles.arrow} ${
                expandedSections.about ? styles.expanded : ""
              }`}
            >
              ▼
            </span>
          </h3>
          <ul
            className={`${styles.columnContent} ${
              expandedSections.about ? styles.expanded : ""
            }`}
          >
            <li>Xe tải Volvo</li>
            <li>Chất lượng</li>
            <li>Sự an toàn</li>
            <li>Chăm sóc môi trường</li>
            <li>Trách nhiệm xã hội của doanh nghiệp</li>
            <li>Hướng dẫn ứng phó khẩn cấp</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3
            onClick={() => toggleSection("services")}
            className={styles.columnHeader}
          >
            <span>Xe tải & Dịch vụ</span>
            <span
              className={`${styles.arrow} ${
                expandedSections.services ? styles.expanded : ""
              }`}
            >
              ▼
            </span>
          </h3>
          <ul
            className={`${styles.columnContent} ${
              expandedSections.services ? styles.expanded : ""
            }`}
          >
            <li>Xe tải mới</li>
            <li>Xe tải đã qua sử dụng</li>
            <li>Dịch vụ của chúng tôi</li>
            <li>Thỏa thuận & Bảo hành</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3
            onClick={() => toggleSection("social")}
            className={styles.columnHeader}
          >
            <span>Theo dõi Volvo Trucks</span>
            <span
              className={`${styles.arrow} ${
                expandedSections.social ? styles.expanded : ""
              }`}
            >
              ▼
            </span>
          </h3>
          <ul
            className={`${styles.columnContent} ${
              expandedSections.social ? styles.expanded : ""
            }`}
          >
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Instagram</li>
            <li>X</li>
            <li>Linkedin</li>
            <li>Tiktok</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3
            onClick={() => toggleSection("contact")}
            className={styles.columnHeader}
          >
            <span>Liên hệ & Địa điểm</span>
            <span
              className={`${styles.arrow} ${
                expandedSections.contact ? styles.expanded : ""
              }`}
            >
              ▼
            </span>
          </h3>
          <ul
            className={`${styles.columnContent} ${
              expandedSections.contact ? styles.expanded : ""
            }`}
          >
            <li>Tìm trang web địa phương của bạn</li>
            <li>Tìm đại lý địa phương của bạn</li>
            <li>Liên hệ Volvo Trucks</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© Bản quyền Chí Thành CTcoin 2025</p>
        <ul>
          <li>
            <a href="#privacy">Sự riêng tư</a>
          </li>
          <li>
            <a href="#cookies">Bánh quy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
