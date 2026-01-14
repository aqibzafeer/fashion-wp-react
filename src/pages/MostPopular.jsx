import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import Pagination from "../components/Pagination";

function MostPopular() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://cocobee.com.pk/products.json?limit=5000");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(Array.isArray(data?.products) ? data.products : []);
      } catch (e) {
        setError(e?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // "Most Popular" heuristic (since API doesn't provide popularity):
  // 1) prefer products that have a common Shopify tag like "Best Seller" / "Bestseller" / "Most Popular"
  // 2) fallback to newest products
  const mostPopularProducts = useMemo(() => {
    const list = [...products];

    const hasPopularTag = (p) => {
      const tags = Array.isArray(p?.tags) ? p.tags : [];
      const t = tags.map((x) => String(x).toLowerCase());
      return (
        t.includes("best seller") ||
        t.includes("bestseller") ||
        t.includes("most popular") ||
        t.includes("popular")
      );
    };

    const tagged = list.filter(hasPopularTag);

    if (tagged.length) {
      // Keep newest-first among tagged
      return tagged.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    // Fallback: newest first
    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [products]);

  useEffect(() => {
    // reset pagination when list changes (e.g. after fetch)
    setCurrentPage(1);
  }, [mostPopularProducts.length]);

  const totalPages = Math.ceil(mostPopularProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = useMemo(() => {
    return mostPopularProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [mostPopularProducts, indexOfFirstProduct, indexOfLastProduct]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Most Popular...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Most Popular"
        subtitle="Browse our most-loved styles. Updated regularly based on store trends."
        eyebrow="TRENDING NOW"
        image="/banner-img.jpeg"
        height="md"
        align="center"
      >
        <div className="flex justify-center">
          <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-white">
            {mostPopularProducts.length} Products Found
          </span>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 py-8">
        {mostPopularProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {currentProducts.map((product) => {
                const firstVariant = product.variants?.[0];
                const discount = getDiscountPercentage(firstVariant?.price, firstVariant?.compare_at_price);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.images?.[0]?.src || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />

                      {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{discount}%
                        </span>
                      )}

                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-indigo-600 font-medium mb-1 uppercase tracking-wide">
                        {product.vendor}
                      </p>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>

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

                      {product.options?.[0]?.values?.length ? (
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
                      ) : null}
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

export default MostPopular;
