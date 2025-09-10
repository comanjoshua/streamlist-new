// src/context/AppState.js
import { createContext, useContext, useMemo, useState } from "react";

const AppStateCtx = createContext(null);

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser, isAuthed: !!user }), [user]);
  return <AppStateCtx.Provider value={value}>{children}</AppStateCtx.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateCtx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
