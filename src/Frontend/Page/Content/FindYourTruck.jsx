import { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "../../Styles/FindYourTruck.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const FindYourTruck = () => {
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 50,
      once: true,
    });
  }, []);

  // Fetch categories khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/truck-categories"
        );
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch trucks data khi category thay đổi
  useEffect(() => {
    const fetchTrucks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/trucks?category=${activeCategory}`
        );
        const data = await response.json();
        if (data.success) {
          setTrucks(data.data);
        }
      } catch (error) {
        console.error("Error fetching trucks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, [activeCategory]);

  const getSliderSettings = () => {
    const itemCount = trucks.length;
    return {
      dots: false,
      infinite: trucks.length > 5,
      speed: 500,
      slidesToShow: Math.min(5, Math.max(itemCount, 1)),
      slidesToScroll: 1,
      centerMode: false,
      arrows: trucks.length > 5,
      prevArrow: <button className={styles.arrowLeft}>&#10094;</button>,
      nextArrow: <button className={styles.arrowRight}>&#10095;</button>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(3, Math.max(itemCount, 2)),
            arrows: trucks.length > 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(3, itemCount),
            arrows: trucks.length > 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: Math.min(2, itemCount),
            arrows: trucks.length > 2,
          },
        },
      ],
    };
  };

  const handleProductClick = () => {
    navigate("/product");
  };

  return (
    <section className={styles.findYourTruck}>
      <div className={styles.container}>
        <h2 data-aos="fade-up">Find Your Truck</h2>
        <div className={styles.tabs} data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.tabButton} ${
                activeCategory === category ? styles.activeTab : ""
              } ${trucks.length === 0 ? styles.disabled : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.sliderWrapper} data-aos="zoom-in">
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : trucks.length > 0 ? (
            <Slider {...getSliderSettings()}>
              {trucks.map((truck, index) => (
                <div
                  key={index}
                  className={styles.truckItem}
                  onClick={handleProductClick}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={truck.src}
                    alt={`Model ${truck.model}`}
                    data-aos="flip-left"
                    data-aos-delay={index * 100}
                  />
                  <h3>Model {truck.model}</h3>
                </div>
              ))}
            </Slider>
          ) : (
            <div className={styles.noProducts}>
              Không có sản phẩm nào trong danh mục này
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FindYourTruck;
