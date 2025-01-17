import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "./Frontend/contexts/LoadingContext";
import HomePage from "./Frontend/Page/Home/HomePage";
import ProductDetail from "./Frontend/Page/ProductDetail/ProductDetail";
import PlayOut from "./Frontend/PlayOuts/PlayOut";
import Login from "./Frontend/Components/Auth/Login";
import Register from "./Frontend/Components/Auth/Register";
import BackToTop from "./Frontend/Components/BackToTop/BackToTop";
import ProductList from "./Frontend/Components/ProductList/ProductList";
import NotFound from "./Frontend/Page/Content/NotFound";
import CustomerProfile from "./Frontend/Page/CustomerProfile/CustomerProfile";
import TruckOrdersPage from "./Frontend/Page/TruckOrdersPage/TruckOrdersPage";
import InvoiceTemplate from "./Frontend/Page/InvoicePage/InvoicePage";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{
            "--toastify-color-success": "#ff4d4f",
            "--toastify-color-error": "#ff4d4f",
            "--toastify-icon-color-success": "#ff4d4f",
            "--toastify-icon-color-error": "#ff4d4f",
          }}
        />
        <Routes>
          <Route path="/" element={<PlayOut />}>
            <Route index element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/customer-profile" element={<CustomerProfile />} />
            <Route path="/truck-orders" element={<TruckOrdersPage />} />
            <Route path="/invoice/:id" element={<InvoiceTemplate />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BackToTop />
      </Router>
    </LoadingProvider>
  );
}

export default App;
