import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../Styles/TechnicalDetailsModal.module.scss";

const TechnicalDetailsModal = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  const handleToggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
    setExpandedSubmenu(null); // Đóng tất cả submenu khi chuyển section
  };

  const handleToggleSubmenu = (submenu) => {
    setExpandedSubmenu(expandedSubmenu === submenu ? null : submenu);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>589 - Tùy chọn và thông số kỹ thuật</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {/* Hiệu suất */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => handleToggleSection("performance")}
            >
              HIỆU SUẤT
              <span className={styles.toggleIcon}>
                {expandedSection === "performance" ? "-" : "+"}
              </span>
            </div>
            {expandedSection === "performance" && (
              <div className={styles.sectionContent}>
                <ul>
                  <li>Động cơ MX-13 và X15</li>
                  <li>Hệ thống hộp số Eaton RT và FR Manual</li>
                  <li>Công suất: 600–780 hp</li>
                </ul>
              </div>
            )}
          </div>

          {/* Ngoại thất */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => handleToggleSection("exterior")}
            >
              NGOẠI THẤT
              <span className={styles.toggleIcon}>
                {expandedSection === "exterior" ? "-" : "+"}
              </span>
            </div>
            {expandedSection === "exterior" && (
              <div className={styles.sectionContent}>
                {/* Submenu */}
                <div className={styles.submenu}>
                  <div
                    className={styles.submenuHeader}
                    onClick={() => handleToggleSubmenu("hood")}
                  >
                    Mũ trùm đầu
                    <span className={styles.toggleIcon}>
                      {expandedSubmenu === "hood" ? "-" : "+"}
                    </span>
                  </div>
                  {expandedSubmenu === "hood" && (
                    <ul className={styles.submenuContent}>
                      <li>Nhôm BBC 121"</li>
                      <li>131" BBC nhôm</li>
                      <li>Mở toàn bộ 90 độ</li>
                    </ul>
                  )}
                </div>

                <div className={styles.submenu}>
                  <div
                    className={styles.submenuHeader}
                    onClick={() => handleToggleSubmenu("chassis")}
                  >
                    Cản xe
                    <span className={styles.toggleIcon}>
                      {expandedSubmenu === "chassis" ? "-" : "+"}
                    </span>
                  </div>
                </div>

                <div className={styles.submenu}>
                  <div
                    className={styles.submenuHeader}
                    onClick={() => handleToggleSubmenu("lighting")}
                  >
                    Chiếu sáng
                    <span className={styles.toggleIcon}>
                      {expandedSubmenu === "lighting" ? "-" : "+"}
                    </span>
                  </div>
                </div>

                <div className={styles.submenu}>
                  <div
                    className={styles.submenuHeader}
                    onClick={() => handleToggleSubmenu("mirrors")}
                  >
                    Gương
                    <span className={styles.toggleIcon}>
                      {expandedSubmenu === "mirrors" ? "-" : "+"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nội thất */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => handleToggleSection("interior")}
            >
              NỘI THẤT
              <span className={styles.toggleIcon}>
                {expandedSection === "interior" ? "-" : "+"}
              </span>
            </div>
            {expandedSection === "interior" && (
              <div className={styles.sectionContent}>
                <p>Mức độ trang trí</p>
                <ul>
                  <li>Premier – Xám Alpine</li>
                  <li>Bạch kim – Xám núi cao, Đá sa thạch</li>
                </ul>
              </div>
            )}
          </div>

          {/* Công nghệ */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => handleToggleSection("technology")}
            >
              CÔNG NGHỆ
              <span className={styles.toggleIcon}>
                {expandedSection === "technology" ? "-" : "+"}
              </span>
            </div>
            {expandedSection === "technology" && (
              <div className={styles.sectionContent}>
                <ul>
                  <li>Hệ thống điều hướng</li>
                  <li>Cảm biến thông minh</li>
                  <li>Kết nối không dây</li>
                </ul>
              </div>
            )}
          </div>

          {/* Gói huyền thoại */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => handleToggleSection("legendaryPackage")}
            >
              GÓI HUYỀN THOẠI
              <span className={styles.toggleIcon}>
                {expandedSection === "legendaryPackage" ? "-" : "+"}
              </span>
            </div>
            {expandedSection === "legendaryPackage" && (
              <div className={styles.sectionContent}>
                <ul>
                  <li>Nâng cấp khí động học</li>
                  <li>Trang trí nội thất cao cấp</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TechnicalDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TechnicalDetailsModal;
