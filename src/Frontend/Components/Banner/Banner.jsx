import ReactPlayer from "react-player";
import styles from "../../Styles/Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.banner}>
      {/* React Player for YouTube */}
      <ReactPlayer
        url="https://youtu.be/DHreosIUwlA"
        playing
        loop
        muted
        className={styles.videoPlayer}
        width="100%"
        height="100%"
      />

      {/* Content Overlay */}
      <div className={styles.content}>
        <h1>Together, we can move the world.</h1>
        <button className={styles.ctaButton}>
          Watch the film here <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
