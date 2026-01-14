import axios from "axios";

// WooCommerce REST API Configuration
const API_BASE_URL = import.meta.env.VITE_WOO_API_BASE_URL || "https://ambalafoods.crea8ive.solutions/wp-json/wc/v3";
const CUSTOMER_KEY = import.meta.env.VITE_WOO_CUSTOMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WOO_CONSUMER_SECRET;
const WORDPRESS_BASE = "https://ambalafoods.crea8ive.solutions";
const JWT_AUTH_URL = import.meta.env.VITE_JWT_AUTH_URL || `${WORDPRESS_BASE}/wp-json/jwt-auth/v1`;

// Create axios instance with WooCommerce authentication
const wooCommerceAPI = axios.create({
  baseURL: API_BASE_URL,
  auth: {
    username: CUSTOMER_KEY,
    password: CONSUMER_SECRET,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle CORS and add auth tokens
wooCommerceAPI.interceptors.request.use((config) => {
  // Add User-Agent header for compatibility
  config.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
  
  // Add JWT token if available (for customer-specific requests)
  const token = localStorage.getItem("woo_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  
  return config;
});

//═══════════════════════════════════════════════════════════════════════════════
// 🎯 IMAGE HANDLING FUNCTIONS
//═══════════════════════════════════════════════════════════════════════════════

/**
 * Helper function to get valid image URL
 * Bypasses 403 errors by formatting correctly
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "/product-images/product-9.jpg";
  
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }
  
  if (imageUrl.includes("/wp-content/uploads/")) {
    return `${WORDPRESS_BASE}${imageUrl}`;
  }
  
  if (imageUrl.includes("ambalafoods.crea8ive.solutions") && !imageUrl.startsWith("http")) {
    return `https://ambalafoods.crea8ive.solutions${imageUrl}`;
  }
  
  return imageUrl;
};

/**
 * Fetch image as data URL to bypass CORS issues
 */
export const fetchImageAsDataUrl = async (imageUrl) => {
  try {
    if (!imageUrl) return "/product-images/product-9.jpg";
    
    if (imageUrl.startsWith("/") && !imageUrl.includes("ambalafoods.crea8ive")) {
      return imageUrl;
    }

    const fullUrl = getImageUrl(imageUrl);
    
    const response = await axios.get(fullUrl, {
      responseType: "blob",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(response.data);
    });
  } catch (error) {
    console.warn(`Failed to fetch image as data URL: ${imageUrl}`, error);
    return "/product-images/product-9.jpg";
  }
};

//═══════════════════════════════════════════════════════════════════════════════
// 📦 PRODUCT ENDPOINTS
//═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all products from WooCommerce
 * GET /wp-json/wc/v3/products
 */
export const fetchProducts = async (params = {}) => {
  try {
    let allProducts = [];
    let page = 1;
    let hasMorePages = true;
    const perPage = params.per_page || 100;

    while (hasMorePages) {
      const response = await wooCommerceAPI.get("/products", {
        params: {
          per_page: perPage,
          page: page,
          ...params,
        },
      });

      allProducts = [...allProducts, ...response.data];

      const totalPages = Math.ceil(response.headers['x-wp-totalpages'] || 1);
      if (page >= totalPages) {
        hasMorePages = false;
      } else {
        page++;
      }
    }

    console.log(`Fetched ${allProducts.length} total products`);
    return allProducts;
  } catch (error) {
    console.error("Error fetching products from WooCommerce API:", error);
    throw new Error("Failed to load products. Please check your internet connection and try again.");
  }
};

/**
 * Fetch a single product by ID
 * GET /wp-json/wc/v3/products/{id}
 */
export const fetchSingleProduct = async (id) => {
  try {
    const response = await wooCommerceAPI.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error(`Failed to load product. Please try again.`);
  }
};

/**
 * Fetch product categories
 * GET /wp-json/wc/v3/products/categories
 */
export const fetchCategories = async () => {
  try {
    const response = await wooCommerceAPI.get("/products/categories", {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories from WooCommerce API:", error);
    return [];
  }
};

/**
 * Fetch products with pagination
 * GET /wp-json/wc/v3/products
 */
export const fetchProductsPaginated = async (page = 1, perPage = 12) => {
  try {
    const response = await wooCommerceAPI.get("/products", {
      params: {
        per_page: perPage,
        page: page,
      },
    });
    
    return {
      products: response.data,
      totalPages: Math.ceil(response.headers['x-wp-totalpages'] || 1),
      totalProducts: response.headers['x-wp-total'] || 0,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};

/**
 * Search products
 * GET /wp-json/wc/v3/products?search=query
 */
export const searchProducts = async (searchQuery) => {
  try {
    const response = await wooCommerceAPI.get("/products", {
      params: {
        search: searchQuery,
        per_page: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

/**
 * Fetch product reviews
 * GET /wp-json/wc/v3/products/{id}/reviews
 */
export const fetchProductReviews = async (productId) => {
  try {
    const response = await wooCommerceAPI.get(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
};

/**
 * Create a new product (admin only)
 * POST /wp-json/wc/v3/products
 */
export const createProduct = async (productData) => {
  try {
    const response = await wooCommerceAPI.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/**
 * Update a product by ID (admin only)
 * PUT /wp-json/wc/v3/products/{id}
 */
export const updateProduct = async (id, updateData) => {
  try {
    const response = await wooCommerceAPI.put(`/products/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a product by ID (admin only)
 * DELETE /wp-json/wc/v3/products/{id}
 */
export const deleteProduct = async (id) => {
  try {
    await wooCommerceAPI.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

//═══════════════════════════════════════════════════════════════════════════════
// 👤 CUSTOMER ENDPOINTS - HEADLESS E-COMMERCE
//═══════════════════════════════════════════════════════════════════════════════

/**
 * Register a new customer
 * POST /wp-json/wc/v3/customers
 * 
 * @param {Object} customerData - { email, first_name, last_name, password }
 * @returns {Object} Created customer object with ID
 */
export const registerCustomer = async (customerData) => {
  try {
    const response = await wooCommerceAPI.post("/customers", {
      email: customerData.email,
      first_name: customerData.firstName,
      last_name: customerData.lastName,
      password: customerData.password,
      username: customerData.email, // Use email as username
      billing: {
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone || "",
        address_1: customerData.address || "",
        city: customerData.city || "",
        postcode: customerData.postcode || "",
        country: "PK", // Pakistan
      },
      shipping: {
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        address_1: customerData.address || "",
        city: customerData.city || "",
        postcode: customerData.postcode || "",
        country: "PK",
      },
    });
    
    console.log("Customer registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering customer:", error);
    throw error;
  }
};

/**
 * Login customer using JWT authentication
 * POST /wp-json/jwt-auth/v1/token
 * 
 * @param {string} email - Customer email
 * @param {string} password - Customer password
 * @returns {Object} { token, user_email, user_display_name }
 */
export const loginCustomer = async (email, password) => {
  try {
    const response = await axios.post(
      `${JWT_AUTH_URL}/token`,
      {
        username: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    // Save token to localStorage
    localStorage.setItem("woo_token", response.data.token);
    localStorage.setItem("woo_user_id", response.data.user_id);
    localStorage.setItem("woo_user_email", response.data.user_email);
    localStorage.setItem("woo_user_name", response.data.user_display_name);
    
    console.log("Customer logged in successfully");
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/**
 * Get customer profile
 * GET /wp-json/wc/v3/customers/me (requires JWT token)
 */
export const getCustomerProfile = async () => {
  try {
    const token = localStorage.getItem("woo_token");
    if (!token) {
      throw new Error("No authentication token found. Please login first.");
    }

    const response = await wooCommerceAPI.get("/customers/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    throw error;
  }
};

/**
 * Get customer by ID
 * GET /wp-json/wc/v3/customers/{id}
 */
export const getCustomerById = async (customerId) => {
  try {
    const response = await wooCommerceAPI.get(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Update customer profile
 * PUT /wp-json/wc/v3/customers/{id}
 */
export const updateCustomerProfile = async (customerId, updateData) => {
  try {
    const response = await wooCommerceAPI.put(`/customers/${customerId}`, {
      first_name: updateData.firstName,
      last_name: updateData.lastName,
      email: updateData.email,
      billing: {
        first_name: updateData.firstName,
        last_name: updateData.lastName,
        email: updateData.email,
        phone: updateData.phone || "",
        address_1: updateData.address || "",
        city: updateData.city || "",
        postcode: updateData.postcode || "",
        country: "PK",
      },
      shipping: {
        first_name: updateData.firstName,
        last_name: updateData.lastName,
        address_1: updateData.address || "",
        city: updateData.city || "",
        postcode: updateData.postcode || "",
        country: "PK",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error updating customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Logout customer
 * (Client-side token removal)
 */
export const logoutCustomer = () => {
  localStorage.removeItem("woo_token");
  localStorage.removeItem("woo_user_id");
  localStorage.removeItem("woo_user_email");
  localStorage.removeItem("woo_user_name");
  console.log("Customer logged out");
};

/**
 * Check if customer is logged in
 */
export const isCustomerLoggedIn = () => {
  return !!localStorage.getItem("woo_token");
};

/**
 * Get logged-in customer ID
 */
export const getLoggedInCustomerId = () => {
  return localStorage.getItem("woo_user_id");
};

//═══════════════════════════════════════════════════════════════════════════════
// 🛒 ORDER ENDPOINTS - HEADLESS CHECKOUT
//═══════════════════════════════════════════════════════════════════════════════

/**
 * Create an order from cart
 * POST /wp-json/wc/v3/orders
 * 
 * This is the main checkout endpoint that creates an order with:
 * - Customer details (billing/shipping)
 * - Cart items
 * - Applied coupons
 * - Chosen payment method
 * 
 * @param {Object} orderData - {
 *   customerId,
 *   firstName,
 *   lastName,
 *   email,
 *   phone,
 *   address,
 *   city,
 *   postalCode,
 *   notes,
 *   cartItems: [{ id, quantity, price }],
 *   paymentMethod: "cod" | "card" | "upi",
 *   coupons: ["COUPON_CODE"],
 *   shippingTotal: 500,
 * }
 * @returns {Object} Created order object
 */
export const createOrder = async (orderData) => {
  try {
    console.log("Creating order with data:", orderData);

    const orderPayload = {
      payment_method: orderData.paymentMethod || "cod",
      payment_method_title: getPaymentMethodTitle(orderData.paymentMethod),
      set_paid: false, // Don't auto-mark as paid
      status: "pending",
      currency: "PKR",
      customer_id: orderData.customerId || 0, // 0 for guest checkout
      
      // Billing address
      billing: {
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
        address_1: orderData.address,
        city: orderData.city,
        postcode: orderData.postalCode,
        country: "PK",
      },
      
      // Shipping address
      shipping: {
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        address_1: orderData.address,
        city: orderData.city,
        postcode: orderData.postalCode,
        country: "PK",
      },

      // Customer note
      customer_note: orderData.notes || "",

      // Line items from cart
      line_items: orderData.cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        // Price can be overridden here if needed
      })),

      // Applied coupons
      coupon_lines: orderData.coupons?.map((coupon) => ({
        code: coupon,
      })) || [],

      // Shipping lines
      shipping_lines: orderData.shippingMethod ? [{
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: orderData.shippingTotal.toString(),
      }] : [],
    };

    const response = await wooCommerceAPI.post("/orders", orderPayload);
    
    console.log("Order created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

/**
 * Helper function to get payment method title
 */
const getPaymentMethodTitle = (method) => {
  const titles = {
    cod: "Cash on Delivery",
    card: "Credit/Debit Card",
    upi: "Mobile Wallet",
    stripe: "Stripe",
    paypal: "PayPal",
  };
  return titles[method] || "Direct Bank Transfer";
};

/**
 * Get customer orders
 * GET /wp-json/wc/v3/orders?customer=customerId
 */
export const getCustomerOrders = async (customerId) => {
  try {
    const response = await wooCommerceAPI.get("/orders", {
      params: {
        customer: customerId,
        per_page: 50,
        order: "desc",
        orderby: "date",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for customer ${customerId}:`, error);
    return [];
  }
};

/**
 * Get order details
 * GET /wp-json/wc/v3/orders/{id}
 */
export const getOrderDetails = async (orderId) => {
  try {
    const response = await wooCommerceAPI.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Update order status (admin only)
 * PUT /wp-json/wc/v3/orders/{id}
 * 
 * Valid statuses:
 * - pending: Awaiting payment
 * - processing: Paid, awaiting fulfillment
 * - on-hold: Awaiting customer action
 * - completed: Order complete
 * - cancelled: Cancelled
 * - refunded: Refunded
 */
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await wooCommerceAPI.put(`/orders/${orderId}`, {
      status: newStatus,
    });
    
    console.log(`Order ${orderId} status updated to: ${newStatus}`);
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Add order note
 * POST /wp-json/wc/v3/orders/{id}/notes
 */
export const addOrderNote = async (orderId, note, customerNote = false) => {
  try {
    const response = await wooCommerceAPI.post(`/orders/${orderId}/notes`, {
      note: note,
      customer_note: customerNote,
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error adding note to order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Get order notes
 * GET /wp-json/wc/v3/orders/{id}/notes
 */
export const getOrderNotes = async (orderId) => {
  try {
    const response = await wooCommerceAPI.get(`/orders/${orderId}/notes`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes for order ${orderId}:`, error);
    return [];
  }
};

/**
 * Delete order (admin only)
 * DELETE /wp-json/wc/v3/orders/{id}
 */
export const deleteOrder = async (orderId) => {
  try {
    await wooCommerceAPI.delete(`/orders/${orderId}`);
    console.log(`Order ${orderId} deleted`);
    return true;
  } catch (error) {
    console.error(`Error deleting order ${orderId}:`, error);
    throw error;
  }
};

//═══════════════════════════════════════════════════════════════════════════════
// 🎟️ COUPON ENDPOINTS - DISCOUNTS & PROMOTIONS
//═══════════════════════════════════════════════════════════════════════════════

/**
 * Get all available coupons
 * GET /wp-json/wc/v3/coupons
 */
export const getCoupons = async () => {
  try {
    const response = await wooCommerceAPI.get("/coupons", {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
};

/**
 * Get coupon by code
 * GET /wp-json/wc/v3/coupons?code=COUPON_CODE
 */
export const getCouponByCode = async (couponCode) => {
  try {
    const response = await wooCommerceAPI.get("/coupons", {
      params: {
        code: couponCode,
      },
    });
    
    if (response.data.length === 0) {
      throw new Error("Coupon not found");
    }
    
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching coupon ${couponCode}:`, error);
    throw error;
  }
};

/**
 * Validate coupon
 * Checks if coupon is valid and applicable
 */
export const validateCoupon = async (couponCode, cartTotal) => {
  try {
    const coupon = await getCouponByCode(couponCode);
    
    // Check if coupon is enabled
    if (!coupon.status || coupon.status === "draft") {
      throw new Error("This coupon is not valid");
    }

    // Check expiry
    if (coupon.date_expires && new Date(coupon.date_expires) < new Date()) {
      throw new Error("This coupon has expired");
    }

    // Check minimum amount
    if (coupon.minimum_amount && cartTotal < parseFloat(coupon.minimum_amount)) {
      throw new Error(`Minimum purchase amount is Rs ${coupon.minimum_amount}`);
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      throw new Error("This coupon has reached its usage limit");
    }

    return {
      valid: true,
      coupon: coupon,
      discount: calculateDiscount(coupon, cartTotal),
    };
  } catch (error) {
    console.error("Coupon validation failed:", error);
    throw error;
  }
};

/**
 * Calculate discount amount
 */
const calculateDiscount = (coupon, cartTotal) => {
  if (coupon.discount_type === "percent") {
    return (cartTotal * parseFloat(coupon.amount)) / 100;
  } else if (coupon.discount_type === "fixed_cart") {
    return parseFloat(coupon.amount);
  }
  return 0;
};

/**
 * Create coupon (admin only)
 * POST /wp-json/wc/v3/coupons
 */
export const createCoupon = async (couponData) => {
  try {
    const response = await wooCommerceAPI.post("/coupons", {
      code: couponData.code,
      discount_type: couponData.discountType || "percent", // percent, fixed_cart, fixed_product
      amount: couponData.amount,
      description: couponData.description || "",
      date_expires: couponData.expiryDate || null,
      minimum_amount: couponData.minimumAmount || "0",
      maximum_amount: couponData.maximumAmount || null,
      product_ids: couponData.productIds || [],
      excluded_product_ids: couponData.excludedProductIds || [],
      usage_limit: couponData.usageLimit || null,
    });
    
    return response.data;
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
};

//═══════════════════════════════════════════════════════════════════════════════
// 💳 PAYMENT PROCESSING - STRIPE INTEGRATION
//═══════════════════════════════════════════════════════════════════════════════

/**
 * Create payment intent for Stripe
 * This should be called from your backend (Node.js/Express)
 * Not directly from frontend for security reasons
 */
export const createPaymentIntent = async (orderId, amount) => {
  try {
    // Call your backend endpoint
    const response = await axios.post("/api/create-payment-intent", {
      orderId: orderId,
      amount: Math.round(amount * 100), // Convert to cents
    });
    
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

/**
 * Confirm payment completion
 * PUT /wp-json/wc/v3/orders/{id}
 */
export const confirmPayment = async (orderId) => {
  try {
    const response = await wooCommerceAPI.put(`/orders/${orderId}`, {
      status: "processing",
      set_paid: true,
    });
    
    console.log("Payment confirmed for order:", orderId);
    return response.data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

//═══════════════════════════════════════════════════════════════════════════════
// 📊 UTILITY FUNCTIONS
//═══════════════════════════════════════════════════════════════════════════════

/**
 * Calculate order totals
 */
export const calculateOrderTotal = (cartItems, shippingCost, taxRate, discount = 0) => {
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost - discount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    shipping: parseFloat(shippingCost.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};

/**
 * Format order data for display
 */
export const formatOrderData = (order) => {
  return {
    id: order.id,
    number: order.order_key,
    status: order.status,
    date: new Date(order.date_created).toLocaleDateString(),
    total: parseFloat(order.total),
    items: order.line_items,
    customer: {
      name: `${order.billing.first_name} ${order.billing.last_name}`,
      email: order.billing.email,
      phone: order.billing.phone,
    },
    shipping: order.shipping,
  };
};

export default {
  // Product functions
  fetchProducts,
  fetchSingleProduct,
  fetchCategories,
  fetchProductsPaginated,
  searchProducts,
  fetchProductReviews,
  createProduct,
  updateProduct,
  deleteProduct,
  
  // Customer functions
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getCustomerProfile,
  getCustomerById,
  updateCustomerProfile,
  isCustomerLoggedIn,
  getLoggedInCustomerId,
  
  // Order functions
  createOrder,
  getCustomerOrders,
  getOrderDetails,
  updateOrderStatus,
  addOrderNote,
  getOrderNotes,
  deleteOrder,
  
  // Coupon functions
  getCoupons,
  getCouponByCode,
  validateCoupon,
  createCoupon,
  
  // Payment functions
  createPaymentIntent,
  confirmPayment,
  
  // Utility functions
  calculateOrderTotal,
  formatOrderData,
  getImageUrl,
  fetchImageAsDataUrl,
};
