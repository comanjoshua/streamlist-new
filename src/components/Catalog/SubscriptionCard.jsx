// src/components/Catalog/SubscriptionCard.jsx
import React from "react";
import useCart from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import "./Catalog.css";

export default function SubscriptionCard({ plan }) {
  const cart = useCart();
  const inCart = cart.items.some(
    (i) => i.id === plan.id && i.type === "subscription"
  );
  const hasOtherSub = cart.items.some(
    (i) => i.type === "subscription" && i.id !== plan.id
  );

  const disabled = inCart || hasOtherSub;

  const handleAdd = () => {
    if (disabled) return;
    cart.addItem({
      id: plan.id,
      title: plan.title,
      price: plan.price,
      type: "subscription",
      image: plan.image,
      qty: 1,
    });
  };

  return (
    <article className="card plan">
      <img src={plan.image} alt={plan.title} className="thumb" />
      <h4>{plan.title}</h4>
      <p className="price">{formatCurrency(plan.price)} / mo</p>
      <button
        className={`btn ${disabled ? "disabled" : "primary"}`}
        onClick={handleAdd}
        disabled={disabled}
      >
        {inCart ? "Added" : "Add"}
      </button>
    </article>
  );
}
