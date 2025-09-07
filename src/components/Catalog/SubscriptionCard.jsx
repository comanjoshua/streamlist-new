import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/currency';
import './Catalog.css';

export default function SubscriptionCard({ plan }) {
  const { state, add } = useCart();
  const inCart = state.items.some((i) => i.id === plan.id); // already added?

  const handleAdd = () => {
    if (inCart) return; // no-op if already in cart
    add({
      id: plan.id,
      title: plan.title,
      price: plan.price,
      type: 'subscription',
      image: plan.image,
      qty: 1,
    });
  };

  return (
    <article className="card plan">
      <h4>{plan.title}</h4>
      <p className="price">{formatCurrency(plan.price)} / mo</p>
      <ul className="features">
        {plan.features?.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <button className="btn primary" onClick={handleAdd} disabled={inCart}>
        {inCart ? 'Added (Limit 1)' : 'Add'}
      </button>
    </article>
  );
}
