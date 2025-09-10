// src/pages/Store.jsx
import React from "react";
import list from "../data/Data.js";
import AccessoryCard from "../components/Catalog/AccessoryCard.jsx";

function normalize(item) {
  return {
    id: item.id,
    title: item.service,
    price: item.price,
    image: item.img,
    category: item.serviceInfo,
    type: "accessory",
  };
}

export default function Store() {
  const normalized = Array.isArray(list) ? list.map(normalize) : [];
  const accessories = normalized.filter(
    (p) => !p.title.toLowerCase().includes("subscription")
  );

  return (
    <section className="stack container">
      <h2>Store</h2>
      {accessories.length === 0 ? (
        <p className="muted">No accessories available.</p>
      ) : (
        <div className="store-grid">
          {accessories.map((item) => (
            <AccessoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
