import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './app/routes.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './styles/globals.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </React.StrictMode>
);
