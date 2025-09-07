import React from 'react';
import { useCart } from '../../hooks/useCart';
import { calcSubtotal, calcTax, calcTotal, eligibleFreeShipping } from '../../utils/totals';
import { formatCurrency } from '../../utils/currency';
import './Cart.css';


export default function CartSummary() {
const { state, clear } = useCart();
const subtotal = calcSubtotal(state.items);
const tax = calcTax(subtotal);
const total = calcTotal(subtotal, tax);


return (
<aside className="summary">
<h3>Summary</h3>
<dl>
<div className="row">
<dt>Subtotal</dt>
<dd>{formatCurrency(subtotal)}</dd>
</div>
<div className="row">
<dt>Tax</dt>
<dd>{formatCurrency(tax)}</dd>
</div>
<div className="row total">
<dt>Total</dt>
<dd data-testid="grand-total">{formatCurrency(total)}</dd>
</div>
</dl>
{eligibleFreeShipping(subtotal) ? (
<p className="hint success">🎉 You qualify for free shipping!</p>
) : (
<p className="hint">Add more items to unlock free shipping.</p>
)}
<div className="actions">
<button className="btn" onClick={clear} disabled={state.items.length === 0}>Clear cart</button>
<button className="btn primary" disabled={state.items.length === 0}>Checkout</button>
</div>
</aside>
);
}