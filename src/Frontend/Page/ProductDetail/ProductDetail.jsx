import { useState, useRef, useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import styles from "../../Styles/ProductDetail.module.scss";
import TechnicalDetailsModal from "./TechnicalDetailsModal";
import OrderModal from "./OrderModal";
import BackButton from "../../Components/BackButton/BackButton";
import { API_URL } from "../../../config/api";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowDownOutlined } from "@ant-design/icons";
import Defaultimage from "../../../assets/Image/Image_Chenglong.jpg";
import Error from "../../../assets/Image/404_1.jpg";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [specifications, setSpecifications] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const galleryRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { id } = useParams();
  const detailsRef = useRef(null);
  const { loading, showLoading, hideLoading } = useLoading();
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading("Đang tải thông tin sản phẩm...");
        setIsLoading(true);

        // Fetch product info
        const productResponse = await fetch(`${API_URL}/products/${id}`);
        if (productResponse.status === 404) {
          navigate("/not-found"); // Redirect to NotFound page
        } else {
          const productData = await productResponse.json();

          if (productData.success) {
            setProductInfo(productData.data);
          }

          // Fetch specifications
          const specResponse = await fetch(
            `${API_URL}/products/${id}/specifications`
          );
          const specData = await specResponse.json();

          if (specData.success) {
            setSpecifications(specData.data);
          }
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Đã xảy ra lỗi khi tải thông tin sản phẩm.");
      } finally {
        setIsLoading(false);
        hideLoading();
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, showLoading, hideLoading, navigate]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/product-images/${id}`);
        const data = await response.json();

        if (data.success) {
          setProductImages(data.data);
        } else {
          setError("Thông tin sản phẩm đang được cập nhật.");
        }
      } catch (err) {
        console.error("Error fetching product images:", err);
        setError("Đã xảy ra lỗi khi tải thông tin sản phẩm.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductImages();
    }
  }, [id]);

  if (loading || isLoading) return null;

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
        setCurrentImageIndex((prev) =>
          prev > 0 ? prev - 1 : productImages.length - 1
        );
      } else {
        galleryRef.current.scrollLeft += scrollAmount;
        setCurrentImageIndex((prev) =>
          prev < productImages.length - 1 ? prev + 1 : 0
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

  const formatSpecifications = () => {
    if (!specifications) return [];

    return [
      { label: "Lớp học", value: specifications.class },
      { label: "Được sử dụng cho", value: specifications.used_for },
      { label: "Công suất tối đa", value: specifications.max_horsepower },
      { label: "Mô-men xoắn cực đại", value: specifications.peak_torque },
      {
        label: "Trục trước và hệ thống treo",
        value: specifications.front_axle_suspension,
      },
      {
        label: "Trục sau và hệ thống treo",
        value: specifications.rear_axle_suspension,
      },
      { label: "Người ngủ", value: specifications.sleeper },
    ];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles.productDetailContainer}>
      <BackButton />
      {/* hình ảnh giới thiệu */}
      <section className={styles.truckDetailSection}>
        <div className={styles.textContent}>
          <h1 className={styles.truckTitle}>
            {productInfo?.name || "Loading..."}
          </h1>
          <div className={styles.priceSection}>
            <span className={styles.priceLabel}>Giá bán:</span>
            <span className={styles.priceValue}>
              {productInfo ? formatPrice(productInfo.price) : "Đang cập nhật"}
            </span>
          </div>
          <div className={styles.description}>
            <p>
              {productInfo?.short_description || "Đang cập nhật thông tin..."}
            </p>
          </div>
          <div className={styles.buttonDown}>
            <button className={styles.buyNowButton} onClick={scrollToDetails}>
              Mô tả chi tiết <ArrowDownOutlined />
            </button>
          </div>
        </div>
        <div className={styles.imageContent}>
          <img
            src={productInfo?.thumbnail || Defaultimage}
            alt={productInfo?.name || "Product Image"}
            className={styles.truckImage}
            onError={(e) => {
              e.target.src = Defaultimage;
            }}
          />
        </div>
      </section>
      {/* Chi tiết sản phẩm */}
      <div ref={detailsRef} className={styles.container}>
        {/* Hỉnh ảnh chi tiết sản phẩm */}
        <section className={styles.container}>
          {/* Grid container cho layout 2 cột */}
          <div className={styles.productGrid}>
            {/* Cột 1: Phần hình ảnh */}
            <div className={styles.productImageSection}>
              {isLoading ? (
                <p>Đang tải hình ảnh...</p>
              ) : error ? (
                <img
                  src={Error}
                  alt="Ảnh minh họa"
                  className={styles.mainProductImage}
                />
              ) : (
                <>
                  <img
                    src={
                      productImages[currentImageIndex]?.image_url ||
                      Defaultimage
                    }
                    alt={`Hình ảnh sản phẩm ${currentImageIndex + 1}`}
                    className={styles.mainProductImage}
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                      overflow: "hidden",
                    }}
                  />
                  <div className={styles.thumbnailGallery} ref={galleryRef}>
                    {productImages.map((img, index) => (
                      <img
                        key={index}
                        src={img.image_url}
                        alt={`Thumbnail ${index + 1}`}
                        className={`${styles.thumbnailImage} ${
                          currentImageIndex === index
                            ? styles.activeThumbnail
                            : ""
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
                </>
              )}
            </div>

            {/* Cột 2: Phần thông tin */}
            <div className={styles.productInfoSection}>
              <h2 className={styles.productModel}>
                MODEL {/* Add model from API */}
              </h2>

              <h3 className={styles.productTitle}>{/* Add name from API */}</h3>

              {isLoading ? (
                <div className={styles.loading}>Loading specifications...</div>
              ) : error ? (
                <div className={styles.error}>{error}</div>
              ) : (
                <ul className={styles.productSpecs}>
                  {formatSpecifications().map((spec, index) => (
                    <li key={index} className={styles.productSpecItem}>
                      <strong>{spec.label}:</strong> {spec.value}
                    </li>
                  ))}
                </ul>
              )}

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

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productInfo={{
          name: productInfo?.name || "Loading...",
          model: productInfo?.slug || "",
          image: productInfo?.thumbnail || Defaultimage,
        }}
      />

      <TechnicalDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        specifications={formatSpecifications()}
        technicalDetails={technicalDetails}
      />
    </div>
  );
};

export default ProductDetail;
