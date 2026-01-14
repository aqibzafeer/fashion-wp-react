import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiChevronDown,
  FiShoppingCart,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { cartCount } = useCart();

  const navItems = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Products", to: "/products" },
    ],
    []
  );

  const isActive = (to) => {
    if (to === "/") return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const anyOpen = menuOpen || searchOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/30"
            : "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center py-2 sm:py-2.5 text-xs sm:text-sm font-medium">
          <span className="hidden sm:inline">Stay Warm, Stay Stylish - Winter Edit Out Now. </span>
          <span className="sm:hidden">Winter Edit Out Now! </span>
          <Link
            to="/products"
            className="underline underline-offset-4 hover:text-blue-300 transition-colors ml-1"
          >
            Shop Now
          </Link>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-3 items-center py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3 justify-start">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden inline-flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                aria-label="Open menu"
              >
                <FiMenu size={22} />
              </button>

              <div className="hidden lg:flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link to="/" className="block" aria-label="Go to homepage">
                <div className="leading-none text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">
                    AG
                  </div>
                  <div className="hidden sm:block text-[10px] tracking-[0.22em] text-gray-500 mt-1">
                    AZLAN GARMENTS
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 justify-end">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                aria-label="Search"
              >
                <FiSearch className="text-lg sm:text-xl" />
              </button>

              <button
                className="hidden sm:inline-flex relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                aria-label="Wishlist"
                type="button"
              >
                <FiHeart className="text-lg sm:text-xl" />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-linear-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  0
                </span>
              </button>

              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                aria-label="Cart"
              >
                <FiShoppingCart className="text-lg sm:text-xl" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-2 xl:gap-4 py-3">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative px-3 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                      active
                        ? "text-indigo-700 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/60"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label.toUpperCase()}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 align-middle">
                        {item.badge}
                      </span>
                    )}
                    <span
                      className={`absolute -bottom-0.5 left-4 right-4 h-0.5 rounded-full transition-all duration-300 ${
                        active ? "bg-indigo-600 opacity-100" : "bg-indigo-600 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}

              <div className="relative group ml-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold tracking-wide text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/60 transition-all"
                  aria-label="More"
                >
                  MORE <FiChevronDown />
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
                  <div className="p-2">
                    <Link
                      to="/most-popular"
                      className="block px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Most Popular
                    </Link>

                    <Link
                      to="/new-arrivals"
                      className="block px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                    >
                      New Arrivals
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Link */}
              {(() => {
                const item = { label: "Contact", to: "/contact" };
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative px-3 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                      active
                        ? "text-indigo-700 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/60"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label.toUpperCase()}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 align-middle">
                        {item.badge}
                      </span>
                    )}
                    <span
                      className={`absolute -bottom-0.5 left-4 right-4 h-0.5 rounded-full transition-all duration-300 ${
                        active ? "bg-indigo-600 opacity-100" : "bg-indigo-600 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })()}
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >
        <div
          className={`fixed top-0 left-0 h-full w-[85vw] max-w-90 bg-white/95 backdrop-blur-xl shadow-2xl z-60 transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <div className="font-bold text-lg text-gray-800">Menu</div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <FiX size={22} />
            </button>
          </div>

          <div className="p-4">
            <button
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              type="button"
            >
              <FiSearch />
              <span className="font-medium text-gray-800">Search products</span>
            </button>

            <div className="mt-4 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-800 hover:text-indigo-700 hover:bg-indigo-50/60"
                    }`}
                  >
                    <span>{item.label.toUpperCase()}</span>
                    {item.badge && (
                      <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              {/* More items for mobile */}
              <Link
                to="/most-popular"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive("/most-popular")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-800 hover:text-indigo-700 hover:bg-indigo-50/60"
                }`}
              >
                <span>MOST POPULAR</span>
              </Link>
              <Link
                to="/new-arrivals"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive("/new-arrivals")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-800 hover:text-indigo-700 hover:bg-indigo-50/60"
                }`}
              >
                <span>NEW ARRIVALS</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive("/contact")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-800 hover:text-indigo-700 hover:bg-indigo-50/60"
                }`}
              >
                <span>CONTACT</span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3 font-medium">Follow Us</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-pink-50 text-pink-500 rounded-full hover:bg-pink-100 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube size={18} />
                </a>
              </div>

        
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-all duration-300 ${
          searchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSearchOpen(false)}
        aria-hidden={!searchOpen}
      >
        <div className="flex flex-col items-center pt-18 sm:pt-24 px-4">
          <div
            className={`w-full max-w-2xl transform transition-all duration-300 ${
              searchOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-800">Search</div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <FiX size={18} />
                </button>
              </div>
              <div className="p-4 sm:p-5">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full px-5 py-4 pr-12 text-base sm:text-lg bg-white rounded-2xl shadow-sm border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-300 placeholder-gray-400"
                    autoFocus
                  />
                  <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                </div>
                <div className="mt-3 text-center text-xs text-gray-500">
                  Press <span className="font-semibold">ESC</span> to close
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
