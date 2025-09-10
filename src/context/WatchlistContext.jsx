// src/context/WatchlistContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const WatchlistCtx = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return Array.isArray(action.items) ? action.items : [];
    case "add": {
      const m = action.movie;
      if (!m || !m.id) return state;
      if (state.some((x) => x.id === m.id)) return state;
      return [m, ...state];
    }
    case "remove":
      return state.filter((x) => x.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function WatchlistProvider({ children }) {
  const [list, dispatch] = useReducer(reducer, []);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("watchlist");
      if (raw) {
        const parsed = JSON.parse(raw);
        console.log("Loaded watchlist from localStorage:", parsed);
        dispatch({ type: "init", items: parsed });
      }
    } catch (err) {
      console.error("Failed to load watchlist:", err);
    }
  }, []);

  // Save on change
  useEffect(() => {
    try {
      console.log("Saving watchlist to localStorage:", list);
      localStorage.setItem("watchlist", JSON.stringify(list));
    } catch (err) {
      console.error("Failed to save watchlist:", err);
    }
  }, [list]);

  const api = useMemo(
    () => ({
      list,
      add: (movie) => dispatch({ type: "add", movie }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      has: (id) => list.some((x) => x.id === id),
    }),
    [list]
  );

  return <WatchlistCtx.Provider value={api}>{children}</WatchlistCtx.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistCtx);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
