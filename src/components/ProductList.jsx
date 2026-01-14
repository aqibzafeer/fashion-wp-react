import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import stripHtml from "../utils/stripHtml";

const ProductList = ({ products, handleAddToCart }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row">
            <Link to={`/product/${product.id}`} className="sm:w-48 md:w-56 flex-shrink-0">
              <div className="aspect-square sm:aspect-auto sm:h-full bg-gray-100">
                <img
                  src={product.images?.[0]?.src || "/product-images/product-9.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {product.categories?.[0]?.name && (
                      <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                        {product.categories[0].name}
                      </span>
                    )}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="mt-1 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sale_price && product.sale_price < product.price && (
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                        -{Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                      </span>
                    )}
                    {product.stock_status === "instock" && (
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    )}
                  </div>
                </div>
                {product.short_description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {stripHtml(product.short_description)}
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-indigo-600">
                    Rs. {(product.sale_price || product.price).toLocaleString()}
                  </span>
                  {product.sale_price && product.sale_price < product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-xl font-medium text-sm transition-all hover:shadow-lg active:scale-95"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
