import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import LoadingSpinner from "../components/LoadingSpinner";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength when password changes
    if (name === "password") {
      const strength = AuthService.validatePassword(value);
      const score = Object.values(strength).filter((v) => v === true).length;
      setPasswordStrength(score);
    }
  };

  // Validate form
  const validateForm = () => {
    setError(null);

    // Check all fields filled
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone.trim() ||
      !formData.city.trim()
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    // Validate email
    if (!AuthService.validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Validate password
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    const passwordValidation = AuthService.validatePassword(formData.password);
    if (
      !passwordValidation.hasUpperCase ||
      !passwordValidation.hasLowerCase ||
      !passwordValidation.hasNumbers
    ) {
      setError(
        "Password must contain uppercase, lowercase, and numbers"
      );
      return false;
    }

    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Validate phone
    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }

    // Check terms
    if (!agreedToTerms) {
      setError("Please agree to Terms and Conditions");
      return false;
    }

    return true;
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthService.register(formData);

      if (result.success) {
        setSuccessMessage(
          "Registration successful! Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get password strength text
  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Fair";
    return "Strong";
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-100 flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join AG and start shopping
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

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">📧</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="At least 8 characters"
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">
                    Password Strength:
                  </span>
                  <span className={`text-xs font-bold ${
                    passwordStrength <= 2 ? "text-red-500" :
                    passwordStrength <= 4 ? "text-yellow-500" :
                    "text-green-500"
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${getPasswordStrengthColor()} h-2 rounded-full transition-all`}
                    style={{ width: `${(passwordStrength / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">✓</span>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-enter password"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Contact Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="address"
              placeholder="Street Address (Optional)"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code (Optional)"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded accent-blue-600 mt-1"
            />
            <span className="ml-3 text-sm text-gray-600">
              I agree to the{" "}
              <a href="#terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-bold transition"
          >
            Sign In
          </Link>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-300 pt-4">
          <span>🔒 Your information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
