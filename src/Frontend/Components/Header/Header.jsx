import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/Header.module.scss";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 1000, // Thời gian animation (ms)
      offset: 50, // Khoảng cách trước khi animation bắt đầu
      once: true, // Animation chỉ chạy một lần
    });
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div
          className={styles.logoSection}
          data-aos="fade-down" // Hiệu ứng fade từ trên xuống
          data-aos-duration="1000" // Thời gian hiệu ứng (ms)
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
        data-aos="fade-up" // Hiệu ứng fade từ dưới lên
        data-aos-duration="1000"
      >
        <div
          className={styles.rightSection_one}
          data-aos="zoom-in" // Hiệu ứng zoom-in cho phần này
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
        </div>
        <div
          className={styles.searchBox}
          data-aos="fade-left" // Hiệu ứng fade từ trái sang
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
    </header>
  );
};

export default Header;
