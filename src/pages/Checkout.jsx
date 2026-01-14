import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import { createWooOrder } from "../services/wooCommerceAPI";
import AuthService from "../services/AuthService";
import { toast } from "react-toastify";
import { FiArrowLeft, FiShoppingCart, FiCreditCard, FiTruck, FiCheckCircle } from "react-icons/fi";

function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    phone: "",
    notes: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = AuthService.getCurrentUser();
    const shipping = 0; // Free shipping

    const orderData = {
      payment_method: payment === "cod" ? "cod" : payment === "card" ? "bacs" : "easypaisa",
      payment_method_title: payment === "cod" ? "Cash on Delivery" : payment === "card" ? "Credit Card" : "Easypaisa",
      set_paid: false,
      billing: {
        first_name: form.name.split(' ')[0] || form.name,
        last_name: form.name.split(' ').slice(1).join(' ') || '',
        address_1: form.address,
        city: form.city,
        postcode: form.postal,
        country: "PK",
        email: form.email,
        phone: form.phone
      },
      shipping: {
        first_name: form.name.split(' ')[0] || form.name,
        last_name: form.name.split(' ').slice(1).join(' ') || '',
        address_1: form.address,
        city: form.city,
        postcode: form.postal,
        country: "PK"
      },
      line_items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Standard Shipping",
          total: shipping.toString()
        }
      ],
      customer_note: form.notes || "",
      customer_id: user?.id || 0
    };

    try {
      const order = await createWooOrder(orderData);
      
      toast.success(`Order #${order.id} created successfully!`, {
        position: "bottom-right",
        autoClose: 3000
      });

      clearCart();
      setForm({
        name: "", email: "", address: "", city: "", postal: "", phone: "", notes: "",
      });

      navigate("/thank-you", { state: { orderId: order.id } });

    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to create order. Please try again.", {
        position: "bottom-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 group"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Cart
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Information</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleInput} placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleInput} placeholder="you@example.com" className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input type="text" id="address" name="address" value={form.address} onChange={handleInput} placeholder="123 Main St, Apt 4B" className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" id="city" name="city" value={form.city} onChange={handleInput} className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
                </div>
                <div>
                  <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input type="text" id="postal" name="postal" value={form.postal} onChange={handleInput} className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleInput} className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">Order Notes (Optional)</label>
                <textarea id="notes" name="notes" value={form.notes} onChange={handleInput} rows={3} className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Order</h2>
              
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.images?.[0]?.src || "vite.svg"} alt={item.name} className="w-16 h-20 object-cover rounded-md" />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800">Rs: {(item.sale_price || item.price) * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-gray-700 border-t pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs: {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Total</span>
                  <span>Rs: {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {[
                    { id: "cod", title: "Cash on Delivery", icon: FiTruck },
                    { id: "card", title: "Credit / Debit Card", icon: FiCreditCard },
                    { id: "easypaisa", title: "Easypaisa", icon: FiCheckCircle },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition ${payment === method.id ? 'bg-indigo-50 border-indigo-500' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <input type="radio" name="payment" value={method.id} checked={payment === method.id} onChange={handlePayment} className="sr-only" />
                      <method.icon className={`text-2xl ${payment === method.id ? 'text-indigo-600' : 'text-gray-500'}`} />
                      <span className={`font-semibold ${payment === method.id ? 'text-indigo-800' : 'text-gray-700'}`}>{method.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading || cart.length === 0}
                className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : `Place Order - Rs: ${cartTotal.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;