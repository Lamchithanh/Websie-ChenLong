import styles from "../../Styles/InvoicePage.module.scss";
import Logo from "../../../assets/Image/Error.png";
import { QRCode } from "react-qr-code";

const InvoiceTemplate = () => {
  return (
    <div className={styles.invoicePage}>
      <div className={styles.invoiceFrame}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.companyInfo}>
            <div className={styles.logoSection}>
              <img src={Logo} alt="Soft Dreams Logo" className={styles.logo} />
              <div className={styles.logoText}>
                <span>CTY CTCOIN</span>
                <span className={styles.slogan}>Make IT Simple</span>
              </div>
            </div>
            <div className={styles.companyDetails}>
              <div className={styles.companyName}>
                CÔNG TY CP ĐẦU TƯ CÔNG NGHỆ VÀ THƯƠNG MẠI CTCOIN
              </div>
              <div className={styles.info}>
                <span className={styles.label}>Mã số thuế (Tax code):</span>
                <span>0105987432-999</span>
              </div>
              <div className={styles.info}>
                <span className={styles.label}>Địa chỉ (Address):</span>
                <span>
                  Nhà khách ATS, số 8 Phạm Hùng, P. Mễ Trì, Q.Nam Từ Liêm, Hà
                  Nội
                </span>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.info}>
                  <span className={styles.label}>Điện thoại (Tel):</span>
                  <span>0981 772 388</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.label}>Fax:</span>
                  <span>0919 510 089</span>
                </div>
              </div>
              <div className={styles.info}>
                <span className={styles.label}>Email:</span>
                <span>contact@softdreams.vn</span>
              </div>
              <div className={styles.info}>
                <span className={styles.label}>Tài khoản (A/C number):</span>
                <span>0123456789123</span>
                <span className={styles.bank}>
                  Ngân hàng TMCP Ngoại Thương Việt Nam
                </span>
              </div>
            </div>
          </div>

          <div className={styles.qrCode}>
            {/* QR Code Section */}
            <QRCode
              value="https://example.com"
              size={128}
              className={styles.qrCodeImage}
            />
          </div>
        </div>

        {/* Invoice Title Section */}
        <div className={styles.invoiceTitle}>
          <h1>HÓA ĐƠN BÁN HÀNG</h1>
          <div className={styles.invoiceSubtitle}>
            (Dùng cho tổ chức, cá nhân trong khu phi thuế quan)
          </div>
          <div className={styles.invoiceSubtitle}>
            (For organizations and individuals in non-tariff areas)
          </div>
          <div className={styles.invoiceInfo}>
            <div className={styles.formInfo}>
              <span>Mẫu số (Form):</span>
              <span className={styles.highlight}>07KPTQ0/002</span>
            </div>
            <div className={styles.serialInfo}>
              <span>Ký hiệu (Serial):</span>
              <span className={styles.highlight}>AA/19E</span>
            </div>
            <div className={styles.numberInfo}>
              <span>Số (No.):</span>
              <span className={styles.highlight}>0000000</span>
            </div>
          </div>
        </div>

        {/* Buyer Information Section */}
        <div className={styles.buyerInfo}>
          <div className={styles.field}>
            <span className={styles.label}>Họ tên người mua hàng (Buyer):</span>
            <span className={styles.value}></span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Tên đơn vị (Company's name):</span>
            <span className={styles.value}></span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Mã số thuế (Tax code):</span>
            <span className={styles.value}></span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Địa chỉ (Address):</span>
            <span className={styles.value}></span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Số tài khoản (A/C number):</span>
            <span className={styles.value}></span>
          </div>
          <div className={styles.paymentSection}>
            <div className={styles.field}>
              <span className={styles.label}>
                Hình thức thanh toán (Payment method):
              </span>
              <span className={styles.value}></span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Đơn vị tiền tệ (Currency):</span>
              <span className={styles.value}></span>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th rowSpan="2">STT (No.)</th>
              <th rowSpan="2">Tên hàng hóa, dịch vụ (Description)</th>
              <th rowSpan="2">Đơn vị tính (Unit)</th>
              <th rowSpan="2">Số lượng (Quantity)</th>
              <th rowSpan="2">Đơn giá (Unit price)</th>
              <th rowSpan="2">Thành tiền (Amount)</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Section */}
        <div className={styles.footer}>
          <div className={styles.exchangeRate}>
            <span className={styles.label}>Tỷ giá (Exchange rate):</span>
            <span className={styles.value}></span>
          </div>
          <div className={styles.totalAmount}>
            <span className={styles.label}>Cộng tiền hàng (Total amount):</span>
            <span className={styles.value}></span>
          </div>
          <div className={styles.amountInWords}>
            <span className={styles.label}>
              Số tiền viết bằng chữ (Amount in words):
            </span>
            <span className={styles.value}></span>
          </div>

          <div className={styles.signatures}>
            <div className={styles.buyer}>
              <div className={styles.title}>Người mua hàng (Buyer)</div>
              <div className={styles.subtitle}>(Ký, ghi rõ họ tên)</div>
            </div>
            <div className={styles.seller}>
              <div className={styles.title}>Người bán hàng (Seller)</div>
              <div className={styles.stamp}>
                <div className={styles.stampContent}>
                  <div>Mẫu</div>
                  <div>Ký bởi: CÔNG TY CP ĐẦU TƯ CÔNG</div>
                  <div>NGHỆ VÀ THƯƠNG MẠI SOFTDREAMS</div>
                  <div>Ký ngày:</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.pageControl}>
          <div className={styles.pageNumber}>
            <span>Trang tra cứu:</span>
            <span className={styles.value}>Mã tra cứu:</span>
          </div>
          <div className={styles.verification}>
            (Cần kiểm tra, đối chiếu khi lập, giao, nhận hóa đơn)
          </div>
        </div>

        <div className={styles.provider}>
          Đơn vị cung cấp giải pháp: Công ty cổ phần đầu tư công nghệ và thương
          mại SOFTDREAMS, MST: 0105987432, http://easyinvoice.vn/
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
