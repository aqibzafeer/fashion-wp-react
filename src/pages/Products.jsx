import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductSkeleton from "../components/ProductSkeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import ProductFilters from "../components/ProductFilters";
import PageHero from "../components/PageHero";

const Product = () => {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const {
    loading,
    categories,
    priceSort,
    alphaSort,
    categorySort,
    stockFilter,
    priceRange,
    currentPage,
    searchTerm,
    setPriceSort,
    setAlphaSort,
    setCategorySort,
    setStockFilter,
    setPriceRange,
    setCurrentPage,
    setSearchTerm,
    filteredProducts,
    currentProducts,
    totalPages,
    activeFiltersCount,
    priceStats,
    clearAllFilters,
    goToPage,
    indexOfFirstProduct,
    indexOfLastProduct,
  } = useProducts();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "colored",
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHero
        title="Explore Our Collection"
        subtitle={`${filteredProducts.length} products available`}
        eyebrow="SHOP"
        image="/banner-img.jpeg"
        height="md"
        align="center"
      >
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full pl-12 pr-12 py-3.5 bg-white/95 backdrop-blur rounded-full shadow-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              categorySort === "all"
                ? "bg-white text-indigo-700 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            onClick={() => {
              setCategorySort("all");
              setCurrentPage(1);
            }}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                categorySort === cat
                  ? "bg-white text-indigo-700 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={() => {
                setCategorySort(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </PageHero>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <ProductFilters
          priceSort={priceSort}
          setPriceSort={setPriceSort}
          alphaSort={alphaSort}
          setAlphaSort={setAlphaSort}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setCurrentPage={setCurrentPage}
          priceStats={priceStats}
          activeFiltersCount={activeFiltersCount}
          clearAllFilters={clearAllFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          indexOfFirstProduct={indexOfFirstProduct}
          indexOfLastProduct={indexOfLastProduct}
          filteredProducts={filteredProducts}
        />

        {/* Products Display */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : currentProducts.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              <ProductGrid products={currentProducts} handleAddToCart={handleAddToCart} isLoading={false} />
            ) : (
              <ProductList products={currentProducts} handleAddToCart={handleAddToCart} />
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FiSearch className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
