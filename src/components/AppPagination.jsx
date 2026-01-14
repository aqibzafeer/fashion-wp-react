import React from 'react';

const AppPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 border rounded bg-gray-200 disabled:opacity-50"
      >
        &laquo;
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 mx-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : ''}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 border rounded bg-gray-200 disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
};

export default AppPagination;
