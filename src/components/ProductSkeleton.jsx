import React from "react";

/**
 * ProductSkeleton Component
 * Shows a loading skeleton for a single product card
 */
const ProductSkeleton = () => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square overflow-hidden bg-linear-to-r from-gray-200 to-gray-300">
        <div className="w-full h-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category Skeleton */}
        <div className="h-3 w-24 bg-linear-to-r from-gray-200 to-gray-300 rounded-full" />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded" />
          <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-5/6" />
        </div>

        {/* Price Skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-20 bg-linear-to-r from-gray-200 to-gray-300 rounded" />
          <div className="h-5 w-20 bg-linear-to-r from-gray-200 to-gray-300 rounded" />
        </div>

        {/* Button Skeleton */}
        <div className="pt-2">
          <div className="h-10 bg-linear-to-r from-gray-200 to-gray-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
