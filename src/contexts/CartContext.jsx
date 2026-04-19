import { createContext, useContext, useState } from 'react';
import { dummyCartItems, dummyCoupons } from '../data/dummyData';

const CartContext = createContext(null);

const TAX_RATE = 0.14; // 14%
const SHIPPING = 50;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(dummyCartItems);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // ── Calculations ──────────────────────────────────────
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxPrice = Math.round(subtotal * TAX_RATE);
  const shippingPrice = cartItems.length > 0 ? SHIPPING : 0;
  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discount) / 100)
    : 0;
  const totalPrice = subtotal + taxPrice + shippingPrice - discountAmount;
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // ── Actions ───────────────────────────────────────────
  const addToCart = (product, color = '', quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product._id === product._id && i.color === color
      );
      if (existing) {
        return prev.map((i) =>
          i.product._id === product._id && i.color === color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      const price = product.priceAfterDiscount || product.price;
      return [
        ...prev,
        {
          _id: 'ci_' + Date.now(),
          product,
          quantity,
          price,
          color,
        },
      ];
    });
    return { success: true };
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i._id !== itemId));
    return { success: true };
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return removeFromCart(itemId);
    setCartItems((prev) =>
      prev.map((i) => (i._id === itemId ? { ...i, quantity } : i))
    );
    return { success: true };
  };

  const applyCoupon = (code) => {
    const coupon = dummyCoupons.find(
      (c) => c.name.toLowerCase() === code.toLowerCase()
    );
    if (!coupon) return { success: false, message: 'كود الخصم غير صحيح' };
    const isExpired = new Date(coupon.expire) < new Date();
    if (isExpired) return { success: false, message: 'كود الخصم منتهي الصلاحية' };
    setAppliedCoupon(coupon);
    return { success: true, discount: coupon.discount };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const isInCart = (productId) => cartItems.some((i) => i.product._id === productId);

  return (
    <CartContext.Provider value={{
      cartItems, appliedCoupon, totalItems,
      subtotal, taxPrice, shippingPrice, discountAmount, totalPrice,
      addToCart, removeFromCart, updateQuantity,
      applyCoupon, removeCoupon, clearCart, isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
