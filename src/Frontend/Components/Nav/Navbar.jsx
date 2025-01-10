import styles from "../../Styles/Navbar.module.scss";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (ms)
      offset: 50, // Khoảng cách scroll để kích hoạt hiệu ứng
      easing: "ease-in-out", // Kiểu easing
      once: true, // Hiệu ứng chỉ chạy một lần
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown("");
    setOpenSubmenus({});
  };

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? "" : section);
  };

  const toggleSubmenu = (sectionId) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <nav className={styles.navbar}>
      <button
        className={`${styles.menuButton} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        data-aos="fade-down" // Hiệu ứng fade-down
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
          data-aos="fade-in" // Hiệu ứng fade-in
        ></div>
      )}

      {/* Danh sách menu */}
      <ul
        className={`${styles.navList} ${isMenuOpen ? styles.open : ""}`}
        data-aos="fade-left" // Hiệu ứng fade từ trái sang
      >
        {/* Mục "ABOUT US" */}
        <li className={styles.navItem} data-aos="zoom-in">
          <div className={styles.navHeader}>
            {/* Nút bật/tắt dropdown */}
            <button
              className={styles.navLink}
              onClick={() => toggleDropdown("about")}
            >
              ABOUT US
            </button>
            <button
              className={`${styles.dropdownToggle} ${
                openDropdown === "about" ? styles.active : ""
              }`}
            >
              ▼
            </button>
          </div>
          <div
            className={`${styles.dropdown} ${
              openDropdown === "about" ? styles.open : ""
            }`}
          >
            <div className={styles.dropdownSection}>
              <div
                className={styles.sectionHeader}
                onClick={() => toggleSubmenu("who-we-are")}
              >
                <h4>Who we are</h4>
                <button
                  className={`${styles.submenuToggle} ${
                    openSubmenus["who-we-are"] ? styles.active : ""
                  }`}
                >
                  ▼
                </button>
              </div>
              <ul
                className={`${styles.submenu} ${
                  openSubmenus["who-we-are"] ? styles.open : ""
                }`}
              >
                <li>
                  <a href="#part-of-volvo">Part of Volvo Group</a>
                </li>
                <li>
                  <a href="#career">Career</a>
                </li>
                <li>
                  <a href="#facts-and-figures">Facts and figures</a>
                </li>
                <li>
                  <a href="#our-design">Our design</a>
                </li>
              </ul>
            </div>
            <div className={styles.dropdownSection}>
              <div
                className={styles.sectionHeader}
                onClick={() => toggleSubmenu("what-we-believe")}
              >
                <h4>What we believe in</h4>
                <button
                  className={`${styles.submenuToggle} ${
                    openSubmenus["what-we-believe"] ? styles.active : ""
                  }`}
                >
                  ▼
                </button>
              </div>
              <ul
                className={`${styles.submenu} ${
                  openSubmenus["what-we-believe"] ? styles.open : ""
                }`}
              >
                <li>
                  <a href="#quality">Quality</a>
                </li>
                <li>
                  <a href="#safety">Safety</a>
                </li>
                <li>
                  <a href="#environmental-care">Environmental care</a>
                </li>
              </ul>
            </div>
            <div className={styles.dropdownSection}>
              <div
                className={styles.sectionHeader}
                onClick={() => toggleSubmenu("how-we-drive")}
              >
                <h4>How we drive progress</h4>
                <button
                  className={`${styles.submenuToggle} ${
                    openSubmenus["how-we-drive"] ? styles.active : ""
                  }`}
                >
                  ▼
                </button>
              </div>
              <ul
                className={`${styles.submenu} ${
                  openSubmenus["how-we-drive"] ? styles.open : ""
                }`}
              >
                <li>
                  <a href="#zero-emissions">Towards zero emissions</a>
                </li>
                <li>
                  <a href="#zero-accidents">Towards zero accidents</a>
                </li>
                <li>
                  <a href="#sustainable-society">
                    Towards a more sustainable society
                  </a>
                </li>
                <li>
                  <a href="#productivity">Towards increased productivity</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className={styles.navItem}>
          <button className={styles.navLink}>NEWS & INSIGHTS</button>
        </li>
        <li className={styles.navItem}>
          <button className={styles.navLink}>TRUCKS</button>
        </li>
        <li className={styles.navItem}>
          <button className={styles.navLink}>SERVICES</button>
        </li>
        <li className={styles.navItem}>
          <button className={styles.navLink}>DEALER LOCATOR</button>
        </li>
        <li className={styles.navItem}>
          <button className={styles.navLink}>CONTACT US</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
