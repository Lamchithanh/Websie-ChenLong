import styles from "../../Styles/TruckOrdersPage.module.scss";
import { useState } from "react";
import {
  Calendar,
  Truck,
  Package,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TruckOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const orderList = [
    {
      id: 1,
      date: "2025-01-15",
      status: "Đã Giao",
      items: [
        { name: "Xe Tải Model A", quantity: 1, price: 50000 },
        { name: "Xe Tải Model B", quantity: 2, price: 75000 },
      ],
      total: 200000,
      estimatedDelivery: "2025-01-20",
      trackingNumber: "TRK123456789",
      deliveryAddress: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
      paymentMethod: "Chuyển khoản ngân hàng",
    },
    {
      id: 2,
      date: "2025-01-10",
      status: "Đang Xử Lý",
      items: [{ name: "Xe Tải Model C", quantity: 1, price: 60000 }],
      total: 60000,
      estimatedDelivery: "2025-01-25",
      trackingNumber: "TRK987654321",
      deliveryAddress: "456 Lê Duẩn, Quận 1, TP.HCM",
      paymentMethod: "Thanh toán khi nhận hàng",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "đã giao":
        return styles.statusDelivered;
      case "đang xử lý":
        return styles.statusProcessing;
      case "đang giao":
        return styles.statusShipping;
      default:
        return styles.statusDefault;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 23000); // Chuyển đổi USD sang VND
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Đơn Hàng Của Tôi</h1>
        <p className={styles.subtitle}>
          Theo dõi và quản lý đơn hàng xe tải của bạn
        </p>
      </header>

      <div className={styles.ordersList}>
        {orderList.length > 0 ? (
          orderList.map((order) => (
            <div
              key={order.id}
              className={`${styles.orderCard} ${
                selectedOrder === order.id ? styles.selected : ""
              }`}
            >
              <div
                className={styles.orderHeader}
                onClick={() =>
                  setSelectedOrder(selectedOrder === order.id ? null : order.id)
                }
              >
                <div className={styles.orderInfo}>
                  <div className={styles.orderIdGroup}>
                    <Package className={styles.icon} size={20} />
                    <h2>Đơn Hàng #{order.id}</h2>
                  </div>
                  <span className={styles.orderDate}>
                    <Calendar className={styles.icon} size={16} />
                    {formatDate(order.date)}
                  </span>
                </div>
                <div className={styles.headerRight}>
                  <span
                    className={`${styles.status} ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  {selectedOrder === order.id ? (
                    <ChevronUp className={styles.chevron} size={20} />
                  ) : (
                    <ChevronDown className={styles.chevron} size={20} />
                  )}
                </div>
              </div>

              <div
                className={`${styles.orderDetails} ${
                  selectedOrder === order.id ? styles.expanded : ""
                }`}
              >
                <div className={styles.trackingInfo}>
                  <div className={styles.infoGroup}>
                    <label>Mã Vận Đơn</label>
                    <span>{order.trackingNumber}</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label>Dự Kiến Giao Hàng</label>
                    <span className={styles.estimatedDelivery}>
                      <Clock className={styles.icon} size={16} />
                      {formatDate(order.estimatedDelivery)}
                    </span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label>Địa Chỉ Giao Hàng</label>
                    <span>{order.deliveryAddress}</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label>Phương Thức Thanh Toán</label>
                    <span>{order.paymentMethod}</span>
                  </div>
                </div>

                <div className={styles.itemsList}>
                  <h3>Sản Phẩm Đã Đặt</h3>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemNameGroup}>
                          <Truck className={styles.icon} size={20} />
                          <span className={styles.itemName}>{item.name}</span>
                        </div>
                        <span className={styles.itemQuantity}>
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                      <span className={styles.itemPrice}>
                        <span
                          className={styles.detailsButton}
                          onClick={() => navigate(`/invoice/${order.id}`)}
                        >
                          Xem chi tiết
                        </span>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.total}>
                    <span>Tổng Tiền</span>
                    <span className={styles.totalAmount}>
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <Truck size={48} className={styles.emptyIcon} />
            <p>Bạn chưa có đơn hàng nào</p>
            <button className={styles.shopButton}>Bắt Đầu Mua Sắm</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TruckOrdersPage;
