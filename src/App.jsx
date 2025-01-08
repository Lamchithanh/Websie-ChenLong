import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayOut from "./Frontend/PlayOuts/PlayOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Frontend/Page/Home/HomePage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PlayOut />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
