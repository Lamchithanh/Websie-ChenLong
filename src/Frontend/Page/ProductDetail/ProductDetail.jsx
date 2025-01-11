import { useState, useRef } from "react";
import styles from "../../Styles/ProductDetail.module.scss";
import TechnicalDetailsModal from "./TechnicalDetailsModal";
import OrderModal from "./OrderModal";
import { Navigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import BackButton from "../../Components/BackButton/BackButton";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("overview"); // Tab mặc định là "overview"
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Thêm state cho ảnh hiện tại
  const galleryRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Dữ liệu mẫu cho các tab
  const tabsData = {
    overview: {
      title: "Tổng quan",
      content: [
        "Peterbilt Model 589 mới là phần thưởng tuyệt vời và xe tải làm việc cao cấp",
        "Nó thể hiện chất lượng, sự thanh lịch và không bỏ sót bất kỳ chi tiết nào khi nói đến độ chính xác, phong cách và hiệu quả",
        "Di sản và sức hấp dẫn của Peterbilt Model 389 đã được duy trì cẩn thận và được cải tiến mạnh mẽ với sự chuyển đổi liền mạch từ nền tảng 1,9m sang 2,1m",
        "Peterbilt Model 589 được chế tạo để đạt được thời gian hoạt động tốt nhất trong phân khúc",
        "Sự vừa vặn và hoàn thiện hàng đầu trong ngành cùng với vẻ đẹp và chất lượng mang lại trải nghiệm lái xe yên tĩnh",
        "Model 589 có sẵn trong nhiều ứng dụng khác nhau, bao gồm Xe chở hàng trên đường cao tốc",
      ],
      image:
        "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_NightGlamorShot_Exterior.webp",
    },
    powertrain: {
      title: "Hệ thống truyền động",
      content: [
        "Động cơ PACCAR MX-13 mạnh mẽ với công suất lên đến 605 mã lực",
        "Hộp số tự động 12 cấp với công nghệ chuyển số thông minh",
        "Hệ thống phanh điện tử tiên tiến với công nghệ chống bó cứng phanh ABS",
        "Hệ thống treo khí nén điều chỉnh tự động",
        "Bình nhiên liệu dung tích lớn cho phạm vi hoạt động rộng",
        "Hệ thống làm mát hiệu suất cao với quạt điều khiển điện tử",
      ],
      image:
        "https://www.peterbilt.com/static-assets/images/truck/Peterbilt%20579%20Engine%201200x672.webp",
    },
    exterior: {
      title: "Bên ngoài",
      content: [
        "Thiết kế khí động học tiên tiến giảm sức cản không khí",
        "Lưới tản nhiệt mạ chrome sang trọng với logo Peterbilt đặc trưng",
        "Đèn LED hiệu suất cao cho tầm nhìn tối ưu",
        "Gương chiếu hậu điều chỉnh điện với tính năng sưởi",
        "Cửa sổ kính cường lực với lớp cách âm đặc biệt",
        "Bậc lên xuống chống trượt với đèn LED tích hợp",
      ],
      image:
        "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_Group2-Exterior.webp",
    },
    interior: {
      title: "Nội thất",
      content: [
        "Cabin rộng rãi với không gian tối ưu cho người lái",
        "Ghế người lái cao cấp với tính năng sưởi và làm mát",
        "Bảng điều khiển kỹ thuật số với màn hình cảm ứng 12 inch",
        "Hệ thống âm thanh cao cấp với 8 loa",
        "Khoang ngủ tiện nghi với giường đôi rộng rãi",
        "Hệ thống điều hòa không khí tự động hai vùng",
      ],
      image:
        "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_PanoramicView_Interior.webp",
    },
  };

  // Dữ liệu mẫu cứng
  const sampleProduct = {
    model: "589",
    name: "Xe Tải Peterbilt",
    image:
      "https://www.peterbilt.com/static-assets/images/truck/589/589-main-image.webp",
    gallery: [
      "https://www.peterbilt.com/static-assets/images/truck/589%20car%20carrier.png",
      "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_AirBreather-Exterior.webp",
      "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_GrillBumper-Exterior.webp",
      "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_Fender-Exterior.webp",
      "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_Group2-Exterior.webp",
      "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_Bird-Exterior.webp",
      "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_Group3-Exterior.webp",
      "https://www.peterbilt.com/static-assets/images/truck/Peterbilt_589_NightGlamorShot_Exterior.webp",
    ],
    specs: [
      { label: "Lớp học", value: "8" },
      { label: "Được sử dụng cho", value: "Trên Đường Cao Tốc" },
      { label: "Công suất tối đa", value: "405 - 605 mã lực" },
      { label: "Mô-men xoắn cực đại", value: "1.450 - 2.050 lb-ft" },
      { label: "Trục trước và hệ thống treo", value: "12.000 - 22.800 pound" },
      { label: "Trục sau và hệ thống treo", value: "21.000 - 78.000 pound" },
      { label: "Người ngủ", value: '44" - 80"' },
    ],
  };

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 90; // 80px (width) + 10px (gap)
      if (direction === "left") {
        galleryRef.current.scrollLeft -= scrollAmount;
        // Cập nhật ảnh chính khi scroll qua trái
        setCurrentImageIndex((prev) =>
          prev > 0 ? prev - 1 : sampleProduct.gallery.length - 1
        );
      } else {
        galleryRef.current.scrollLeft += scrollAmount;
        // Cập nhật ảnh chính khi scroll qua phải
        setCurrentImageIndex((prev) =>
          prev < sampleProduct.gallery.length - 1 ? prev + 1 : 0
        );
      }
    }
  };

  // Thêm hàm xử lý khi click vào thumbnail
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    // Tính toán vị trí scroll để thumbnail được chọn nằm ở giữa
    if (galleryRef.current) {
      const thumbnailWidth = 90; // width + gap
      const scrollPosition =
        index * thumbnailWidth -
        (galleryRef.current.offsetWidth - thumbnailWidth) / 2;
      galleryRef.current.scrollLeft = scrollPosition;
    }
  };

  // Thêm dữ liệu chi tiết kỹ thuật
  const technicalDetails = {
    engine: {
      type: "PACCAR MX-13",
      power: "405 - 605 mã lực",
      torque: "1.450 - 2.050 lb-ft",
      displacement: "12.9L",
    },
    dimensions: {
      length: "7.620 mm",
      width: "2.590 mm",
      height: "3.960 mm",
      wheelbase: "3.940 mm",
    },
    transmission: {
      type: "PACCAR TX-18 Pro",
      speeds: "18 cấp tự động",
      drive: "6x4",
    },
    weight: {
      total: "40.000 kg",
      payload: "24.000 kg",
      curb: "16.000 kg",
    },
  };

  return (
    <div className={styles.productDetailContainer}>
      <BackButton />
      {/* hình ảnh giới thiệu */}
      <section className={styles.truckDetailSection}>
        <div className={styles.textContent}>
          <h1 className={styles.truckTitle}>Volvo FH16 Aero</h1>
          <p>
            <strong>Applications:</strong> Heavy transport assignments
          </p>
          <p>
            <strong>Power:</strong> 600–780 hp
          </p>
          <p>
            <strong>Availability:</strong> See market sites for details
          </p>
        </div>
        <div className={styles.imageContent}>
          <img
            src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/volvo-fh16-aero-cgi-exterior-1?qlt=82&wid=1024&ts=1706022245131&dpr=off&fit=constrain&fmt=png-alpha" // Thay bằng đường dẫn ảnh thật
            alt="Volvo FH16 Aero"
            className={styles.truckImage}
          />
        </div>
      </section>
      <div className={styles.container}>
        {/* Hỉnh ảnh chi tiết sản phẩm */}
        <section className={styles.container}>
          {/* Grid container cho layout 2 cột */}
          <div className={styles.productGrid}>
            {/* Cột 1: Phần hình ảnh */}
            <div className={styles.productImageSection}>
              <img
                src={sampleProduct.gallery[currentImageIndex]} // Sử dụng ảnh từ gallery theo index
                alt={sampleProduct.name}
                className={styles.mainProductImage}
              />
              <div className={styles.thumbnailGallery} ref={galleryRef}>
                {sampleProduct.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`${styles.thumbnailImage} ${
                      currentImageIndex === index ? styles.activeThumbnail : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
              <button
                className={`${styles.galleryNavButton} ${styles.prev}`}
                onClick={() => scrollGallery("left")}
              >
                ←
              </button>
              <button
                className={`${styles.galleryNavButton} ${styles.next}`}
                onClick={() => scrollGallery("right")}
              >
                →
              </button>
            </div>

            {/* Cột 2: Phần thông tin */}
            <div className={styles.productInfoSection}>
              <h2 className={styles.productModel}>
                MODEL {sampleProduct.model}
              </h2>
              <h3 className={styles.productTitle}>{sampleProduct.name}</h3>
              <ul className={styles.productSpecs}>
                {sampleProduct.specs.map((spec, index) => (
                  <li key={index} className={styles.productSpecItem}>
                    <strong>{spec.label}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
              <div className={styles.actionButtons}>
                <button
                  className={styles.buyNowButton}
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  Mua Ngay
                </button>
                <button
                  className={styles.viewMoreButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className={styles.container}>
          <div className={styles.tabsNav}>
            {Object.entries(tabsData).map(([key, { title }]) => (
              <button
                key={key}
                className={`${styles.tabButton} ${
                  activeTab === key ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className={styles.descriptionSection}>
            <div className={styles.descriptionText}>
              <h2 className={styles.descriptionTitle}>
                {tabsData[activeTab].title}
              </h2>
              <ul className={styles.descriptionPoints}>
                {tabsData[activeTab].content.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className={styles.descriptionImage}>
              <img
                src={tabsData[activeTab].image}
                alt={tabsData[activeTab].title}
              />
            </div>
          </div>
        </section>
      </div>

      <TechnicalDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productDetails={technicalDetails}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productInfo={{
          name: sampleProduct.name,
          model: sampleProduct.model,
          image: sampleProduct.image,
        }}
      />
    </div>
  );
};

export default ProductDetail;
