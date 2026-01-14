import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </p>
      <nav className="flex items-center gap-1">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={index}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm transition-colors ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          }
          if (
            (page === currentPage - 2 && currentPage > 3) ||
            (page === currentPage + 2 && currentPage < totalPages - 2)
          ) {
            return (
              <span key={index} className="px-2 text-gray-400">
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
