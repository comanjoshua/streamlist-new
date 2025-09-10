import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page page--box">
      <h1>Welcome to EZ Tech</h1>
      <p>
        Explore subscriptions and accessories. Add items to your cart, adjust quantities,
        and checkout when ready. Items persist in your browser.
      </p>
      <div className="actions">
        <Link className="btn primary" to="/subscriptions">Browse Subscriptions</Link>
        <Link className="btn" to="/cart">View Cart</Link>
      </div>
    </div>
  );
}
