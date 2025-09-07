// src/context/CartContext.jsx
import React, { createContext, useMemo, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { config } from '../app/config';

const CartContext = createContext(null);

const INITIAL = { items: [] }; // { id, title, price, type, qty, image }

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { item } = action;
      const items = [...state.items];
      const idx = items.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        items[idx] = { ...items[idx], qty: items[idx].qty + (item.qty || 1) };
      } else {
        items.push({ ...item, qty: item.qty || 1 });
      }
      return { ...state, items };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // Persistent state (works in browser; safe no-op in tests if jsdom present)
  const [stored, setStored] = useLocalStorage(config.storageKey, INITIAL);
  const [state, dispatch] = useReducer(reducer, stored || INITIAL);

  // Persist every change
  React.useEffect(() => {
    setStored(state);
  }, [state, setStored]);

  const actions = useMemo(
    () => ({
      add: (item) => dispatch({ type: 'ADD', item }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    []
  );

  const value = useMemo(() => ({ state, ...actions }), [state, actions]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
