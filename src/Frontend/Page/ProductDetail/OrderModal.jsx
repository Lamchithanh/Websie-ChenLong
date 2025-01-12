import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../Styles/OrderModal.module.scss";
import {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from "../../services/locationApi.js";
import TermsAndConditions from "../../Components/TermsAndConditions/TermsAndConditions";
import Defaultimage from "../../../assets/Image/Image_Chenglong.jpg";

const OrderModal = ({ isOpen, onClose, productInfo }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [customerType, setCustomerType] = useState("personal"); // "personal" or "company"

  // Fetch provinces when component mounts
  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        const data = await getDistrictsByProvinceCode(selectedProvince);
        setDistricts(data);
        setSelectedDistrict(""); // Reset district when province changes
        setWards([]); // Reset wards when province changes
      } else {
        setDistricts([]);
        setWards([]);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        const data = await getWardsByDistrictCode(selectedDistrict);
        setWards(data);
      } else {
        setWards([]);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi form ở đây
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Thông Tin Đặt Hàng</h2>
          <button className={styles.closeButton} onClick={onClose} title="Đóng">
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.productInfo}>
            <img
              src={productInfo.image || Defaultimage}
              alt={productInfo.name}
              onError={(e) => {
                e.target.src = Defaultimage;
              }}
            />
            <div className={styles.productDetails}>
              <h3>{productInfo.name}</h3>
              <p>Model: {productInfo.model}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.orderForm}>
            <div className={styles.customerTypeSelector}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="customerType"
                  value="personal"
                  checked={customerType === "personal"}
                  onChange={(e) => setCustomerType(e.target.value)}
                />
                <span>Cá nhân</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="customerType"
                  value="company"
                  checked={customerType === "company"}
                  onChange={(e) => setCustomerType(e.target.value)}
                />
                <span>Công ty</span>
              </label>
            </div>

            <div className={styles.formGrid}>
              {/* Cột 1 - Thông tin cá nhân/công ty */}
              <div className={styles.formColumn}>
                <h4>
                  {customerType === "personal"
                    ? "Thông tin cá nhân"
                    : "Thông tin công ty"}
                </h4>

                {customerType === "personal" ? (
                  // Form fields for personal customer
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="fullName">Họ và tên *</label>
                      <input type="text" id="fullName" required />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Số điện thoại *</label>
                      <input
                        type="tel"
                        id="phone"
                        pattern="[0-9]{10}"
                        title="Vui lòng nhập số điện thoại hợp lệ"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email *</label>
                      <input type="email" id="email" required />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="idCard">CMND/CCCD *</label>
                      <input
                        type="text"
                        id="idCard"
                        pattern="[0-9]{9,12}"
                        title="CMND/CCCD phải từ 9-12 số"
                        required
                      />
                    </div>
                  </>
                ) : (
                  // Form fields for company
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="companyName">Tên công ty *</label>
                      <input type="text" id="companyName" required />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="taxCode">Mã số thuế *</label>
                      <input
                        type="text"
                        id="taxCode"
                        pattern="[0-9]{10,13}"
                        title="Mã số thuế phải từ 10-13 số"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="representativeName">
                        Người đại diện *
                      </label>
                      <input type="text" id="representativeName" required />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="companyPhone">
                        Số điện thoại công ty *
                      </label>
                      <input
                        type="tel"
                        id="companyPhone"
                        pattern="[0-9]{10}"
                        title="Vui lòng nhập số điện thoại hợp lệ"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="companyEmail">Email công ty *</label>
                      <input type="email" id="companyEmail" required />
                    </div>
                  </>
                )}
              </div>

              {/* Cột 2 - Thông tin giao hàng */}
              <div className={styles.formColumn}>
                <h4>Thông tin giao hàng</h4>
                <div className={styles.formGroup}>
                  <label htmlFor="province">Tỉnh/Thành phố *</label>
                  <select
                    id="province"
                    required
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="district">Quận/Huyện *</label>
                  <select
                    id="district"
                    required
                    disabled={!selectedProvince}
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="ward">Phường/Xã *</label>
                  <select id="ward" required disabled={!selectedDistrict}>
                    <option value="">Chọn phường/xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="address">Địa chỉ cụ thể *</label>
                  <input type="text" id="address" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="note">Ghi chú thêm</label>
                  <textarea id="note" rows="3"></textarea>
                </div>
              </div>
            </div>

            <div className={styles.termsGroup}>
              <label className={styles.checkbox}>
                <input type="checkbox" required />
                <span>
                  * Tôi đồng ý với các điều khoản và điều kiện mua hàng
                </span>{" "}
                <button
                  className={styles.termsLink}
                  onClick={() => setIsTermsModalOpen(true)}
                  type="button"
                >
                  Xem điều khoản
                </button>
              </label>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Xác nhận đặt hàng
              </button>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>

      <TermsAndConditions
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};

OrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderModal;
