import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "../../Styles/Header.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import Avatar from "../../../assets/Image/avatar.jpg";
import Logo from "../../../assets/Image/logo_2.png";

const Header = () => {
  const navigate = useNavigate();
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra token và thông tin user từ localStorage
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
    // Đóng menu
    setIsOffCanvasOpen(false);
    // Hiển thị thông báo
    toast.success("Đăng xuất thành công!");
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 50,
      once: true,
    });
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  const handleMenuItemClick = () => {
    setIsOffCanvasOpen(false);
  };

  // Đóng off-canvas khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${styles.offCanvas}`) &&
        !event.target.closest(`.${styles.settingsButton}`)
      ) {
        setIsOffCanvasOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div
          className={styles.logoSection}
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <span className={styles.logo} onClick={handleLogoClick}>
            CTCOIN
          </span>
          <NavLink href="#xetai" className={styles.link}>
            TRUCKS
          </NavLink>
        </div>
      </div>
      <div></div>
      <div></div>
      <div
        className={styles.rightSection}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div
          className={styles.rightSection_one}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <NavLink href="tel:+4631666000" className={styles.phone}>
            <div className={styles.icon_header}>
              <img
                width="15"
                height="15"
                src="https://img.icons8.com/ios/50/ringer-volume.png"
                alt="ringer-volume"
              />
              <span> +46 31 66 60 00</span>
            </div>
          </NavLink>
          <NavLink href="#store" className={styles.link}>
            <div className={styles.icon_header}>
              <img
                width="15"
                height="15"
                src="https://img.icons8.com/dotty/80/shopping-cart.png"
                alt="shopping-cart"
              />
              <span>Cửa hàng xe tải </span>
            </div>
          </NavLink>
          <NavLink href="#global" className={styles.link}>
            <div className={styles.icon_header}>
              <img
                width="15"
                height="15"
                src="https://img.icons8.com/dotty/80/earth-planet.png"
                alt="earth-planet"
              />
              <span>Toàn cầu</span>
            </div>
          </NavLink>
          {/* Cài đặt với Off-canvas */}
          <div className={styles.settingsWrapper}>
            <button
              className={styles.settingsButton}
              onClick={handleSettingsClick}
            >
              <div className={styles.icon_header}>
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/ios/50/settings--v1.png"
                  alt="settings--v1"
                />
              </div>
            </button>
          </div>
        </div>
        <div
          className={styles.searchBox}
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <input
            type="text"
            placeholder="Tìm kiếm"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/forma-thin/24/search.png"
              alt="search"
            />
          </button>
        </div>
      </div>

      {/* Off-canvas Menu */}
      <div
        className={`${styles.offCanvas} ${isOffCanvasOpen ? styles.open : ""}`}
      >
        <div className={styles.offCanvasHeader}>
          <h3>Menu</h3>
          <button
            className={styles.closeButton}
            onClick={() => setIsOffCanvasOpen(false)}
          >
            ×
          </button>
        </div>
        <div className={styles.offCanvasContent}>
          {user ? (
            // Menu khi đã đăng nhập
            <>
              <div className={styles.userInfo}>
                <img src={Avatar} alt="user" width="40" height="40" />
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{user.fullName}</span>
                  <span className={styles.userEmail}>{user.email}</span>
                </div>
              </div>

              <div className={styles.menuDivider} />

              <NavLink
                to="/customer-profile"
                className={styles.menuItem}
                onClick={handleMenuItemClick}
              >
                <img
                  src="https://img.icons8.com/ios/50/user--v1.png"
                  alt="profile"
                  width="20"
                  height="20"
                />
                <span>Thông tin cá nhân</span>
              </NavLink>

              <NavLink
                to="/truck-orders"
                className={styles.menuItem}
                onClick={handleMenuItemClick}
              >
                <img
                  src="https://img.icons8.com/ios/50/purchase-order.png"
                  alt="orders"
                  width="20"
                  height="20"
                />
                <span>Đơn hàng của tôi</span>
              </NavLink>

              <div className={styles.menuDivider} />

              <button onClick={handleLogout} className={styles.menuItem}>
                <img
                  src="https://img.icons8.com/ios/50/logout-rounded.png"
                  alt="logout"
                  width="20"
                  height="20"
                />
                <span>Đăng xuất</span>
              </button>
            </>
          ) : (
            // Menu khi chưa đăng nhập
            <>
              <NavLink
                to="/login"
                className={styles.menuItem}
                onClick={handleMenuItemClick}
              >
                <img
                  src="https://img.icons8.com/ios/50/login-rounded.png"
                  alt="login"
                  width="20"
                  height="20"
                />
                <span>Đăng nhập</span>
              </NavLink>

              <NavLink to="/register" className={styles.menuItem}>
                <img
                  src="https://img.icons8.com/ios/50/add-user-male.png"
                  alt="register"
                  width="20"
                  height="20"
                />
                <span>Đăng ký</span>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOffCanvasOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsOffCanvasOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
