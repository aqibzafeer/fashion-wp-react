import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiFilter, FiX } from "react-icons/fi";
import PageHero from "../components/PageHero";
import Pagination from "../components/Pagination";

function NewArrival() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [showFilters, setShowFilters] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://cocobee.com.pk/products.json?limit=5000");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Filter products with "New Arrivals" tag
        const newArrivals = (data?.products || []).filter(
          (product) => product?.tags && product.tags.includes("New Arrivals")
        );

        // Sort by created_at date (newest first)
        newArrivals.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setProducts(newArrivals);
        setFilteredProducts(newArrivals);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(newArrivals.map((p) => p.product_type).filter(Boolean)),
        ];
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (err) {
        setError(err?.message || "Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    setCurrentPage(1);
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.product_type === selectedCategory));
    }
  }, [selectedCategory, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountPercentage = (price, compareAtPrice) => {
    if (!compareAtPrice || parseFloat(compareAtPrice) <= parseFloat(price)) return 0;
    return Math.round((1 - parseFloat(price) / parseFloat(compareAtPrice)) * 100);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, indexOfFirstProduct, indexOfLastProduct]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading New Arrivals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">6a0</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHero
        title="New Arrivals"
        subtitle="Discover our latest collection of trendy and stylish garments. Fresh styles added daily!"
        eyebrow="JUST DROPPED"
        image="/banner-img.jpeg"
        height="md"
        align="center"
      >
        <div className="flex justify-center">
          <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-white">
            {filteredProducts.length} Products Found
          </span>
        </div>
      </PageHero>

      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FiFilter />
              <span className="font-medium">Filter by Category</span>
            </button>

            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                <span>{selectedCategory}</span>
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.replace("Cocobee-", "").replace(/-/g, " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {currentProducts.map((product) => {
                const firstVariant = product.variants[0];
                const discount = getDiscountPercentage(firstVariant?.price, firstVariant?.compare_at_price);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.images[0]?.src || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{discount}%
                        </span>
                      )}

                      {/* New Badge */}
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>

                      {/* Quick Actions */}
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                          <FiShoppingCart size={16} />
                          <span className="hidden sm:inline text-sm">Add</span>
                        </button>
                        <button className="p-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg hover:bg-white hover:text-red-500 transition-colors">
                          <FiHeart size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-indigo-600 font-medium mb-1 uppercase tracking-wide">
                        {product.vendor}
                      </p>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-indigo-600">
                          {formatPrice(firstVariant?.price)}
                        </span>
                        {firstVariant?.compare_at_price &&
                          parseFloat(firstVariant.compare_at_price) > parseFloat(firstVariant.price) && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(firstVariant.compare_at_price)}
                            </span>
                          )}
                      </div>

                      {/* Sizes */}
                      {product.options && product.options[0]?.values && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {product.options[0].values.slice(0, 4).map((size) => (
                            <span key={size} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {size}
                            </span>
                          ))}
                          {product.options[0].values.length > 4 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              +{product.options[0].values.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
          </>
        )}
      </div>
    </div>
  );
}

export default NewArrival;
