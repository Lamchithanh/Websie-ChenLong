import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Nav/Navbar";
import styles from "./PlayOut.module.scss";

const PlayOut = () => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <header>
        <Header />
      </header>
      {/* Navbar dính trên trang homepage */}
      {location.pathname === "/" && (
        <nav className={styles.stickyNavbar}>
          <Navbar />
        </nav>
      )}
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PlayOut;
