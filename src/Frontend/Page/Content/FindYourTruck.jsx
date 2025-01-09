import { useState } from "react";
import Slider from "react-slick";
import styles from "../../Styles/FindYourTruck.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FindYourTruck = () => {
  const truckData = {
    All: [
      { model: "579", src: "https://via.placeholder.com/200x100" },
      { model: "589", src: "https://via.placeholder.com/200x100" },
      { model: "567", src: "https://via.placeholder.com/200x100" },
      { model: "520", src: "https://via.placeholder.com/200x100" },
      { model: "548", src: "https://via.placeholder.com/200x100" },
    ],
    "On-Highway": [
      { model: "579", src: "https://via.placeholder.com/200x100" },
      { model: "589", src: "https://via.placeholder.com/200x100" },
    ],
    Vocational: [
      { model: "567", src: "https://via.placeholder.com/200x100" },
      { model: "520", src: "https://via.placeholder.com/200x100" },
    ],
    "Medium Duty": [
      { model: "520", src: "https://via.placeholder.com/200x100" },
    ],
    "Zero Emission": [
      { model: "548", src: "https://via.placeholder.com/200x100" },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("All");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.findYourTruck}>
      <div className={styles.container}>
        <h2>Find Your Truck</h2>
        {/* Tabs for filtering */}
        <div className={styles.tabs}>
          {Object.keys(truckData).map((category) => (
            <button
              key={category}
              className={activeCategory === category ? styles.activeTab : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Truck models slider */}
        <div className={styles.sliderWrapper}>
          <Slider {...settings}>
            {truckData[activeCategory].map((truck, index) => (
              <div key={index} className={styles.truckItem}>
                <img src={truck.src} alt={`Model ${truck.model}`} />
                <h3>Model {truck.model}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FindYourTruck;
