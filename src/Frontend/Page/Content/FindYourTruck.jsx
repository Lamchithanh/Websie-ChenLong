import { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "../../Styles/FindYourTruck.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/api.js";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLoading } from "../../contexts/LoadingContext";
import Defaultimage from "../../../assets/Image/Image_Chenglong.jpg";

const FindYourTruck = () => {
  const navigate = useNavigate();
  const { loading, showLoading, hideLoading } = useLoading();
  const [trucks, setTrucks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 50,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/truck-categories`);
        const data = await response.json();
        if (data.success) {
          // Thêm option "All" vào đầu danh sách categories
          const allCategories = [{ id: 0, name: "All" }, ...data.data];
          setCategories(allCategories);
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
      try {
        showLoading();
        const response = await fetch(
          `${API_URL}/orders/trucks?category=${activeCategory}`
        );
        const data = await response.json();
        if (data.success) {
          setTrucks(data.data);
        }
      } catch (error) {
        console.error("Error fetching trucks:", error);
      } finally {
        hideLoading();
      }
    };

    fetchTrucks();
  }, [activeCategory, showLoading, hideLoading]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getSliderSettings = () => ({
    dots: false, // Tắt dots
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Tắt arrows
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  });

  return (
    <section className={styles.findYourTruck}>
      <div className={styles.container}>
        <h2 data-aos="fade-up">Find Your Truck</h2>
        <div className={styles.tabs} data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.tabButton} ${
                activeCategory === category.name ? styles.activeTab : ""
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
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
                  onClick={() => handleProductClick(truck.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={truck.thumbnail || Defaultimage}
                    alt={`Product ${truck.name}`} // Đảm bảo name là string
                    data-aos="flip-left"
                    data-aos-delay={index * 100}
                    onError={(e) => {
                      e.target.onerror = null; // Ngăn lỗi lặp vô hạn
                      e.target.src = Defaultimage; // Đặt ảnh mặc định khi lỗi
                    }}
                  />
                  <p>{truck.name}</p>
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
