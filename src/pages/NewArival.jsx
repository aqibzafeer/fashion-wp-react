import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import NewArivalFilters from '../components/NewArivalFilters';
import AppPagination from '../components/AppPagination';

const NewArival = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ sort: 'default', category: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://cocobee.com.pk/products.json?limit=5000');
        const data = await response.json();
        const formattedProducts = data.products.map(p => ({
          id: p.id,
          title: p.title,
          price: parseFloat(p.variants[0]?.price) || 0,
          image: p.images[0]?.src || 'https://via.placeholder.com/150',
          category: p.product_type,
          handle: p.handle,
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === filters.category);
    }

    // Sort
    if (filters.sort === 'price-asc') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'name-asc') {
      tempProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sort === 'name-desc') {
      tempProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(tempProducts);
    setCurrentPage(1); // Reset to first page on filter change
  }, [products, filters]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Arrivals</h1>
      <NewArivalFilters filters={filters} setFilters={setFilters} categories={categories} />
      <div className="text-sm text-gray-600 mb-4">
        Showing {currentProducts.length} of {filteredProducts.length} products
      </div>
      <ProductList products={currentProducts} loading={loading} error={error} />
      <AppPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default NewArival;
