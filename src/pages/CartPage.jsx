import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/Cart/CartItem.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';


export default function CartPage() {
const { state } = useCart();


if (state.items.length === 0) {
return (
<section className="card">
<h2>Your cart is empty</h2>
<p>Add subscriptions or accessories to get started.</p>
</section>
);
}


return (
<section className="cart">
<div>
{state.items.map((it) => <CartItem key={it.id} item={it} />)}
</div>
<CartSummary />
</section>
);
}