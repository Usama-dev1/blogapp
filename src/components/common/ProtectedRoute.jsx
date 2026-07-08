import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
const ProtectedRoute = ({ allowedRoles }) => {
  const { state } = useAuth();
  const { user, isAuthenticated } = state;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
