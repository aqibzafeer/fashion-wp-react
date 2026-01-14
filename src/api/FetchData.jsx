import axios from "axios";

// WooCommerce REST API Configuration
const API_BASE_URL = import.meta.env.VITE_WOO_API_BASE_URL || "https://ambalafoods.crea8ive.solutions/wp-json/wc/v3";
const CUSTOMER_KEY = import.meta.env.VITE_WOO_CUSTOMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WOO_CONSUMER_SECRET;
const WORDPRESS_BASE = "https://ambalafoods.crea8ive.solutions";

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

// Add request interceptor to handle CORS and image loading issues
wooCommerceAPI.interceptors.request.use((config) => {
  // Add User-Agent header to help with server compatibility
  config.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
  return config;
});

/**
 * Helper function to get valid image URL
 * Bypasses 403 errors by using API endpoint or data URLs
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "/product-images/product-9.jpg";
  
  // If it's already a complete URL, return as is
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }
  
  // If it's from WordPress uploads, prepend the base URL
  if (imageUrl.includes("/wp-content/uploads/")) {
    return `${WORDPRESS_BASE}${imageUrl}`;
  }
  
  // For partial paths
  if (imageUrl.includes("ambalafoods.crea8ive.solutions") && !imageUrl.startsWith("http")) {
    return `https://ambalafoods.crea8ive.solutions${imageUrl}`;
  }
  
  return imageUrl;
};

/**
 * Fetch image as data URL to bypass CORS issues
 * This function fetches the image and returns it as a data URL
 */
export const fetchImageAsDataUrl = async (imageUrl) => {
  try {
    if (!imageUrl) return "/product-images/product-9.jpg";
    
    // For local images, return directly
    if (imageUrl.startsWith("/") && !imageUrl.includes("ambalafoods.crea8ive")) {
      return imageUrl;
    }

    // For WordPress images, try to fetch and convert to blob
    const fullUrl = getImageUrl(imageUrl);
    
    const response = await axios.get(fullUrl, {
      responseType: "blob",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    // Convert blob to data URL
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

/**
 * Fetch all products from WooCommerce
 * Endpoint: GET /wp-json/wc/v3/products
 * This function automatically fetches ALL products across all pages
 */
export const fetchProducts = async (params = {}) => {
  try {
    let allProducts = [];
    let page = 1;
    let hasMorePages = true;
    const perPage = params.per_page || 100; // WooCommerce max per page is 100

    // Fetch all pages until we get all products
    while (hasMorePages) {
      const response = await wooCommerceAPI.get("/products", {
        params: {
          per_page: perPage,
          page: page,
          ...params,
        },
      });

      allProducts = [...allProducts, ...response.data];

      // Check if there are more pages
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
 * Endpoint: GET /wp-json/wc/v3/products/{id}
 */
export const fetchSingleProduct = async (id) => {
  try {
    const response = await wooCommerceAPI.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id} from WooCommerce API:`, error);
    throw new Error(`Failed to load product. Please try again.`);
  }
};

/**
 * Fetch product categories
 * Endpoint: GET /wp-json/wc/v3/products/categories
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
 * Create a new product
 * Endpoint: POST /wp-json/wc/v3/products
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
 * Update a product by ID
 * Endpoint: PUT /wp-json/wc/v3/products/{id}
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
 * Delete a product by ID
 * Endpoint: DELETE /wp-json/wc/v3/products/{id}
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

/**
 * Search products
 * Endpoint: GET /wp-json/wc/v3/products?search=query
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
 * Endpoint: GET /wp-json/wc/v3/products/{id}/reviews
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
 * Fetch products with pagination (if you need to paginate)
 * Endpoint: GET /wp-json/wc/v3/products
 * Useful for implementing custom pagination in UI
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
