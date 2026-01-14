import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";

function ThankYou() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-6">
            <FaCheckCircle className="text-green-600 text-6xl animate-bounce" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">
          Order Completed Successfully!
        </h1>

        {/* Order ID */}
        {orderId && (
          <div className="mb-6">
            <p className="text-lg text-gray-600 mb-2">Order Number</p>
            <p className="text-2xl font-semibold text-blue-600">#{orderId}</p>
          </div>
        )}

        {/* Confirmation Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            You will receive a confirmation message soon!
          </p>
          <p className="text-sm text-gray-600 mt-3">
            We'll send you an email with your order details and tracking information.
          </p>
        </div>

        {/* Additional Info */}
        <div className="mb-8 text-left bg-gray-50 rounded-lg p-6">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">What's Next?</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Check your email for order confirmation</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>We'll process your order within 24 hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>You'll receive tracking details once shipped</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
          >
            <FaHome />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{" "}
            <a
              href="tel:+923025089439"
              className="text-blue-600 hover:underline font-medium"
            >
              +92 302 5089439
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
