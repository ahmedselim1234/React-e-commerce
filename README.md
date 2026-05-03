# React E-Commerce App

A full-featured Arabic RTL e-commerce web application built with React 19 and Tailwind CSS v4. Includes a complete shopping flow, user account management, and an admin dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 (custom design tokens) |
| Routing | React Router DOM v7 |
| State Management | Context API (Auth, Cart, Wishlist, Toast) |
| Icons | Lucide React |
| Language direction | RTL (Arabic) throughout |

---

## Features

### Customer Side
- Home page with hero carousel, featured products, categories, and brands
- Product listing with filtering by category and brand
- Product detail page with image, description, and add-to-cart
- Shopping cart with quantity controls and coupon code support
- Full checkout flow: address selection → payment method → order confirmation
- Wishlist (toggle products as favorites)
- User account pages: profile, order history, saved addresses, favorites
- Authentication: login, register, forgot password
- Toast notifications for all user actions

### Admin Dashboard
- Overview statistics cards
- Product management (add / edit / delete)
- Order management and status tracking
- User management
- Coupon management
- Brand and category management

---

## Pages & Routes

```
/                        Home
/login                   Login
/signup                  Register
/forgot-password         Forgot Password
/allcategory             All Categories
/allbrand                All Brands
/products                Shop / Product Listing
/products/:id            Product Detail
/cart                    Shopping Cart
/checkout                Shipping Address Selection
/order/paymethoud        Payment Method
/order/confirmation      Order Confirmation
/user/profile            User Profile
/user/orders             Order History
/user/favorites          Wishlist
/user/addresses          Saved Addresses
/admin                   Admin Dashboard
/admin/products          Admin Products
/admin/orders            Admin Orders
/admin/users             Admin Users
/admin/coupons           Admin Coupons
/admin/brands            Admin Brands
/admin/categories        Admin Categories
```

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@techstore.com | admin123 |
| Client | ahmed@example.com | client123 |

---

## Coupon Codes

| Code | Discount |
|---|---|
| WELCOME10 | 10% |
| SUMMER20 | 20% |
| TECH15 | 15% |
| FLASH30 | 30% |
| VIP25 | 25% |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Design System

- **Primary color:** `#6366f1` (indigo)
- **Secondary color:** `#ec4899` (pink)
- **Background:** `#f8fafc`
- Custom utilities: `.glass`, `.text-gradient`, `.bg-gradient-primary`, `.hover-lift`
- Animations: `.animate-fade-up`, `.animate-fade-in`, `.animate-scale-in`

---

## Problems Fixed

### UI Issues
- Fixed broken layout and alignment problems across multiple pages
- Resolved visual inconsistencies in card components, buttons, and spacing
- Corrected RTL-specific layout bugs (padding, margin, text alignment)

### Routing & Page Errors
- Fixed pages that were not rendering correctly or throwing errors on navigation
- Resolved broken routes in the user dashboard section (`/user/*`)
- Fixed admin dashboard pages failing to load

### Production Build Errors
- Resolved build-time errors that prevented the app from compiling for production
- Fixed import path issues and missing module references that only surfaced in the production bundle

### Styling Overhaul
- Migrated and updated global styles to align with Tailwind CSS v4 custom token system
- Standardized component styling across all pages for visual consistency

---

## Project Structure

```
src/
├── assets/           Static assets
├── components/       Reusable UI components
│   ├── admin/        Admin-specific components
│   └── user/         User-facing components
├── contexts/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── ToastContext.jsx
├── data/
│   └── dummyData.js  All mock data (products, categories, brands, orders)
├── pages/            Page-level components
│   ├── admin/
│   └── user/
├── App.jsx           Routes + Provider wrapping
└── index.css         Tailwind config + custom design tokens
```

---

> All data is currently hardcoded dummy data. No backend is connected.
