import axios from 'axios';

const BASE_URL = import.meta.env.VITE_WOO_API_BASE_URL || "https://ambalafoods.crea8ive.solutions/wp-json/wc/v3";
const CONSUMER_KEY = import.meta.env.VITE_WOO_CUSTOMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WOO_CONSUMER_SECRET;

// Create axios instance with WooCommerce authentication
const wooAPI = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================
// PRODUCTS API
// ============================================

/**
 * Fetch all products with optional filters
 * @param {Object} params - Query parameters (per_page, page, category, search, etc.)
 * @returns {Promise<Array>} Array of products
 */
export const fetchWooProducts = async (params = {}) => {
  try {
    const response = await wooAPI.get('/products', { 
      params: {
        per_page: 100,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchWooProduct = async (id) => {
  try {
    const response = await wooAPI.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Search products by keyword
 * @param {string} search - Search keyword
 * @returns {Promise<Array>} Array of matching products
 */
export const searchWooProducts = async (search) => {
  try {
    const response = await wooAPI.get('/products', {
      params: { search, per_page: 50 }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch products by category
 * @param {number} categoryId - Category ID
 * @returns {Promise<Array>} Array of products in category
 */
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await wooAPI.get('/products', {
      params: { category: categoryId, per_page: 100 }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================
// CATEGORIES API
// ============================================

/**
 * Fetch all product categories
 * @returns {Promise<Array>} Array of categories
 */
export const fetchWooCategories = async () => {
  try {
    const response = await wooAPI.get('/products/categories', {
      params: { per_page: 100 }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================
// ORDERS API
// ============================================

/**
 * Create a new order
 * @param {Object} orderData - Order data (billing, shipping, line_items, etc.)
 * @returns {Promise<Object>} Created order object
 */
export const createWooOrder = async (orderData) => {
  try {
    const response = await wooAPI.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch orders for a specific customer
 * @param {number} customerId - Customer ID
 * @returns {Promise<Array>} Array of orders
 */
export const fetchWooOrders = async (customerId) => {
  try {
    const params = customerId ? { customer: customerId } : {};
    const response = await wooAPI.get('/orders', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch a single order by ID
 * @param {number} orderId - Order ID
 * @returns {Promise<Object>} Order object
 */
export const fetchWooOrder = async (orderId) => {
  try {
    const response = await wooAPI.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing order
 * @param {number} orderId - Order ID
 * @param {Object} orderData - Updated order data
 * @returns {Promise<Object>} Updated order object
 */
export const updateWooOrder = async (orderId, orderData) => {
  try {
    const response = await wooAPI.put(`/orders/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================
// CUSTOMERS API
// ============================================

/**
 * Create a new customer
 * @param {Object} customerData - Customer data (email, first_name, last_name, etc.)
 * @returns {Promise<Object>} Created customer object
 */
export const createWooCustomer = async (customerData) => {
  try {
    const response = await wooAPI.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch customer by ID
 * @param {number} customerId - Customer ID
 * @returns {Promise<Object>} Customer object
 */
export const fetchWooCustomer = async (customerId) => {
  try {
    const response = await wooAPI.get(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update customer information
 * @param {number} customerId - Customer ID
 * @param {Object} customerData - Updated customer data
 * @returns {Promise<Object>} Updated customer object
 */
export const updateWooCustomer = async (customerId, customerData) => {
  try {
    const response = await wooAPI.put(`/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================
// PRODUCT REVIEWS API
// ============================================

/**
 * Fetch reviews for a product
 * @param {number} productId - Product ID
 * @returns {Promise<Array>} Array of reviews
 */
export const fetchProductReviews = async (productId) => {
  try {
    const response = await wooAPI.get('/products/reviews', {
      params: { product: productId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Create a product review
 * @param {Object} reviewData - Review data (product_id, review, reviewer, rating)
 * @returns {Promise<Object>} Created review object
 */
export const createProductReview = async (reviewData) => {
  try {
    const response = await wooAPI.post('/products/reviews', reviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================
// CART & CHECKOUT HELPERS
// ============================================

/**
 * Validate product stock before checkout
 * @param {Array} cartItems - Array of cart items with {id, quantity}
 * @returns {Promise<Object>} Validation result {valid: boolean, errors: Array}
 */
export const validateCartStock = async (cartItems) => {
  const errors = [];
  
  for (const item of cartItems) {
    try {
      const product = await fetchWooProduct(item.id);
      
      if (!product.in_stock) {
        errors.push(`${product.name} is out of stock`);
      } else if (product.stock_quantity && item.quantity > product.stock_quantity) {
        errors.push(`Only ${product.stock_quantity} units of ${product.name} available`);
      }
    } catch {
      errors.push(`Error validating ${item.name || item.id}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export default wooAPI;
