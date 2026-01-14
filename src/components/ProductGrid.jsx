import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { getImageUrl } from "../api/FetchData";
import ProductSkeleton from "./ProductSkeleton";

const ProductGrid = ({ products, handleAddToCart, isLoading = false }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        const productLink = product.handle ? `/new-arival/${product.handle}` : `/product/${product.id}`;
        return (
        <div
          key={product.id}
          className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <Link to={productLink} className="block relative" target="_blank" rel="noopener noreferrer">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={
                  imageErrors[product.id]
                    ? "/product-images/product-9.jpg"
                    : getImageUrl(product.images?.[0]?.src) || product.image
                }
                alt={product.name || product.title}
                onError={() => handleImageError(product.id)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                crossOrigin="anonymous"
              />
            </div>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.sale_price && product.sale_price < product.price && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                </span>
              )}
              {product.stock_status === "instock" && (
                <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  In Stock
                </span>
              )}
            </div>
            {/* Quick Action */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                <FiHeart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </Link>

          <div className="p-4">
            {product.categories?.[0]?.name && (
              <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                {product.categories[0].name}
              </span>
            )}
            <Link to={productLink} target="_blank" rel="noopener noreferrer">
              <h3 className="mt-1 text-sm md:text-base font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                {product.name || product.title}
              </h3>
            </Link>
            
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-bold text-indigo-600">
                Rs. {(product.sale_price || product.price).toLocaleString()}
              </span>
              {product.sale_price && product.sale_price < product.price && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                handleAddToCart(product);
                window.dispatchEvent(new Event("open-cart-drawer"));
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-all hover:shadow-lg active:scale-95"
            >
              <FiShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      )})}
    </div>
  );
};

export default ProductGrid;
