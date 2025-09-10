import { Navigate, useLocation } from "react-router-dom";
import { useAppState } from "../context/AppState";

export default function ProtectedRoute({ children }) {
  const { isAuthed } = useAppState();
  const loc = useLocation();
  return isAuthed ? children : <Navigate to="/login" replace state={{ from: loc }} />;
}
