import { useState } from "react";

// ─── Product Details Data ─────────────────────────────────────────────────────
const productDetails = {
  1: {
    description: "Professional wireless headphones with Active Noise Cancellation technology, delivering an immersive audio experience for up to 30 continuous hours.",
    features: [
      { k: "Battery Life", v: "30 hours" },
      { k: "Connectivity", v: "Bluetooth 5.2" },
      { k: "Warranty", v: "2 years" },
      { k: "Weight", v: "250g" },
    ],
  },
  2: {
    description: "A modern minimalist watch crafted from 316L stainless steel, water-resistant up to 50 meters with an Italian leather strap.",
    features: [
      { k: "Material", v: "316L Steel" },
      { k: "Water Resistance", v: "50m" },
      { k: "Case Size", v: "40mm" },
      { k: "Strap", v: "Italian Leather" },
    ],
  },
  3: {
    description: "A timeless crossbody bag crafted from genuine Italian leather, designed for both formal occasions and everyday use.",
    features: [
      { k: "Material", v: "Italian Leather" },
      { k: "Dimensions", v: "25×18×8 cm" },
      { k: "Pockets", v: "4 inner pockets" },
      { k: "Colors", v: "3 available" },
    ],
  },
  4: {
    description: "High-performance running shoes with advanced shock absorption technology, engineered for both tracks and rough terrain.",
    features: [
      { k: "Sole", v: "Carbon Rubber" },
      { k: "Sizes", v: "US 6–13" },
      { k: "Weight", v: "280g" },
      { k: "Use", v: "Running / Training" },
    ],
  },
  5: {
    description: "A smart water bottle that tracks your hydration via a phone app, with an LED screen reminding you to stay hydrated.",
    features: [
      { k: "Capacity", v: "750ml" },
      { k: "Connectivity", v: "Bluetooth" },
      { k: "Battery", v: "30 days" },
      { k: "Display", v: "LED Temperature" },
    ],
  },
  6: {
    description: "A mechanical keyboard with Cherry MX Red switches, fully customizable RGB lighting, and a sturdy aluminum body.",
    features: [
      { k: "Switches", v: "Cherry MX Red" },
      { k: "Lighting", v: "RGB 16M colors" },
      { k: "Connection", v: "USB-C" },
      { k: "Body", v: "Aluminum" },
    ],
  },
};

// ─── ProductDetailModal ───────────────────────────────────────────────────────
function ProductDetailModal({ product, onClose, onAddToCart, addedId }) {
  const details = productDetails[product.id] || { description: "", features: [] };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 250,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.55)", padding: "1rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520,
          overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          fontFamily: "'Georgia', 'Times New Roman', serif", maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Image Area */}
        <div style={{
          background: product.color, height: 220,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 90, position: "relative", flexShrink: 0,
        }}>
          {product.image}
          {product.badge && (
            <span style={{
              position: "absolute", top: 14, left: 14, fontSize: 11,
              fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 0.5,
              padding: "4px 10px", borderRadius: 12,
              background: badgeStyleMap[product.badge]?.bg,
              color: badgeStyleMap[product.badge]?.color,
            }}>
              {product.badge}
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(0,0,0,0.35)", border: "none", color: "#fff",
              borderRadius: "50%", width: 32, height: 32, cursor: "pointer",
              fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem" }}>
          <p style={{ fontSize: 11, color: "#999", fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            {product.category}
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.3 }}>
            {product.name}
          </h2>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <span style={{ color: "#f0c070", fontSize: 15 }}>★★★★★</span>
            <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "sans-serif" }}>{product.rating}</span>
            <span style={{ fontSize: 12, color: "#aaa", fontFamily: "sans-serif" }}>({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: 20,
            borderTop: "1px solid #f0f0f0", paddingTop: 16,
          }}>
            {details.description}
          </p>

          {/* Features Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {details.features.map(f => (
              <div key={f.k} style={{
                background: "#f8f8f6", borderRadius: 10, padding: "12px 14px",
              }}>
                <p style={{ fontSize: 11, color: "#999", fontFamily: "sans-serif", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{f.k}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{f.v}</p>
              </div>
            ))}
          </div>

          {/* Price + Actions */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: "1px solid #f0f0f0", paddingTop: 16,
          }}>
            <div>
              <span style={{ fontSize: 28, fontWeight: 700 }}>${product.price}</span>
              {product.originalPrice && (
                <span style={{ fontSize: 15, color: "#aaa", textDecoration: "line-through", marginLeft: 10, fontFamily: "sans-serif" }}>
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span style={{
                  marginLeft: 8, fontSize: 12, fontFamily: "sans-serif", fontWeight: 700,
                  color: "#c62828", background: "#fce4ec", padding: "2px 8px", borderRadius: 8,
                }}>
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>
            <button
              onClick={() => onAddToCart(product)}
              style={{
                background: addedId === product.id ? "#2e7d32" : "#1a1a1a",
                color: "#fff", border: "none", borderRadius: 24,
                padding: "11px 24px", fontSize: 14, fontFamily: "sans-serif",
                fontWeight: 600, cursor: "pointer", transition: "background 0.25s",
                letterSpacing: 0.3,
              }}
            >
              {addedId === product.id ? "✓ Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Badge Style Map (used in modal too) ────────────────────────────────────
const badgeStyleMap = {
  "Best Seller": { bg: "#fff3e0", color: "#e65100" },
  "New":         { bg: "#e8f5e9", color: "#2e7d32" },
  "Sale":        { bg: "#fce4ec", color: "#c62828" },
  "Top Rated":   { bg: "#e8eaf6", color: "#283593" },
};

// ─── Stripe Mock ──────────────────────────────────────────────────────────────
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const CheckCircle = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

function StripeModal({ cart, total, onClose, onSuccess }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ email: "", name: "", card: "", expiry: "", cvc: "", zip: "" });
  const [errors, setErrors] = useState({});

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };

  const validate = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.name.trim()) e.name = "Name required";
    if (form.card.replace(/\s/g, "").length < 16) e.card = "Invalid card number";
    if (form.expiry.length < 7) e.expiry = "Invalid expiry";
    if (form.cvc.length < 3) e.cvc = "Invalid CVC";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setStep("processing");
    setTimeout(() => { setStep("success"); }, 2200);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${errors[field] ? "#c62828" : "#e0e0e0"}`,
    borderRadius: 8, fontSize: 14, fontFamily: "sans-serif", outline: "none",
    boxSizing: "border-box", background: "#fff", color: "#1a1a1a",
    transition: "border-color 0.2s",
  });

  const cardBrand = () => {
    const d = form.card.replace(/\s/g, "");
    if (d.startsWith("4")) return "VISA";
    if (d.startsWith("5")) return "MC";
    if (d.startsWith("3")) return "AMEX";
    return null;
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.55)", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", fontFamily: "sans-serif" }}>

        <div style={{ background: "#635bff", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 13, fontWeight: 800, color: "#635bff", letterSpacing: "-0.5px" }}>stripe</div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Secure Checkout</span>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        {step === "form" && (
          <div style={{ padding: "1.5rem" }}>
            <div style={{ background: "#f9f9fb", borderRadius: 10, padding: "1rem", marginBottom: "1.25rem", border: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Order Summary</p>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#444", marginBottom: 4 }}>
                  <span>{item.name} × {item.qty}</span>
                  <span style={{ fontWeight: 600 }}>${item.price * item.qty}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #e8e8e8", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
                <span>Total</span><span>${total}</span>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }}>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={e => e.target.style.borderColor = "#635bff"}
                onBlur={e => e.target.style.borderColor = errors.email ? "#c62828" : "#e0e0e0"}
                style={inputStyle("email")} />
              {errors.email && <p style={{ color: "#c62828", fontSize: 11, margin: "4px 0 0" }}>{errors.email}</p>}
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }}>Cardholder Name</label>
              <input placeholder="John Smith" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onFocus={e => e.target.style.borderColor = "#635bff"}
                onBlur={e => e.target.style.borderColor = errors.name ? "#c62828" : "#e0e0e0"}
                style={inputStyle("name")} />
              {errors.name && <p style={{ color: "#c62828", fontSize: 11, margin: "4px 0 0" }}>{errors.name}</p>}
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }}>Card Number</label>
              <div style={{ position: "relative" }}>
                <input placeholder="1234 5678 9012 3456" value={form.card}
                  onChange={e => setForm(f => ({ ...f, card: formatCard(e.target.value) }))}
                  onFocus={e => e.target.style.borderColor = "#635bff"}
                  onBlur={e => e.target.style.borderColor = errors.card ? "#c62828" : "#e0e0e0"}
                  style={{ ...inputStyle("card"), paddingRight: 60 }} />
                {cardBrand() && (
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 10, fontWeight: 800, color: cardBrand() === "VISA" ? "#1a1f71" : cardBrand() === "MC" ? "#eb001b" : "#006fcf", background: "#f0f0f0", padding: "2px 6px", borderRadius: 4 }}>
                    {cardBrand()}
                  </span>
                )}
              </div>
              {errors.card && <p style={{ color: "#c62828", fontSize: 11, margin: "4px 0 0" }}>{errors.card}</p>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }}>Expiry</label>
                <input placeholder="MM / YY" value={form.expiry}
                  onChange={e => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                  onFocus={e => e.target.style.borderColor = "#635bff"}
                  onBlur={e => e.target.style.borderColor = errors.expiry ? "#c62828" : "#e0e0e0"}
                  style={inputStyle("expiry")} />
                {errors.expiry && <p style={{ color: "#c62828", fontSize: 10, margin: "4px 0 0" }}>{errors.expiry}</p>}
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }}>CVC</label>
                <input placeholder="123" value={form.cvc} maxLength={4}
                  onChange={e => setForm(f => ({ ...f, cvc: e.target.value.replace(/\D/g, "") }))}
                  onFocus={e => e.target.style.borderColor = "#635bff"}
                  onBlur={e => e.target.style.borderColor = errors.cvc ? "#c62828" : "#e0e0e0"}
                  style={inputStyle("cvc")} />
                {errors.cvc && <p style={{ color: "#c62828", fontSize: 10, margin: "4px 0 0" }}>{errors.cvc}</p>}
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }}>ZIP</label>
                <input placeholder="10001" value={form.zip} maxLength={10}
                  onChange={e => setForm(f => ({ ...f, zip: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = "#635bff"}
                  onBlur={e => e.target.style.borderColor = "#e0e0e0"}
                  style={inputStyle("zip")} />
              </div>
            </div>

            <button onClick={handlePay}
              style={{ width: "100%", background: "#635bff", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: 0.3 }}
              onMouseEnter={e => e.currentTarget.style.background = "#4f46e5"}
              onMouseLeave={e => e.currentTarget.style.background = "#635bff"}
            >
              <LockIcon /> Pay ${total}
            </button>

            <div style={{ textAlign: "center", marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#aaa", fontSize: 11 }}>
              <LockIcon />
              <span>Secured by <strong style={{ color: "#635bff" }}>Stripe</strong> · 256-bit SSL</span>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, border: "4px solid #f0f0f0", borderTopColor: "#635bff", borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            <p style={{ fontSize: 17, fontWeight: 600, color: "#1a1a1a", marginBottom: 6 }}>Processing payment...</p>
            <p style={{ fontSize: 13, color: "#aaa" }}>Please don't close this window</p>
          </div>
        )}

        {step === "success" && (
          <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><CheckCircle /></div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>Payment Successful!</h2>
            <p style={{ fontSize: 14, color: "#777", marginBottom: 6 }}>Order confirmed · ${total} charged</p>
            <p style={{ fontSize: 13, color: "#aaa", marginBottom: 24 }}>Confirmation sent to {form.email || "your email"}</p>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1rem", marginBottom: 24, fontSize: 13, color: "#15803d" }}>
              🎉 Thank you for your order! Estimated delivery: 3–5 business days.
            </div>
            <button onClick={onSuccess}
              style={{ background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Products Data ────────────────────────────────────────────────────────────
const products = [
  { id: 1, name: "Wireless Headphones Pro", price: 299, originalPrice: 399, category: "Electronics", rating: 4.8, reviews: 2341, badge: "Best Seller", image: "🎧", color: "#1a1a2e" },
  { id: 2, name: "Minimalist Watch Obsidian", price: 189, originalPrice: null, category: "Accessories", rating: 4.9, reviews: 987, badge: "New", image: "⌚", color: "#16213e" },
  { id: 3, name: "Leather Crossbody Bag", price: 145, originalPrice: 210, category: "Bags", rating: 4.7, reviews: 1456, badge: "Sale", image: "👜", color: "#0f3460" },
  { id: 4, name: "Running Shoes Elite", price: 220, originalPrice: null, category: "Footwear", rating: 4.6, reviews: 3210, badge: null, image: "👟", color: "#533483" },
  { id: 5, name: "Smart Water Bottle", price: 79, originalPrice: 99, category: "Lifestyle", rating: 4.5, reviews: 768, badge: "Sale", image: "💧", color: "#1a1a2e" },
  { id: 6, name: "Mechanical Keyboard TKL", price: 159, originalPrice: null, category: "Electronics", rating: 4.9, reviews: 4502, badge: "Top Rated", image: "⌨️", color: "#16213e" },
];

const categories = ["All", "Electronics", "Accessories", "Bags", "Footwear", "Lifestyle"];

// ─── Icons ────────────────────────────────────────────────────────────────────
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [search, setSearch] = useState("");
  const [stripeOpen, setStripeOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // ← NEW

  const filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const badgeStyle = (badge) => badgeStyleMap[badge] || {};

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#fafaf8", color: "#1a1a1a" }}>

      {/* ── Nav ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100, padding: "0 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#1a1a1a" }}>
            <span style={{ color: "#c94a2b" }}>◆</span> LUXE
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, maxWidth: 380, margin: "0 3rem" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#999" }}>
                <SearchIcon />
              </span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{ width: "100%", padding: "9px 12px 9px 40px", border: "1.5px solid #e8e8e8", borderRadius: 24, fontSize: 14, fontFamily: "inherit", background: "#fafaf8", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#c94a2b"}
                onBlur={e => e.target.style.borderColor = "#e8e8e8"}
              />
            </div>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            style={{ position: "relative", background: "none", border: "1.5px solid #1a1a1a", borderRadius: 24, padding: "8px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontFamily: "inherit", color: "#1a1a1a", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1a1a1a"; }}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span style={{ background: "#c94a2b", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, position: "absolute", top: -6, right: -6 }}>
                {cartCount}
              </span>
            )}
            <span>Cart</span>
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", padding: "5rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c94a2b", marginBottom: 16, fontFamily: "sans-serif" }}>New Collection 2025</p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 1.5rem", letterSpacing: "-1px" }}>
          Crafted for<br /><em style={{ color: "#f0c070" }}>those who notice</em>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.7, fontFamily: "sans-serif", fontWeight: 300 }}>
          Curated products where design meets function. No compromise.
        </p>
        <button
          onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
          style={{ background: "#c94a2b", color: "#fff", border: "none", borderRadius: 30, padding: "14px 36px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer", letterSpacing: 0.5 }}
        >
          Shop Now →
        </button>
      </div>

      {/* ── Products ── */}
      <div id="products" style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Categories */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: "2.5rem" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: "8px 20px", borderRadius: 24, border: "1.5px solid", borderColor: activeCategory === cat ? "#1a1a1a" : "#e0e0e0", background: activeCategory === cat ? "#1a1a1a" : "#fff", color: activeCategory === cat ? "#fff" : "#555", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif", fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.2s" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {filtered.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)} // ← CLICK TO OPEN MODAL
              style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f0f0f0", transition: "transform 0.25s, box-shadow 0.25s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Image area */}
              <div style={{ background: product.color, height: 200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
                {product.image}
                {product.badge && (
                  <span style={{ position: "absolute", top: 14, left: 14, fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 0.5, padding: "4px 10px", borderRadius: 12, background: badgeStyle(product.badge).bg, color: badgeStyle(product.badge).color }}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }} // ← stopPropagation
                  style={{ position: "absolute", top: 14, right: 14, background: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: wishlist.includes(product.id) ? "#c94a2b" : "#999", transition: "all 0.2s" }}
                >
                  <HeartIcon filled={wishlist.includes(product.id)} />
                </button>
              </div>

              {/* Info */}
              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontSize: 11, color: "#999", fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{product.category}</p>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.3 }}>{product.name}</h3>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                  <span style={{ color: "#f0c070", display: "flex", alignItems: "center" }}><StarIcon /></span>
                  <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "sans-serif" }}>{product.rating}</span>
                  <span style={{ fontSize: 12, color: "#aaa", fontFamily: "sans-serif" }}>({product.reviews.toLocaleString()})</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>${product.price}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: 14, color: "#aaa", textDecoration: "line-through", marginLeft: 8, fontFamily: "sans-serif" }}>${product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); addToCart(product); }} // ← stopPropagation
                    style={{ background: addedId === product.id ? "#2e7d32" : "#1a1a1a", color: "#fff", border: "none", borderRadius: 24, padding: "9px 18px", fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer", transition: "background 0.25s", letterSpacing: 0.3 }}
                  >
                    {addedId === product.id ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#aaa", fontFamily: "sans-serif" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 17 }}>No products found</p>
          </div>
        )}
      </div>

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)" }} onClick={() => setCartOpen(false)} />
          <div style={{ width: 380, background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Your Cart</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#999", lineHeight: 1 }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 0", color: "#bbb", fontFamily: "sans-serif" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #f5f5f5", alignItems: "center" }}>
                    <div style={{ width: 52, height: 52, background: item.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                      {item.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: "0 0 3px" }}>{item.name}</p>
                      <p style={{ fontSize: 13, color: "#888", margin: 0, fontFamily: "sans-serif" }}>Qty: {item.qty} · ${item.price * item.qty}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 4 }}>×</button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: "1.5rem", borderTop: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 15, fontFamily: "sans-serif", color: "#666" }}>Total</span>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>${cartTotal}</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); setStripeOpen(true); }}
                  style={{ width: "100%", background: "#635bff", color: "#fff", border: "none", borderRadius: 28, padding: "14px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  Pay with Stripe →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Stripe Modal ── */}
      {stripeOpen && (
        <StripeModal
          cart={cart}
          total={cartTotal}
          onClose={() => setStripeOpen(false)}
          onSuccess={() => { setStripeOpen(false); setCart([]); }}
        />
      )}

      {/* ── Product Detail Modal ── */}  {/* ← NEW */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          addedId={addedId}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => {
            addToCart(p);
          }}
        />
      )}

    </div>
  );
}