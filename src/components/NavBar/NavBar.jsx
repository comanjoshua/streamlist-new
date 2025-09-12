import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import useCart from "../../context/CartContext";
import "./NavBar.css";

export default function NavBar({ user }) {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + (i.qty || 1), 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="nav">
      <div className="nav__inner">
        {/* Brand left */}
        <NavLink to="/" className="brand">
          EZ Tech
        </NavLink>

        {/* Right side links and controls */}
        <div className="nav__right">
          <NavLink
            to="/store"
            className={({ isActive }) =>
              `pill ${isActive ? "pill--active" : ""}`
            }
          >
            Store
          </NavLink>

          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              `pill ${isActive ? "pill--active" : ""}`
            }
          >
            Subscriptions
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `pill cart-link ${isActive ? "pill--active" : ""}`
            }
          >
            Cart
            {count > 0 && <span className="cart-bug">{count}</span>}
          </NavLink>

          {user && (
            <button onClick={handleLogout} className="pill logout-btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
