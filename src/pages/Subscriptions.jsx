// src/pages/Subscriptions.jsx
import React from 'react';
import list from '../data/Data.js'; // default export from src/data.js
import SubscriptionCard from '../components/Catalog/SubscriptionCard.jsx';
import AccessoryCard from '../components/Catalog/AccessoryCard.jsx';

function normalize(item) {
  const isSub = /subscription/i.test(item.service);
  return {
    id: item.id,
    title: item.service,            // maps to our UI
    price: item.price,
    image: item.img,                // map img -> image
    category: item.serviceInfo,     // used by AccessoryCard
    type: isSub ? 'subscription' : 'accessory',
    features: [item.serviceInfo].filter(Boolean), // for SubscriptionCard
  };
}

export default function Subscriptions() {
  const normalized = Array.isArray(list) ? list.map(normalize) : [];
  const subscriptions = normalized.filter(p => p.type === 'subscription');
  const accessories = normalized.filter(p => p.type === 'accessory');

  return (
    <section className="stack">
      <h2>Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <p className="muted">No subscriptions available.</p>
      ) : (
        <div className="grid">
          {subscriptions.map(plan => (
            <SubscriptionCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      <h2 style={{ marginTop: '1.5rem' }}>Accessories</h2>
      {accessories.length === 0 ? (
        <p className="muted">No accessories available.</p>
      ) : (
        <div className="grid">
          {accessories.map(item => (
            <AccessoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
