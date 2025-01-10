import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS của AOS
import { useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";
import Banner from "../../Components/Banner/Banner";
import styles from "../../Styles/HomePage.module.scss";
import FindYourTruck from "../Content/FindYourTruck";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian animation (ms)
      offset: 50, // Khoảng cách trước khi animation bắt đầu
      once: true, // Animation chỉ chạy một lần
    });
  }, []);

  return (
    <div className={styles.homePage}>
      {/* Banner */}
      <div className={styles.bannerContainer} data-aos="fade-down">
        <Banner />
      </div>

      {/* Find Your Truck Section */}
      <div data-aos="fade-up">
        <FindYourTruck />
      </div>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.gridContainer}>
          {/* Ô đầu tiên: Welcome text */}
          <div className={styles.gridItemText} data-aos="fade-right">
            <h1>Welcome to Volvo Trucks</h1>
            <p>
              Find out more about what we do, get to know our trucks and
              services, and read the latest news, company info, and press
              releases.
            </p>
          </div>

          {/* Ô thứ 2: Hình ảnh minh họa */}
          <div className={styles.gridItemImage} data-aos="zoom-in">
            <img
              src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/market-landing-transport-solutions-mirrored-in-water?qlt=82&wid=1024&ts=1705306447740&dpr=off&fit=constrain"
              alt="Illustration 1"
            />
          </div>

          {/* Ô thứ 3: Hình ảnh minh họa */}
          <div className={styles.gridItemImage} data-aos="zoom-in">
            <img
              src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/market-landing-volvo-trucks-grille-close-up?qlt=82&wid=1024&ts=1706380790871&dpr=off&fit=constrain"
              alt="Illustration 2"
            />
            <div className={styles.overlay}>
              <h3>Trucks</h3>
              <p>
                Get to know our trucks and explore the wide range of choices and
                details available.
              </p>
              <button>
                <span className="" style={{ marginRight: 5 }}>
                  Explore the trucks
                </span>
                <RightOutlined />
              </button>
            </div>
          </div>

          {/* Ô thứ 4: Hình ảnh minh họa */}
          <div className={styles.gridItemImage} data-aos="zoom-in">
            <img
              src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/volvo-fm-house-facade-sky?qlt=82&wid=1024&ts=1706380817090&dpr=off&fit=constrain"
              alt="Illustration 3"
            />
            <div className={styles.overlay}>
              <h3>News & Insights</h3>
              <p>
                The latest news from Volvo Trucks. Here you’ll find stories,
                insights from industry experts, case studies, and more.
              </p>
              <button>
                <span className="" style={{ marginRight: 5 }}>
                  Read the stories
                </span>
                <RightOutlined />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className={styles.pressReleases}>
        <div className={styles.container}>
          <h2 data-aos="fade-up">Press releases</h2>
          <p className={styles.subHeader} data-aos="fade-up">
            Browse the latest press releases from Volvo Trucks.
          </p>
          <div className={styles.pressGrid}>
            <div className={styles.pressItem} data-aos="flip-left">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Press Release 1"
              />
              <h3>Volvo Trucks scores five stars in independent safety test</h3>
              <p className={styles.pressDate}>2024-11-20</p>
              <p>
                The European consumer test organization Euro NCAP has for the
                first time ever assessed the safety of heavy-duty trucks.
                Volvo's best-selling models, the Volvo FH and the Volvo FM, both
                received the top rating of five stars.The European consumer test
                organization Euro NCAP has for the first time ever assessed the
                safety of heavy-duty trucks. Volvo's best-selling models, the
                Volvo FH and the Volvo FM, both received the top rating of five
                stars.
              </p>
            </div>
            <div className={styles.pressItem} data-aos="flip-left">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Press Release 2"
              />
              <h3>
                Volvo Trucks launches next-generation safety systems to protect
                pedestrians and cyclists
              </h3>
              <p className={styles.pressDate}>2024-10-31</p>
              <p>
                Busy traffic situations pose daily safety risks to vulnerable
                road users. This is why Volvo Trucks is introducing two safety
                systems focusing on protecting pedestrians and cyclists.
              </p>
            </div>
            <div className={styles.pressItem} data-aos="flip-left">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Press Release 3"
              />
              <h3>Volvo Trucks ramps up the use of low-CO2-emission steel</h3>
              <p className={styles.pressDate}>2024-09-10</p>
              <p>
                Volvo is increasing the use of low-CO2-emission steel in its
                trucks. This steel is produced with recycled material and
                fossil-free energy.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.pressReleases_button} data-aos="fade-up">
          <button>
            <span style={{ marginRight: 5 }}>Read the stories</span>
            <RightOutlined />
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials} data-aos="fade-up">
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

      {/* Highlights Section */}
      <section className={styles.highlights}>
        <div className={styles.container}>
          <h2 data-aos="fade-up">Why Choose Volvo Trucks?</h2>
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightItem} data-aos="zoom-in">
              <img src="https://via.placeholder.com/150" alt="Highlight 1" />
              <h3>Safety First</h3>
              <p>
                Volvo Trucks is a pioneer in safety, offering industry-leading
                features to protect drivers and other road users.
              </p>
            </div>
            <div className={styles.highlightItem} data-aos="zoom-in">
              <img src="https://via.placeholder.com/150" alt="Highlight 2" />
              <h3>Fuel Efficiency</h3>
              <p>
                Our trucks are designed to maximize fuel efficiency, saving
                costs and reducing environmental impact.
              </p>
            </div>
            <div className={styles.highlightItem} data-aos="zoom-in">
              <img src="https://via.placeholder.com/150" alt="Highlight 3" />
              <h3>Global Network</h3>
              <p>
                With a global network of service centers, we ensure your trucks
                are always on the road.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
