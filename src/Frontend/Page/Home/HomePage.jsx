import Banner from "../../Components/Banner/Banner";
import styles from "../../Styles/HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      {/* Banner */}
      <Banner />

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Our Features</h2>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <h3>Feature 1</h3>
            <p>Description of feature 1.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Feature 2</h3>
            <p>Description of feature 2.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Feature 3</h3>
            <p>Description of feature 3.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.testimonialList}>
          <blockquote>
            <p>"This is the best service ever!"</p>
            <footer>- Client Name</footer>
          </blockquote>
          <blockquote>
            <p>"I love their products, so reliable!"</p>
            <footer>- Another Client</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
