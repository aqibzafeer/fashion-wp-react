import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load all pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const NewArrival = lazy(() => import("./pages/NewArrival"));
const MostPopular = lazy(() => import("./pages/MostPopular"));
const NewArival = lazy(() => import("./pages/NewArival"));
const SingleArivalProduct = lazy(() => import("./pages/SingleArivalProduct"));
const Cart = lazy(() => import("./pages/Cart"));
const WordPressAdmin = lazy(() => import("./pages/WordPressAdmin"));

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/new-arrivals" element={<NewArrival />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>

        <Route path="/admin" element={<WordPressAdmin />} />
        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;