// src/components/Catalog/AccessoryCard.jsx
import React, { useState } from "react";
import useCart from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import "./Catalog.css";

export default function AccessoryCard({ item }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);

  const inCart = cart.items.find(
    (i) => i.id === item.id && i.type === "accessory"
  );

  const handleAdd = () => {
    cart.addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      type: "accessory",
      image: item.image,
      qty,
    });
  };

  return (
    <article className="card accessory">
      <img src={item.image} alt={item.title} className="thumb" />
      <h4>{item.title}</h4>
      <p className="price">{formatCurrency(item.price)}</p>

      <div className="stepper">
        <button onClick={() => setQty(Math.max(1, qty - 1))}>–</button>
        <span>{qty}</span>
        <button onClick={() => setQty(qty + 1)}>+</button>
      </div>

      <button
        className={`btn ${inCart ? "disabled" : "primary"}`}
        onClick={handleAdd}
      >
        {inCart ? "Added" : "Add to Cart"}
      </button>
    </article>
  );
}
