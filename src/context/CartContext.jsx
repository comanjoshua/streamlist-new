import React, { createContext, useContext, useReducer } from "react";

const CartCtx = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const item = action.item;

      // Only one subscription allowed, qty = 1
      if (item.type === "subscription") {
        const hasSub = state.find((i) => i.type === "subscription");
        if (hasSub) return state;
        return [...state, { ...item, qty: 1 }];
      }

      // If accessory exists, bump qty
      const existing = state.find(
        (i) => i.id === item.id && i.type !== "subscription"
      );
      if (existing) {
        return state.map((i) =>
          i.id === item.id
            ? { ...i, qty: (i.qty || 1) + (item.qty || 1) }
            : i
        );
      }

      return [...state, { ...item, qty: item.qty || 1 }];
    }

    case "updateQty":
      return state.map((i) =>
        i.id === action.id
          ? { ...i, qty: action.qty < 1 ? 1 : action.qty }
          : i
      );

    case "remove":
      return state.filter((x) => x.id !== action.id);

    case "clear":
      return [];

    default:
      return state;
  }
}

// Load cart from localStorage
function initCart() {
  try {
    const raw = localStorage.getItem("cart");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], initCart);

  // Save to localStorage whenever items change
  React.useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  }, [items]);

  const api = {
    items,
    addItem: (item) => dispatch({ type: "add", item }),
    updateQty: (id, qty) => dispatch({ type: "updateQty", id, qty }),
    removeItem: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export default function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
