import React from "react";
import { Link } from "react-router-dom";
import useCart from "../context/CartContext";
import { img } from "../api/tmdb";

export default function CartPage() {
  const cart = useCart();
  const { items, removeItem, clear, updateQty } = cart;

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <section className="stack container cart-layout">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p className="muted">Cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {/* Left: items */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-card">
                <div className="thumb-wrap">
                  <img
                    src={
                      item.poster_path
                        ? img(item.poster_path, "w200")
                        : item.image
                    }
                    alt={item.title}
                  />
                </div>

                <div className="cart-info">
                  <h3>{item.title}</h3>
                  {item.price && (
                    <p className="price">${item.price.toFixed(2)}</p>
                  )}
                  <p className="muted">
                    {item.release_date?.slice(0, 4)} • Rating:{" "}
                    {item.vote_average ?? "—"}
                  </p>

                  {/* Stepper only for accessories */}
                  {item.type !== "subscription" && (
                    <div className="stepper">
                      <button
                        onClick={() =>
                          updateQty(item.id, (item.qty || 1) - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.qty || 1}</span>
                      <button
                        onClick={() =>
                          updateQty(item.id, (item.qty || 1) + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  )}

                  <button
                    className="btn danger"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: summary */}
          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <p>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </p>

            <Link to="/checkout" className="btn">
              Proceed to Checkout
            </Link>

            <button className="btn danger" onClick={clear}>
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
