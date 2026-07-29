import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { hasPermission } from "../utils/permissions";

function RoleProtectedRoute({ permission, children }) {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(user.role, permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RoleProtectedRoute;