import React from 'react';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/currency';
import { isSubscription } from '../../utils/guards'; // ← add this
import './Cart.css';

export default function CartItem({ item }) {
  const { setQty, remove } = useCart();
  const isSub = isSubscription(item);

  return (
    <div className="cartItem" data-testid="cart-item">
      <img src={item.image} alt="" className="cartItem__img" />
      <div className="cartItem__meta">
        <h4>{item.title}</h4>
        <span className="type">
          {item.type} {isSub && '• Limit 1'}
        </span>
      </div>
      <div className="cartItem__controls">
        <label>
          Qty
          <input
            type="number"
            min="1"
            value={item.qty}
            disabled={isSub}                 // ← lock qty for subs
            onChange={(e) => setQty(item.id, parseInt(e.target.value || '1', 10))}
          />
        </label>
        <div className="price">{formatCurrency(item.price * item.qty)}</div>
        <button className="link" onClick={() => remove(item.id)} aria-label={`Remove ${item.title}`}>
          Remove
        </button>
      </div>
    </div>
  );
}
