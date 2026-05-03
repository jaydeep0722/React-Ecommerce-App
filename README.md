# LUXEstore — React + Redux Toolkit E-Commerce App

A complete e-commerce application built with React 18 and Redux Toolkit, fulfilling all interview task requirements.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

App runs at **http://localhost:3000**

### Demo Credentials
- **Username:** `emilys`
- **Password:** `emilyspass`

---

## 📁 Project Structure

```
src/
├── app/
│   └── store.js                    # Redux store configuration
├── features/
│   ├── auth/
│   │   └── authSlice.js            # Login thunk, JWT storage, selectors
│   ├── products/
│   │   └── productsSlice.js        # Fetch products & categories, pagination
│   └── cart/
│       └── cartSlice.js            # Add/remove/update/clear cart
├── pages/
│   ├── Login/
│   │   ├── Login.jsx               # Authentication page
│   │   └── Login.css
│   ├── Home/
│   │   ├── Home.jsx                # Product listing with filters & pagination
│   │   └── Home.css
│   └── Checkout/
│       ├── Checkout.jsx            # Cart summary & order placement
│       └── Checkout.css
├── components/
│   ├── Navbar/                     # Cart count badge, user info, logout
│   ├── ProductCard/                # Product display + Add to Cart
│   ├── CategoryFilter/             # Category pills filter
│   ├── Pagination/                 # Smart pagination with ellipsis
│   └── ProtectedRoute/             # Auth guard wrapper
├── styles/
│   └── globals.css                 # CSS variables, reset, Google Fonts
├── App.js                          # BrowserRouter + Routes
└── index.js                        # React entry point
```

---

## ✅ Requirements Checklist

| Requirement | Status |
|---|---|
| React app with best practices | ✅ |
| Redux Toolkit store | ✅ |
| User authentication via dummyjson API | ✅ |
| JWT stored in localStorage | ✅ |
| Error handling on login | ✅ |
| Home page with product listing | ✅ |
| Category-wise filter | ✅ |
| Pagination | ✅ |
| Add to Cart with Redux | ✅ |
| Cart count in Navbar | ✅ |
| Checkout page with totals | ✅ |
| Protected routes | ✅ |

---

## 🛠 Tech Stack

- **React 18** — UI library
- **Redux Toolkit** — State management (createSlice, createAsyncThunk)
- **React Redux** — connect React to Redux store
- **React Router DOM v6** — Routing & protected routes
- **DummyJSON API** — Auth, products, categories

---

## 🏗 Architecture Decisions

### Redux Toolkit Slices
Each domain has its own slice with `createAsyncThunk` for API calls:
- **authSlice** — handles login, logout, JWT persistence
- **productsSlice** — products list, categories, selected category, current page, total count
- **cartSlice** — synchronous add/remove/update/clear (no API needed)

### Protected Routes
Using React Router v6 `<Outlet>` pattern. `ProtectedRoute` checks Redux auth state; unauthenticated users are redirected to `/login`.

### Pagination Strategy
Server-side pagination using `limit` and `skip` query params from the DummyJSON API. Category changes reset the page to 1.

### JWT Persistence
Token and user info are saved in `localStorage` on login and read back as initial Redux state, so users stay logged in on page refresh.

---

## 🎨 Design
Dark luxury aesthetic with gold accents, Playfair Display serif headings, and DM Sans body text. Skeleton loading states, hover animations, and responsive grid layout.
