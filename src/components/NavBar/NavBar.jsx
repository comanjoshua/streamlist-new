// src/components/NavBar/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// hooks
import useCart from "../../context/CartContext";
import { useWatchlist } from "../../context/WatchlistContext";

// icons
import {
  MdHome,
  MdSubscriptions,
  MdShoppingCart,
  MdSearch,
  MdWbSunny,
  MdDarkMode,
  MdInfo,
  MdBookmark,
  MdStore,
} from "react-icons/md";

import "./NavBar.css";

export default function NavBar({ theme: parentTheme, toggleTheme }) {
  // ---- counts ----
  let cart = undefined;
  try {
    cart = typeof useCart === "function" ? useCart() : undefined;
  } catch {
    cart = undefined;
  }
  const cartItems = Array.isArray(cart?.items) ? cart.items : [];
  const cartCount = cartItems.reduce((n, i) => n + (Number(i?.qty) || 0), 0);

  let wl = undefined;
  try {
    wl = useWatchlist?.() || undefined;
  } catch {
    wl = undefined;
  }
  const watchlistCount = Array.isArray(wl?.list) ? wl.list.length : 0;

  // ---- theme ----
  const [theme, setTheme] = useState(parentTheme || "light");
  useEffect(() => {
    const saved = localStorage.getItem("theme") || parentTheme || "light";
    setTheme(saved);
  }, [parentTheme]);

  const handleToggleTheme = () => {
    if (toggleTheme) toggleTheme();
  };

  // pill styling function
  const pill = ({ isActive }) => `pill${isActive ? " pill--active" : ""}`;

  return (
    <header className="nav">
      <div className="nav__inner">
        {/* brand */}
        <Link to="/" className="brand">
          StreamList
        </Link>

        {/* right side */}
        <div className="nav__right">
          <nav className="nav__links">
            <NavLink to="/" end className={pill}>
              <MdHome size={16} />
              <span>Home</span>
            </NavLink>

            <NavLink to="/search" className={pill}>
              <MdSearch size={16} />
              <span>Search</span>
            </NavLink>

            <NavLink to="/watchlist" className={pill}>
              <MdBookmark size={16} />
              <span>Watchlist</span>
              {watchlistCount > 0 && (
                <span className="nav__bug">{watchlistCount}</span>
              )}
            </NavLink>

            <NavLink to="/store" className={pill}>
              <MdStore size={16} />
              <span>Store</span>
            </NavLink>

            <NavLink to="/subscriptions" className={pill}>
              <MdSubscriptions size={16} />
              <span>Subscriptions</span>
            </NavLink>

            <NavLink to="/cart" className={pill}>
              <MdShoppingCart size={16} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="nav__bug">{cartCount}</span>
              )}
            </NavLink>

            <NavLink to="/about" className={pill}>
              <MdInfo size={16} />
              <span>About</span>
            </NavLink>
          </nav>

          {/* theme toggle */}
          <button
            type="button"
            className="themeToggle"
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <MdWbSunny size={20} style={{ color: "#facc15" }} />
            ) : (
              <MdDarkMode size={20} style={{ color: "#1e3a8a" }} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
