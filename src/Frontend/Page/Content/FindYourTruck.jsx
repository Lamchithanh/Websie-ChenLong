import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS của AOS
import { useEffect, useState } from "react"; // Để khởi tạo AOS khi component mount
import Slider from "react-slick";
import styles from "../../Styles/FindYourTruck.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const FindYourTruck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian animation (ms)
      offset: 50, // Khoảng cách trước khi animation bắt đầu
      once: true, // Chạy animation một lần khi scroll vào view
    });
  }, []);

  const truckData = {
    All: [
      {
        model: "579",
        src: "https://www.peterbilt.com/static-assets/images/truck/Peterbilt%20579%20UL.png",
      },
      {
        model: "589",
        src: "https://www.peterbilt.com/static-assets/images/truck/589-thumb.webp",
      },
      {
        model: "567",
        src: "https://www.peterbilt.com/static-assets/images/truck/567-thumb.webp",
      },
      {
        model: "520",
        src: "https://www.peterbilt.com/static-assets/images/truck/520-thumb.webp",
      },
      {
        model: "548",
        src: "https://www.peterbilt.com/static-assets/images/truck/548-thumb.webp",
      },
    ],
    "On-Highway": [
      {
        model: "579",
        src: "https://www.peterbilt.com/static-assets/images/truck/579ev-sm.webp",
      },
      {
        model: "589",
        src: "https://www.peterbilt.com/static-assets/images/truck/589-thumb.webp",
      },
    ],
    Vocational: [
      {
        model: "567",
        src: "https://www.peterbilt.com/static-assets/images/truck/567-thumb.webp",
      },
      {
        model: "520",
        src: "https://www.peterbilt.com/static-assets/images/truck/520ev-sm.webp",
      },
    ],
    "Medium Duty": [
      {
        model: "520",
        src: "https://www.peterbilt.com/static-assets/images/truck/520ev-sm.webp",
      },
    ],
    "Zero Emission": [
      {
        model: "548",
        src: "https://www.peterbilt.com/static-assets/images/truck/548-thumb.webp",
      },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("All");

  const getSliderSettings = (category) => {
    const itemCount = truckData[category].length;
    const duplicatedItems = Array(Math.ceil(5 / itemCount))
      .fill([...truckData[category]])
      .flat();

    return {
      dots: false,
      infinite: true, // Ensures that the slider loops
      speed: 500,
      slidesToShow: Math.min(5, Math.max(itemCount, 1)),
      slidesToScroll: 1,
      centerMode: false,
      arrows: true,
      prevArrow: <button className={styles.arrowLeft}>&#10094;</button>,
      nextArrow: <button className={styles.arrowRight}>&#10095;</button>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(3, Math.max(itemCount, 2)),
            arrows: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(3, itemCount),
            arrows: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            arrows: true,
          },
        },
      ],
    };
  };

  const sampleProducts = [
    {
      id: "1",
      model: "589",
      name: "Xe Tải Peterbilt",
      image: "https://via.placeholder.com/400x300",
      gallery: [
        "https://via.placeholder.com/100x100",
        "https://via.placeholder.com/100x100",
        "https://via.placeholder.com/100x100",
      ],
      specs: [
        { label: "Lớp học", value: "8" },
        { label: "Được sử dụng cho", value: "Trên Đường Cao Tốc" },
        { label: "Công suất tối đa", value: "405 - 605 mã lực" },
        { label: "Mô-men xoắn cực đại", value: "1.450 - 2.050 lb-ft" },
        {
          label: "Trục trước và hệ thống treo",
          value: "12.000 - 22.800 pound",
        },
        { label: "Trục sau và hệ thống treo", value: "21.000 - 78.000 pound" },
        { label: "Người ngủ", value: '44" - 80"' },
      ],
    },
    // Thêm các sản phẩm mẫu khác...
  ];

  const handleProductClick = () => {
    navigate("/product");
  };

  return (
    <section className={styles.findYourTruck}>
      <div className={styles.container}>
        <h2 data-aos="fade-up">Find Your Truck</h2>
        <div className={styles.tabs} data-aos="fade-up">
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
        <div className={styles.sliderWrapper} data-aos="zoom-in">
          <Slider {...getSliderSettings(activeCategory)}>
            {Array(Math.ceil(5 / truckData[activeCategory].length))
              .fill([...truckData[activeCategory]])
              .flat()
              .map((truck, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default FindYourTruck;
