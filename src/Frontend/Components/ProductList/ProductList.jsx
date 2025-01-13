import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/api.js";
import { useLoading } from "../../contexts/LoadingContext";
import styles from "./ProductList.module.scss";
import Defaultimage from "../../../assets/Image/Image_Chenglong.jpg";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [specifications, setSpecifications] = useState({});
  const { loading, showLoading, hideLoading } = useLoading();

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
      const specs = {}; // Reset specifications

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

  // Fetch data on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return null;

  return (
    <div className={styles.productList}>
      <div className={styles.container}>
        <div className={styles.productsGrid}>
          {products.map((product) => {
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
      </div>
    </div>
  );
};

export default ProductList;
