import React from 'react';

const NewArivalFilters = ({ filters, setFilters, categories }) => {
  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <div className="flex items-center">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select id="sort" value={filters.sort} onChange={handleSortChange} className="border p-2 rounded">
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="category" className="mr-2">Category:</label>
        <select id="category" value={filters.category} onChange={handleCategoryChange} className="border p-2 rounded">
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NewArivalFilters;
