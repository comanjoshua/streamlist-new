// src/pages/Shop.jsx
import React from "react";
import list from "../data/Data.js";
import AccessoryCard from "../components/Catalog/AccessoryCard";

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

export default function Shop() {
  const normalized = Array.isArray(list) ? list.map(normalize) : [];
  const accessories = normalized.filter((p) => p.type === "accessory");

  return (
    <section className="stack container">
      <h2>Shop Accessories</h2>
      {accessories.length === 0 ? (
        <p className="muted">No accessories available.</p>
      ) : (
        <div className="catalog-grid">
          {accessories.map((item) => (
            <AccessoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
