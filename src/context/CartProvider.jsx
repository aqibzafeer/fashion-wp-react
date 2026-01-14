// src/context/CartProvider.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => {
    const price = Number(item.sale_price || item.price || 0);
    return sum + price * item.quantity;
  }, 0), [cart]);

  const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
