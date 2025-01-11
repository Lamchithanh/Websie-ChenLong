import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/api.js";
import styles from "./ProductList.module.scss";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Products data:", data);

        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Debug render
  console.log("Current products in state:", products);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.productList}>
      <div className={styles.container}>
        <div className={styles.productsGrid}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => handleProductClick(product.id)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={product.thumbnail || "/placeholder-image.jpg"}
                    alt={product.name}
                  />
                  <div className={styles.modelOverlay}>
                    <span>MODEL</span>
                    <h3>{product.slug}</h3>
                  </div>
                </div>
                <div className={styles.productSpecs}>
                  <div className={styles.specRow}>
                    <h4 className={styles.productName}>{product.name}</h4>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specValue}>
                      {product.short_description}
                    </span>
                  </div>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noProducts}>Không có sản phẩm nào</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
