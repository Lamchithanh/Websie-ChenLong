import styles from "./Loading.module.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Loading = ({ color = "#ff4d4f" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div
        className={`${styles.loadingBar} ${isVisible ? styles.visible : ""}`}
        style={{
          background: `linear-gradient(to right, ${color}, ${color}dd)`,
        }}
      />
    </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
};

export default Loading;
