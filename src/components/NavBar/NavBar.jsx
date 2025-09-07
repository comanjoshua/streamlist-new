import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import './NavBar.css';


export default function NavBar() {
const { state } = useCart();
const count = state.items.reduce((n, i) => n + i.qty, 0);


return (
<header className="nav">
<div className="nav__inner">
<Link to="/" className="brand">EZ Tech</Link>
<nav className="nav__links">
<NavLink to="/" end>Home</NavLink>
<NavLink to="/subscriptions">Subscriptions</NavLink>
<NavLink to="/cart" className="cartLink">
Cart
{count > 0 && <span className="badge" data-testid="cart-badge">{count}</span>}
</NavLink>
</nav>
</div>
</header>
);
}