import { loginCustomer, logoutCustomer, registerCustomer, getCustomerProfile } from "../api/FetchDataHeadless";

/**
 * Authentication Service for Headless WooCommerce
 * Handles customer login, registration, and token management
 */

class AuthService {
  /**
   * Register a new customer
   */
  static async register(customerData) {
    try {
      const newCustomer = await registerCustomer({
        email: customerData.email,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        password: customerData.password,
        phone: customerData.phone || "",
        address: customerData.address || "",
        city: customerData.city || "",
        postcode: customerData.postalCode || "",
      });

      console.log("Registration successful:", newCustomer);
      return {
        success: true,
        customer: newCustomer,
        message: "Registration successful! Please login.",
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Registration failed",
      };
    }
  }

  /**
   * Login customer
   */
  static async login(email, password) {
    try {
      const loginResponse = await loginCustomer(email, password);

      console.log("Login successful:", loginResponse);
      return {
        success: true,
        token: loginResponse.token,
        user: {
          id: loginResponse.user_id,
          email: loginResponse.user_email,
          name: loginResponse.user_display_name,
        },
        message: "Login successful!",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login failed",
      };
    }
  }

  /**
   * Logout customer
   */
  static logout() {
    logoutCustomer();
    console.log("Logged out successfully");
    return { success: true };
  }

  /**
   * Get current logged-in user profile
   */
  static async getProfile() {
    try {
      const profile = await getCustomerProfile();
      return {
        success: true,
        profile: profile,
      };
    } catch (error) {
      console.error("Get profile error:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch profile",
      };
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated() {
    return !!localStorage.getItem("woo_token");
  }

  /**
   * Get stored user info
   */
  static getCurrentUser() {
    if (!this.isAuthenticated()) {
      return null;
    }

    return {
      id: localStorage.getItem("woo_user_id"),
      email: localStorage.getItem("woo_user_email"),
      name: localStorage.getItem("woo_user_name"),
    };
  }

  /**
   * Get auth token
   */
  static getToken() {
    return localStorage.getItem("woo_token");
  }

  /**
   * Validate email format
   */
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static validatePassword(password) {
    return {
      valid: password.length >= 8,
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }
}

// Named exports for convenience
export const login = (email, password) => AuthService.login(email, password);
export const register = (customerData) => AuthService.register(customerData);
export const logout = () => AuthService.logout();
export const getUser = () => AuthService.getCurrentUser();
export const isAuthenticated = () => AuthService.isAuthenticated();
export const getToken = () => AuthService.getToken();

export default AuthService;
