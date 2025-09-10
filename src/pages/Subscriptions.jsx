// src/pages/Subscriptions.jsx
import React from "react";
import list from "../data/Data.js";
import SubscriptionCard from "../components/Catalog/SubscriptionCard";
import useCart from "../context/CartContext";

function normalize(item) {
  const isSub = item.service.toLowerCase().includes("subscription");
  return {
    id: item.id,
    title: item.service,
    price: item.price,
    image: item.img,
    category: item.serviceInfo,
    type: isSub ? "subscription" : "accessory",
    features: [item.serviceInfo].filter(Boolean),
  };
}

export default function Subscriptions() {
  const normalized = Array.isArray(list) ? list.map(normalize) : [];
  const subscriptions = normalized.filter((p) => p.type === "subscription");

  const cart = useCart();
  const activeSub = cart.items.find((i) => i.type === "subscription");

  return (
    <section className="stack container">
      <h2>Subscriptions</h2>

      {/* Netflix-style row */}
      <div className="row-scroll">
        {subscriptions.map((plan) => (
          <SubscriptionCard key={plan.id} plan={plan} />
        ))}
      </div>

      {activeSub && (
        <aside className="subscription-manager">
          <h3>Manage Subscription</h3>
          <p><strong>{activeSub.title}</strong></p>
          <p>{`$${activeSub.price}/mo`}</p>
          <div className="actions">
            <button className="btn">Change</button>
            <button className="btn danger" onClick={() => cart.removeItem(activeSub.id)}>
              Cancel
            </button>
          </div>
        </aside>
      )}
    </section>
  );
}
