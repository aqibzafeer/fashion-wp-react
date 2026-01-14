import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft } from "react-icons/fi";

const Cart = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, cartCount } = useCart();

  const handleQuantityChange = (productId, delta) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiArrowLeft />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart
          <span className="text-lg font-normal text-gray-500 ml-2">({cartCount} items)</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-5">
                  <img
                    src={item.images?.[0]?.src || "vite.svg"}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} className="font-semibold text-lg text-gray-800 hover:text-indigo-600">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Rs: {item.sale_price || item.price}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 text-gray-700">
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
              <Link to="/checkout" className="block mt-8">
                <button
                  className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-60"
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </button>
              </Link>
              <Link
                to="/products"
                className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 group"
              >
                <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
