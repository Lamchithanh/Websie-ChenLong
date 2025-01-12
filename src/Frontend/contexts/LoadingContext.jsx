import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import Loading from "../Components/Loading/Loading";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const showLoading = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    // Thêm delay nhỏ để tránh loading bar biến mất quá nhanh
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
