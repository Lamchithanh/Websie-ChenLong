import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Frontend/Page/Home/HomePage";
import ProductDetail from "./Frontend/Page/ProductDetail/ProductDetail";
import PlayOut from "./Frontend/PlayOuts/PlayOut";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayOut />}>
          <Route index element={<HomePage />} />
          <Route path="/product" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
