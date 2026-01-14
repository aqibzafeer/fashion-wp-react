import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address");
      return false;
    }

    if (!AuthService.validateEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!password) {
      setError("Please enter your password");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthService.login(email, password);

      if (result.success) {
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestCheckout = () => {
    navigate("/checkout");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-100 flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Login to your AG account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {successMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded accent-blue-600 cursor-pointer"
              />
              <span className="ml-2 text-gray-600 cursor-pointer">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Guest Checkout */}
        <button
          onClick={handleGuestCheckout}
          className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-6 rounded-lg transition"
        >
          Continue as Guest
        </button>

        {/* Register Link */}
        <div className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-bold transition"
          >
            Sign Up Now
          </Link>
        </div>

        {/* Social Login (Optional) */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-center text-gray-600 text-sm mb-4">
            Or login with
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-blue-400 transition text-xl">
              📘
            </button>
            <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-blue-400 transition text-xl">
              🐦
            </button>
            <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-blue-400 transition text-xl">
              🔵
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <span>🔒 Your data is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
