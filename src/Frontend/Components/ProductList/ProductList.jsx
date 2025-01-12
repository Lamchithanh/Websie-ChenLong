import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/api.js";
import { useLoading } from "../../contexts/LoadingContext";
import styles from "./ProductList.module.scss";
import Defaultimage from "../../../assets/Image/Image_Chenglong.jpg";

const ITEMS_PER_PAGE = 6; // Số sản phẩm trên mỗi trang

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [specifications, setSpecifications] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, showLoading, hideLoading } = useLoading();

  // Tính toán sản phẩm cho trang hiện tại
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading("Đang tải sản phẩm...");
        // Fetch products
        const productsResponse = await fetch(`${API_URL}/products`);
        const productsData = await productsResponse.json();

        if (productsData.success) {
          setProducts(productsData.data);

          // Fetch specifications for each product
          const specs = {};
          await Promise.all(
            productsData.data.map(async (product) => {
              const specResponse = await fetch(
                `${API_URL}/products/${product.id}/specifications`
              );
              const specData = await specResponse.json();
              if (specData.success) {
                specs[product.id] = specData.data;
              }
            })
          );
          setSpecifications(specs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, [showLoading, hideLoading]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return null;

  return (
    <div className={styles.productList}>
      <div className={styles.container}>
        <div className={styles.productsGrid}>
          {currentProducts.map((product) => {
            const spec = specifications[product.id] || {};
            return (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => handleProductClick(product.id)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={product.thumbnail || Defaultimage}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = Defaultimage;
                    }}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.modelSection}>
                    <span className={styles.modelLabel}>MODEL</span>
                    <h3 className={styles.modelNumber}>{product.slug}</h3>
                  </div>
                  <div className={styles.specsList}>
                    <div className={styles.specItem}>
                      <span>
                        {" "}
                        {product.short_description || "Chưa có thông tin"}
                      </span>
                    </div>
                    <div className={styles.specItem}>
                      <span>
                        Max Horsepower: Up to{" "}
                        {spec.max_horsepower || "Chưa có thông tin"}
                      </span>
                    </div>
                    <div className={styles.specItem}>
                      <span>
                        Peak Torque: Up to{" "}
                        {spec.peak_torque || "Chưa có thông tin"}
                      </span>
                    </div>
                    <div className={styles.specItem}>
                      <span>
                        Sleeper: {spec.sleeper || "Chưa có thông tin"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={styles.pageButton}
              >
                Previous
              </button>
            )}

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${styles.pageButton} ${
                  currentPage === index + 1 ? styles.active : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={styles.pageButton}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
