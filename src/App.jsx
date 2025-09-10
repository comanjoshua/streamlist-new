// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { WatchlistProvider } from "./context/WatchlistContext"; // ✅ import provider

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import WatchlistPage from "./pages/Watchlist";
import StorePage from "./pages/Store";
import SubscriptionsPage from "./pages/Subscriptions";
import Details from "./pages/Details";
import SearchPage from "./pages/Search";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.add(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(next);
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className="app">
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main className="page">
        {/* ✅ Wrap everything that needs watchlist access */}
        <WatchlistProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </WatchlistProvider>
      </main>
    </div>
  );
}
