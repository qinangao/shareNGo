import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
