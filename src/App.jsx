// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import StorePage from "./pages/Store";
import SubscriptionsPage from "./pages/Subscriptions";
import Details from "./pages/Details";
import CreditCardPage from "./pages/CreditCardPage"; 
import ConfirmationPage from "./pages/ConfirmationPage";

export default function App() {
  const [theme, setTheme] = useState("light");

  // load theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.add(saved);
  }, []);

  // toggle theme
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
        <Routes>
          {/* public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* services + cart */}
          <Route path="/store" element={<StorePage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* checkout */}
          <Route path="/checkout" element={<CreditCardPage />} /> 
          <Route path="/confirmation" element={<ConfirmationPage />} />


          {/* details */}
          <Route path="/details/:id" element={<Details />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
