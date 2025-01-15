import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { API_URL } from "../../../config/api.js";
import { useLoading } from "../../contexts/LoadingContext";
import styles from "./ProductList.module.scss";
import Defaultimage from "../../../assets/Image/Image_Chenglong.jpg";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [specifications, setSpecifications] = useState({});
  const { loading, showLoading, hideLoading } = useLoading();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch products and specifications
  const fetchData = useCallback(async () => {
    try {
      showLoading();

      const productsResponse = await fetch(`${API_URL}/products`);
      const productsData = await productsResponse.json();

      if (!productsData.success) {
        throw new Error("Failed to fetch products");
      }

      setProducts(productsData.data);

      const uniqueProductIds = new Set(
        productsData.data.map((product) => product.id)
      );
      const specs = {};

      await Promise.all(
        Array.from(uniqueProductIds).map(async (productId) => {
          try {
            const specResponse = await fetch(
              `${API_URL}/products/${productId}/specifications`
            );
            const specData = await specResponse.json();
            if (specData.success) {
              specs[productId] = specData.data;
            }
          } catch (error) {
            console.error(
              `Error fetching specifications for product ${productId}:`,
              error
            );
            specs[productId] = {
              max_horsepower: "Chưa có thông tin",
              peak_torque: "Chưa có thông tin",
              sleeper: "Chưa có thông tin",
            };
          }
        })
      );

      setSpecifications(specs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Generate pagination range with dots
  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "dots");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("dots", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
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
                    src={product.image_url || Defaultimage}
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

        {/* Enhanced Pagination Controls */}
        {totalPages > 1 && (
          <nav className={styles.pagination}>
            <ul className={styles.paginationList}>
              {/* Previous Button */}
              <li className={styles.pageItem}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.navButton}
                  aria-label="Previous page"
                >
                  <ChevronLeft />
                </button>
              </li>

              {/* Page Numbers */}
              {getPaginationRange().map((pageNumber, index) => (
                <li key={index} className={styles.pageItem}>
                  {pageNumber === "dots" ? (
                    <span className={styles.pageEllipsis}>
                      <MoreHorizontal />
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(pageNumber)}
                      className={`${styles.pageLink} ${
                        currentPage === pageNumber ? styles.active : ""
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )}
                </li>
              ))}

              {/* Next Button */}
              <li className={styles.pageItem}>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.navButton}
                  aria-label="Next page"
                >
                  <ChevronRight />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default ProductList;
