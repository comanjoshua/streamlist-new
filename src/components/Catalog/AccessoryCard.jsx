// src/components/Catalog/AccessoryCard.jsx
import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/currency';
import './Catalog.css';

export default function AccessoryCard({ item }) {
  const { add } = useCart();

  // Accept either normalized shape ({ title, image, category, price })
  // or your required data.js shape ({ service, img, serviceInfo, price })
  const title = item.title ?? item.service ?? 'Accessory';
  const image = item.image ?? item.img ?? '';
  const category = item.category ?? item.serviceInfo ?? 'Accessory';
  const price = Number(item.price) || 0;

  const handleAdd = () => {
    add({
      id: item.id,
      title,
      price,
      image,
      type: 'accessory', // enforce accessory type for cart rules
      qty: 1,
    });
  };

  return (
    <article className="card accessory">
      <img src={image} alt="" className="thumb" />
      <div className="body">
        <h4>{title}</h4>
        <p className="muted">{category}</p>
        <div className="row between">
          <strong>{formatCurrency(price)}</strong>
          <button className="btn" onClick={handleAdd}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
