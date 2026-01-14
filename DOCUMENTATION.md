# Azlan Garments (AG) - Project Documentation

## 📋 Project Overview

**Azlan Garments (AG)** is a modern, full-featured e-commerce web application built with React.js and integrated with WordPress/WooCommerce as the backend. The application provides a seamless shopping experience for clothing and garments.

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | Frontend UI Library |
| Vite | 6.3.5 | Build Tool & Dev Server |
| Tailwind CSS | 4.1.7 | Styling Framework |
| React Router DOM | 7.6.1 | Client-side Routing |
| Axios | 1.9.0 | HTTP Client for API calls |
| Framer Motion | 12.23.0 | Animations |
| React Toastify | 11.0.5 | Toast Notifications |
| Lucide React & React Icons | - | Icon Libraries |

### Backend Integration
- **WordPress/WooCommerce REST API** - Product management, orders, categories
- **Authentication** - WooCommerce Consumer Key/Secret

---

## 📁 Project Structure

```
Azlan-Garments/
├── public/                     # Static assets
│   ├── cat/                    # Category images
│   ├── products/               # Product images
│   ├── banner-img.jpeg         # Hero banner
│   ├── fav.png                 # Favicon
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO robots file
│   └── sitemap.xml             # SEO sitemap
│
├── src/
│   ├── api/                    # API layer
│   ├── assets/                 # Dynamic assets
│   ├── components/             # Reusable UI components
│   ├── context/                # React Context providers
│   ├── hooks/                  # Custom React hooks
│   ├── layouts/                # Page layouts
│   ├── pages/                  # Route pages
│   ├── services/               # External service integrations
│   ├── utils/                  # Utility functions
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   ├── routes.jsx              # Route definitions
│   └── index.css               # Global styles
│
├── package.json
├── vite.config.js
├── tailwind.config.cjs
├── eslint.config.js
└── vercel.json                 # Vercel deployment config
```

---

## 🚀 Entry Points

### `main.jsx`
Application entry point that renders the root `App` component with React StrictMode.

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### `App.jsx`
Root component that sets up:
- **React Router** - Client-side routing
- **CartProvider** - Shopping cart state management
- **SearchProvider** - Search functionality state
- **ScrollToTop** - Auto-scroll on route change
- **ToastContainer** - Global toast notifications

---

## 🛣️ Routes (`routes.jsx`)

| Path | Component | Description |
|------|----------|-------------|
| `/`             | Home            | Landing page |
| `/about`        | About           | About page |
| `/contact`      | Contact         | Contact page |
| `/products`     | Products        | Product listing with filters |
| `/product/:id`  | SingleProduct   | Product detail page |
| `/cart`         | Cart            | Shopping cart |
| `/checkout`     | Checkout        | Checkout process |
| `/thank-you`    | ThankYou        | Order confirmation |
| `/new-arrivals` | NewArrival      | New arrivals listing |
| `/most-popular` | MostPopular     | Popular products |
| `/admin`        | WordPressAdmin  | Admin dashboard |
| `*`             | PageNotFound    | 404 page |

### Lazy Loading
Most pages are lazy-loaded for better performance:
```jsx
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
// ... etc
```

---

## 📦 Pages

### `Home.jsx`
Landing page composed of:
- **HeroSection** - Main banner with CTA
- **CategoryGrid** - Shop by category (Boys, Girls, Men, Women)
- **FeatureSection** - Feature highlights
- **BuySection** - Promotional section
- **OurValues** - Company values
- **FeaturedProducts** - Product category grid

### `Products.jsx`
Product listing page with:
- Search functionality
- Category filtering (pills)
- Price/alphabetical sorting
- Stock filtering
- Price range filter
- Grid/List view toggle
- Pagination
- Loading skeletons

### `SingleProduct.jsx`
Product detail page featuring:
- Image gallery with zoom modal
- Product information (name, price, description)
- Quantity selector
- Add to cart functionality
- Related products

### `Cart.jsx`
Shopping cart page with:
- Cart items list
- Quantity adjustment (+/-)
- Remove item functionality
- Order summary (subtotal, shipping, total)
- Checkout button

### `Checkout.jsx`
Checkout page including:
- Shipping information form
- Payment method selection (COD, Card, Easypaisa)
- Order notes
- Order summary
- Order creation via WooCommerce API

### `ThankYou.jsx`
Order confirmation page displayed after successful checkout.

---

## 🧩 Components

### Layout Components

#### `MainLayout.jsx`
Main page wrapper with:
- Sticky Header
- Main content area (Outlet)
- Footer

#### `Header.jsx`
Responsive header featuring:
- Promotional banner
- Logo with gradient styling
- Navigation menu (desktop)
- Mobile hamburger menu
- Search functionality
- Cart icon with item count
- Social media links

#### `Footer.jsx`
Footer with:
- Company description
- Information links
- Customer service links
- Account links
- Language selector
- Copyright notice

### Product Components

| Component             | Description |
| `ProductGrid.jsx`     | Grid layout for products |
| `ProductList.jsx`     | List layout for products |
| `ProductFilters.jsx`  | Filter controls (price, sort, stock) |
| `ProductSkeleton.jsx` | Loading skeleton for products |
| `Pagination.jsx`      | Page navigation component |

### Home Page Components

| Component | Description |
| `HeroSection.jsx`       | Main banner with background image |
| `CategoryGrid.jsx`      | Category cards (Boys, Girls, Men, Women) |
| `FeaturedProducts.jsx`  | Featured product categories grid |
| `FeatureSection.jsx`    | Feature highlights section |
| `BuySection.jsx`        | Promotional/buy section |
| `OurValues.jsx`         | Company values display |
| `PageHero.jsx` | Reusable hero banner component |

### Utility Components

| Component | Description |
|-----------|-------------|
| `LoadingSpinner.jsx` | Full-page loading indicator |
| `ScrollToTop.jsx` | Auto-scroll to top on route change |
| `SearchBar.jsx` | Search input component |

---

## 🔄 Context Providers

### `CartContext.js` & `CartProvider.jsx`
Shopping cart state management with:
- **State**: `cart` array
- **Actions**:
  - `addToCart(product, quantity)` - Add item to cart
  - `removeFromCart(id)` - Remove item from cart
  - `updateQuantity(id, quantity)` - Update item quantity
  - `clearCart()` - Empty the cart
- **Computed**:
  - `cartTotal` - Total price
  - `cartCount` - Total items count
- **Persistence**: localStorage synchronization

### `SearchContext.jsx` & `SearchProvider.jsx`
Search state management:
- **State**: `searchTerm`
- **Actions**: `setSearchTerm(term)`

---

## 🪝 Custom Hooks

### `useCart.js`
Hook to access cart context:
```jsx
const { cart, addToCart, removeFromCart, cartTotal } = useCart();
```

### `useProducts.js`
Comprehensive product management hook providing:
- Product fetching with caching (in-memory + sessionStorage)
- Filtering (category, price range, stock)
- Sorting (price, alphabetical)
- Search with debounce
- Pagination
- Category extraction

**Returns:**
```jsx
{
  loading, products, categories,
  priceSort, alphaSort, categorySort, stockFilter, priceRange,
  setPriceSort, setAlphaSort, setCategorySort, setStockFilter, setPriceRange,
  searchTerm, setSearchTerm,
  currentPage, setCurrentPage, totalPages, goToPage,
  filteredProducts, currentProducts,
  activeFiltersCount, priceStats, clearAllFilters
}
```

### `useDebounce.js`
Debounce hook for search optimization:
```jsx
const debouncedValue = useDebounce(value, delay);
```

### `useSearch.js`
Hook to access search context:
```jsx
const { searchTerm, setSearchTerm } = useSearch();
```

---

## 🌐 API Layer

### `FetchData.jsx`
Primary API module for WooCommerce integration:

| Function | Description |
|----------|-------------|
| `fetchProducts(params)` | Fetch all products (paginated) |
| `fetchProductById(id)` | Fetch single product |
| `fetchCategories()` | Fetch all categories |
| `getImageUrl(url)` | Process image URLs |
| `fetchImageAsDataUrl(url)` | Fetch image as data URL (CORS bypass) |

### `FetchDataHeadless.jsx`
Alternative headless API implementation.

### `wooCommerceAPI.js`
WooCommerce service layer:

| Function | Description |
|----------|-------------|
| `fetchWooProducts(params)` | Fetch products |
| `fetchWooProduct(id)` | Fetch single product |
| `searchWooProducts(search)` | Search products |
| `fetchProductsByCategory(id)` | Fetch by category |
| `fetchWooCategories()` | Fetch categories |
| `createWooOrder(orderData)` | Create new order |

---

## 🔧 Services

### `AuthService.js`
Authentication service for user management.

### `wooCommerceAPI.js`
WooCommerce REST API integration with Axios.

---

## 🛠️ Utilities

### `stripHtml.js`
Removes HTML tags from strings (used for product descriptions).

### `extractKeywords.js`
Extracts keywords from text (for SEO/search).

---

## ⚙️ Configuration

### Environment Variables
Create a `.env` file with:
```env
VITE_WOO_API_BASE_URL=https://your-wordpress-site.com/wp-json/wc/v3
VITE_WOO_CUSTOMER_KEY=ck_xxxxxxxxxxxx
VITE_WOO_CONSUMER_SECRET=cs_xxxxxxxxxxxx
```

### Vite Config (`vite.config.js`)
Build tool configuration for React + Tailwind.

### Tailwind Config (`tailwind.config.cjs`)
Tailwind CSS customizations.

### ESLint Config (`eslint.config.js`)
Code linting rules.

### Vercel Config (`vercel.json`)
Deployment configuration for Vercel hosting.

---

## 📜 NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Run ESLint |

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│  (Pages & Components)                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Custom Hooks                             │
│  useProducts, useCart, useSearch, useDebounce                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Context Providers                          │
│  CartProvider, SearchProvider                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API Layer                               │
│  FetchData.jsx, wooCommerceAPI.js                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  WordPress/WooCommerce API                      │
│  Products, Categories, Orders                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/aqibzafeer/WP-REACT.git

# Navigate to project
cd Azlan-Garments

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your WooCommerce credentials

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview  # Preview the build
```

---

## 📝 Key Features

1. **Responsive Design** - Mobile-first approach with Tailwind CSS
2. **Product Catalog** - Full product listing with filters and sorting
3. **Shopping Cart** - Persistent cart with localStorage
4. **Checkout** - Complete checkout flow with WooCommerce orders
5. **Search** - Real-time product search with debouncing
6. **Lazy Loading** - Code splitting for better performance
7. **Image Optimization** - CORS handling and fallback images
8. **Toast Notifications** - User feedback for actions
9. **SEO Ready** - Sitemap, robots.txt, meta tags
10. **PWA Support** - Manifest file for installability

---

## 📄 License

Copyright 2025 - by [Aqib Zafeer](https://aqibzafeer.vercel.app/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
