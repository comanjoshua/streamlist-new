// src/hooks/useCart.js
import useCartFromContext from "../context/CartContext";

export default function useCart() {
  return useCartFromContext();
}
