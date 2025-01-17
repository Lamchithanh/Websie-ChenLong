import { useEffect, useState } from "react";
import styles from "../../Styles/CustomerProfile.module.scss";
import DefaultAvatar from "../../../assets/Image/avatar.jpg";
import { toast } from "react-toastify";
import { API_URL } from "../../../config/api.js";

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 2;

  const [customerInfo, setCustomerInfo] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      idCard: "",
      avatar: null,
    },
    address: {
      streetAddress: "",
      ward: "",
      district: "",
      province: "",
    },
    purchaseHistory: [
      {
        id: "DH001",
        date: "2024-01-15",
        carModel: "VinFast VF8",
        price: "1,200,000,000 VNĐ",
        status: "Đã giao",
        color: "Đen",
        paymentMethod: "Trả góp",
        dealerLocation: "VinFast Landmark 81",
      },
      {
        id: "DH002",
        date: "2023-12-20",
        carModel: "VinFast VF e34",
        price: "690,000,000 VNĐ",
        status: "Đang xử lý",
        color: "Xanh",
        paymentMethod: "Thanh toán một lần",
        dealerLocation: "VinFast Thủ Đức",
      },
      {
        id: "DH003",
        date: "2023-11-05",
        carModel: "VinFast VF5",
        price: "458,000,000 VNĐ",
        status: "Đã hủy",
        color: "Trắng",
        paymentMethod: "Trả góp",
        dealerLocation: "VinFast Quận 7",
      },
    ],
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const userId = userInfo?.id;

        console.log("User ID from localStorage:", userId); // Log để kiểm tra

        if (!userId) {
          throw new Error("User ID không tồn tại trong localStorage");
        }

        const response = await fetch(
          `${API_URL}/customer/profile?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Không thể lấy thông tin khách hàng"
          );
        }

        const { data, success } = await response.json();

        if (!success) {
          throw new Error("Không thể lấy thông tin khách hàng");
        }

        setCustomerInfo((prevState) => ({
          ...prevState,
          personalInfo: {
            fullName: data.personalInfo.fullName || "",
            email: data.personalInfo.email || "",
            phone: data.personalInfo.phone || "",
            idCard: data.personalInfo.idCard || "",
            avatar: data.personalInfo.avatar,
          },
          address: {
            streetAddress: data.address.streetAddress || "",
            ward: data.address.ward || "",
            district: data.address.district || "",
            province: data.address.province || "",
          },
        }));
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setCustomerInfo((prevState) => ({
          ...prevState,
          personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            idCard: "",
            avatar: null,
          },
          address: {
            streetAddress: "",
            ward: "",
            district: "",
            province: "",
          },
        }));
      }
    };

    fetchCustomerData();
  }, []);

  const handleSave = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo?.id;

      if (!userId) {
        toast.error(
          "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }

      const updateData = {
        personalInfo: {
          fullName: customerInfo.personalInfo.fullName,
          phone: customerInfo.personalInfo.phone,
          idCard: customerInfo.personalInfo.idCard,
          avatar: customerInfo.personalInfo.avatar,
        },
        address: {
          streetAddress: customerInfo.address.streetAddress,
          ward: customerInfo.address.ward,
          district: customerInfo.address.district,
          province: customerInfo.address.province,
        },
      };

      const response = await fetch(
        `${API_URL}/customer/profile?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Cập nhật thông tin thành công!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#ff4d4f",
            color: "white",
          },
        });
        setIsEditing(false);
      } else {
        throw new Error(result.message || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      toast.error(
        error.message || "Có lỗi xảy ra trong quá trình cập nhật thông tin",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#ef4444",
            color: "white",
          },
        }
      );
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceCode) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      const data = await response.json();
      setDistricts(data.districts);
      setSelectedDistrict("");
      setSelectedWard("");
      setWards([]);

      setCustomerInfo((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          province: data.name,
          district: "",
          ward: "",
        },
      }));
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWards = async (districtCode) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      const data = await response.json();
      setWards(data.wards);
      setSelectedWard("");

      setCustomerInfo((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          district: data.name,
          ward: "",
        },
      }));
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleWardChange = (wardCode) => {
    const selectedWard = wards.find((ward) => ward.code === parseInt(wardCode));
    setSelectedWard(wardCode);

    setCustomerInfo((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        ward: selectedWard.name,
      },
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?.id;

    if (!userId) {
      toast.error("User ID không tồn tại");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(
        `${API_URL}/customer/profile/avatar?userId=${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Cập nhật ảnh đại diện thành công!");
        setCustomerInfo((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            avatar: result.avatarPath,
          },
        }));
      } else {
        throw new Error(result.message || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật ảnh đại diện:", error);
      toast.error("Có lỗi xảy ra khi cập nhật ảnh đại diện");
    }
  };

  const getFilteredAndPaginatedOrders = () => {
    const filtered =
      statusFilter === "all"
        ? customerInfo?.purchaseHistory || []
        : (customerInfo?.purchaseHistory || []).filter(
            (order) => order.status.toLowerCase() === statusFilter
          );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      orders: filtered.slice(startIndex, endIndex),
      totalPages: Math.ceil(filtered.length / itemsPerPage) || 1,
      totalOrders: filtered.length,
    };
  };

  const renderPersonalInfoForm = () => (
    <div className={styles.infoGrid}>
      <div className={styles.infoItem}>
        <label>Khách hàng:</label>
        {isEditing ? (
          <input
            type="text"
            value={customerInfo.personalInfo.fullName}
            onChange={(e) =>
              handlePersonalInfoChange("fullName", e.target.value)
            }
          />
        ) : (
          <span>{customerInfo.personalInfo.fullName || "Chưa cập nhật"}</span>
        )}
      </div>

      <div className={styles.infoItem}>
        <label>Số điện thoại:</label>
        {isEditing ? (
          <input
            type="text"
            value={customerInfo.personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
          />
        ) : (
          <span>{customerInfo.personalInfo.phone || "Chưa cập nhật"}</span>
        )}
      </div>

      <div className={styles.infoItem}>
        <label>Email:</label>
        <span>{customerInfo.personalInfo.email || "Chưa cập nhật"}</span>
      </div>

      <div className={styles.infoItem}>
        <label>CMND/CCCD:</label>
        {isEditing ? (
          <input
            type="text"
            value={customerInfo.personalInfo.idCard}
            onChange={(e) => handlePersonalInfoChange("idCard", e.target.value)}
          />
        ) : (
          <span>{customerInfo.personalInfo.idCard || "Chưa cập nhật"}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Thông Tin Khách Hàng</h1>
        <div className={styles.headerActions}>
          {isEditing ? (
            <button className={styles.saveButton} onClick={handleSave}>
              Lưu thông tin
            </button>
          ) : (
            <button className={styles.editButton} onClick={handleEdit}>
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <img
            src={customerInfo?.personalInfo?.avatar || DefaultAvatar}
            alt="Avatar"
            className={styles.avatar}
            onError={(e) => {
              e.target.src = DefaultAvatar;
            }}
          />
          {isEditing && (
            <>
              <button
                className={styles.changeAvatarButton}
                onClick={() => document.getElementById("avatarInput").click()}
              >
                Thay đổi ảnh đại diện
              </button>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.sectionTitle}>Thông tin cá nhân</div>
          {renderPersonalInfoForm()}
          <div className={styles.sectionTitle}>Địa chỉ</div>
          <div className={styles.addressInfo}>
            {isEditing ? (
              <>
                <div className={styles.infoItem}>
                  <label>Tỉnh/Thành phố:</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      fetchDistricts(e.target.value);
                    }}
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.infoItem}>
                  <label>Quận/Huyện:</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      fetchWards(e.target.value);
                    }}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.infoItem}>
                  <label>Phường/Xã:</label>
                  <select
                    value={selectedWard}
                    onChange={(e) => handleWardChange(e.target.value)}
                    disabled={!selectedDistrict}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.infoItem}>
                  <label>Địa chỉ cụ thể:</label>
                  <input
                    type="text"
                    value={customerInfo.address.streetAddress}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: {
                          ...customerInfo.address,
                          streetAddress: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </>
            ) : (
              <p className={styles.fullAddress}>
                {customerInfo?.address
                  ? `${customerInfo.address.streetAddress || "Cần bổ sung"}, ${
                      customerInfo.address.ward || "..."
                    }, ${customerInfo.address.district || "..."}, ${
                      customerInfo.address.province || "..."
                    }`
                  : "Đang tải thông tin..."}
              </p>
            )}
          </div>
        </div>

        <div className={styles.purchaseSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Lịch sử mua hàng</div>
            <div className={styles.filterSection}>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
                }}
                className={styles.statusFilter}
              >
                <option value="all">Tất cả đơn hàng</option>
                <option value="đã giao">Đã giao</option>
                <option value="đang xử lý">Đang xử lý</option>
                <option value="đã hủy">Đã hủy</option>
              </select>
            </div>
          </div>
          {customerInfo.purchaseHistory.length > 0 ? (
            <>
              <div className={styles.purchaseHistory}>
                {getFilteredAndPaginatedOrders().orders.map(
                  (purchase, index) => (
                    <div key={index} className={styles.purchaseItem}>
                      <div className={styles.purchaseHeader}>
                        <div className={styles.orderInfo}>
                          <span className={styles.orderId}>
                            Mã đơn: {purchase.id}
                          </span>
                          <br />
                          <span className={styles.orderDate}>
                            Ngày đặt: {formatDate(purchase.date)}
                          </span>
                        </div>
                        <span
                          className={`${styles.orderStatus} ${
                            styles[
                              purchase.status.toLowerCase().replace(" ", "")
                            ]
                          }`}
                        >
                          {purchase.status}
                        </span>
                      </div>
                      <div className={styles.purchaseDetails}>
                        <div className={styles.carInfo}>
                          <h4>{purchase.carModel}</h4>
                          <p>Màu: {purchase.color}</p>
                          <p>Giá: {purchase.price}</p>
                        </div>
                        <div className={styles.purchaseInfo}>
                          <p>
                            Phương thức thanh toán: {purchase.paymentMethod}
                          </p>
                          <p>Địa điểm nhận xe: {purchase.dealerLocation}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              {/* Phân trang */}
              <div className={styles.pagination}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  &lt;
                </button>

                <span className={styles.pageInfo}>
                  {currentPage} / {getFilteredAndPaginatedOrders().totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        getFilteredAndPaginatedOrders().totalPages
                      )
                    )
                  }
                  disabled={
                    currentPage === getFilteredAndPaginatedOrders().totalPages
                  }
                  className={styles.pageButton}
                >
                  &gt;
                </button>
              </div>
              <div className={styles.orderSummary}>
                Hiển thị {getFilteredAndPaginatedOrders().orders.length} /{" "}
                {getFilteredAndPaginatedOrders().totalOrders} đơn hàng
              </div>
            </>
          ) : (
            <p className={styles.noPurchases}>Chưa có lịch sử mua hàng</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
