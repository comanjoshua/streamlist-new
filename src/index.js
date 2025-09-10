import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { WatchlistProvider } from "./context/WatchlistContext";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";

// Apply saved theme before React mounts
(function () {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.classList.add(saved);
    } else {
      document.documentElement.classList.add("light");
    }
  } catch (err) {
    console.error("Error setting theme", err);
  }
})();

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("ServiceWorker registered:", registration);
      })
      .catch((error) => {
        console.error("ServiceWorker registration failed:", error);
      });
  });
}
