# 🛍️ Myntra Clone - Full Stack Fashion E-Commerce Web Application

A full-stack, responsive e-commerce web application inspired by **Myntra** — India's premier fashion and lifestyle platform. Built with modern web technologies: **React 18, Vite, Tailwind CSS, Lucide Icons, Express.js, and Node.js**.

---

## ✨ Key Features

- 🌟 **Sticky Navigation & Header**: Authentic Myntra logo, Category MegaMenu (`MEN`, `WOMEN`, `KIDS`, `BEAUTY`, `STUDIO`), live debounced search with instant autocomplete, wishlist count, and bag badge counters.
- ⚡ **Storefront & Homepage**:
  - Auto-playing Hero Carousel with seasonal fashion banners.
  - **Deal of the Day** with live real-time ticking countdown timer (`HH : MM : SS`).
  - Circular Category pills & Grand Global Brands festival showcase.
  - Click-to-copy discount coupon strip (`MYNTRA200`, `FASHION50`).
- 🔍 **Product Listing Page (PLP)**:
  - Multi-faceted dynamic sidebar filters: Categories, Brand search & checkboxes, Price slider, Color swatches, Discount %, Customer Ratings.
  - Sorting options (Price Low/High, Better Discount, Rating, Newest, Recommended).
  - Product cards with image hover flip, ratings chip, price/MRP breakdown, quick wishlist toggle, and quick add-to-bag size selector.
  - Active filter chip removal and one-click "Clear All".
- 👗 **Product Detail Page (PDP)**:
  - Multi-angle gallery with zoom-on-hover high-resolution preview.
  - Size selection grid with inventory stock warning ("Only 2 left!").
  - **Size Chart Modal** with measurements in inches/cm.
  - **Real-Time Pincode Estimator** with delivery dates and COD validation.
  - Product specifications and verified customer reviews feed with "Rate Product" modal.
- 🛒 **Shopping Bag & Dynamic Coupon Engine**:
  - 2-Column Myntra layout with delivery address strip, quantity selector (1–10), size change, and "Move to Wishlist".
  - **Apply Coupon Widget** supporting `MYNTRA200` (₹200 OFF), `FASHION50` (50% OFF), `WELCOME100`, and `FESTIVE15`.
  - Comprehensive price breakdown (MRP, Discount, Coupon savings, Free delivery threshold).
- 💳 **Multi-Step Checkout**:
  - Saved delivery addresses management with add/edit/delete address modal.
  - Payment options: **UPI / QR Code**, **Credit/Debit Card** with live card visualizer, **Net Banking**, and **Cash on Delivery**.
  - **Confetti celebration** animation on order placement.
- 📦 **Order Tracking & History**:
  - 5-stage status progress stepper: `Placed` → `Packed` → `Shipped` → `Out for Delivery` → `Delivered`.
  - Cancel order functionality for active shipments.
- 👤 **User Profile & 1-Click Demo Login**:
  - Instant demo switch button (`demo@myntra.com` / `password123`) for effortless testing without registration.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router v6, Canvas Confetti, Axios
- **Backend**: Node.js, Express.js, JWT Authentication, bcryptjs, CORS
- **Database**: Persistent JSON Store with atomic transactions & pre-seeded realistic fashion catalog
- **Deployment**: Configured for Vercel (Frontend Static + Serverless Functions)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/myntra-clone.git
cd myntra-clone
```

### 2. Install Dependencies
```bash
# Install root, server, and client dependencies
npm install
npm install --prefix server
npm install --prefix client
```

### 3. Run Development Server
```bash
npm run dev
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api`

---

## 🔑 Demo Credentials
- **Email**: `demo@myntra.com`
- **Password**: `password123`
*(Or click the **1-Click Demo Login** button in the app)*

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Click **"Deploy"** — `vercel.json` will automatically build the client and route `/api/*` requests to the serverless function.
