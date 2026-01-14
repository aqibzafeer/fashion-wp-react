import { BrowserRouter as Router } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppRoutes from "./routes";
import SearchProvider from "./context/SearchProvider";
import CartProvider from "./context/CartProvider";
import ScrollToTop from "./components/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";

// Lazy load ToastContainer to reduce initial bundle
const LazyToastContainer = lazy(() =>
  import("react-toastify").then(module => ({
    default: module.ToastContainer
  }))
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <SearchProvider>
          <AppRoutes />
          <Suspense fallback={null}>
            <LazyToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="light"
            />
          </Suspense>
        </SearchProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
