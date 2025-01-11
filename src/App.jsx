import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Frontend/Page/Home/HomePage";
import ProductDetail from "./Frontend/Page/ProductDetail/ProductDetail";
import PlayOut from "./Frontend/PlayOuts/PlayOut";
import Login from "./Frontend/Components/Auth/Login";
import Register from "./Frontend/Components/Auth/Register";
import BackToTop from "./Frontend/Components/BackToTop/BackToTop";
import ProductList from "./Frontend/Components/ProductList/ProductList";

function App() {
  return (
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
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/product-list" element={<ProductList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <BackToTop />
    </Router>
  );
}

export default App;
