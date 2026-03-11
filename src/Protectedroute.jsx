import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

export default function Protectedroute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}