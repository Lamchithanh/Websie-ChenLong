import styles from "../../Styles/Header.module.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.logoSection}>
          <span className={styles.logo}>CTCOIN</span>
          <NavLink href="#xetai" className={styles.link}>
            TRUCKS
          </NavLink>
        </div>
      </div>
      <div></div>
      <div></div>
      <div className={styles.rightSection}>
        <div className={styles.rightSection_one}>
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
        <div className={styles.searchBox}>
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
