import { useEffect } from "react";
import styles from "../../Styles/TruckBrands.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";

const TruckLogos = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 50,
      once: true,
    });
  }, []);

  const brands = [
    {
      name: "Mercedes-Benz Trucks",
      logo: "https://tse4.mm.bing.net/th?id=OIP.n6Yiv_6STS4HBOG4jYXA7wHaHa&pid=Api&P=0&h=220",
    },
    {
      name: "Volvo Trucks",
      logo: "https://tse1.mm.bing.net/th?id=OIP.8inSQ2HfXthvE1Z7vJOCJQHaHv&pid=Api&P=0&h=220",
    },
    {
      name: "Scania",
      logo: "https://tse4.mm.bing.net/th?id=OIP.hOMl8ayhJkLEai9pBR_VVwHaEh&pid=Api&P=0&h=220",
    },
    {
      name: "MAN Truck",
      logo: "https://tse2.mm.bing.net/th?id=OIP.NY-btV2jvL3fgLKRuAy9tgHaEK&pid=Api&P=0&h=220",
    },
    {
      name: "Isuzu",
      logo: "https://tse1.mm.bing.net/th?id=OIP.FrL5SPpUBOOHKFBbIHGFLQHaDB&pid=Api&P=0&h=220",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thương Hiệu Xe Tải Hàng Đầu</h1>
      <p className={styles.title_sub}>
        Top 5 nhà sản xuất xe tải uy tín toàn cầu
      </p>
      <div className={styles.logoGrid}>
        {brands.map((brand, index) => (
          <div key={index} className={styles.logoItem}>
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              data-aos="fade-up"
            />
            <span data-aos="fade-up">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckLogos;
