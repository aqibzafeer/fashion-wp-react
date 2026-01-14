import React from "react";
import { FiFilter, FiX, FiGrid, FiList } from "react-icons/fi";

const ProductFilters = ({
  priceSort,
  setPriceSort,
  alphaSort,
  setAlphaSort,
  stockFilter,
  setStockFilter,
  priceRange,
  setPriceRange,
  setCurrentPage,
  priceStats,
  activeFiltersCount,
  clearAllFilters,
  showFilters,
  setShowFilters,
  viewMode,
  setViewMode,
  indexOfFirstProduct,
  indexOfLastProduct,
  filteredProducts,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-sm md:text-base">
            Showing <span className="font-semibold text-gray-900">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of{" "}
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all md:hidden ${
              showFilters ? "bg-indigo-50 border-indigo-300 text-indigo-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FiFilter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Right side - Sort & View */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <select
              value={priceSort}
              onChange={(e) => { setPriceSort(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Price</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>

            <select
              value={alphaSort}
              onChange={(e) => { setAlphaSort(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Name</option>
              <option value="a-z">A to Z</option>
              <option value="z-a">Z to A</option>
            </select>

            <select
              value={stockFilter}
              onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Items</option>
              <option value="instock">In Stock</option>
              <option value="onsale">On Sale</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiX className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filters Panel */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 md:hidden">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                placeholder={`Rs. ${priceStats.min}`}
                value={priceRange.min}
                onChange={(e) => { setPriceRange({ ...priceRange, min: e.target.value }); setCurrentPage(1); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                placeholder={`Rs. ${priceStats.max}`}
                value={priceRange.max}
                onChange={(e) => { setPriceRange({ ...priceRange, max: e.target.value }); setCurrentPage(1); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Price Range */}
      <div className="hidden md:flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-700">Price Range:</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={`Min (${priceStats.min})`}
            value={priceRange.min}
            onChange={(e) => { setPriceRange({ ...priceRange, min: e.target.value }); setCurrentPage(1); }}
            className="w-28 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            placeholder={`Max (${priceStats.max})`}
            value={priceRange.max}
            onChange={(e) => { setPriceRange({ ...priceRange, max: e.target.value }); setCurrentPage(1); }}
            className="w-28 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
