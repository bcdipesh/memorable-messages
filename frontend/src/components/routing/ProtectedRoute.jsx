import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

/**
 * ProtectedRoute component ensures that only authenticated users can access specific routes.
 *
 * This component retrieves the user's authentication token from the AuthContext.
 * If the token is present, the component renders the protected route content (Outlet).
 * Otherwise, it redirects the user to the login page (/login) and replaces the current history entry.
 *
 * @returns {React.JSX.Element} - Renders the protected route content if authenticated, otherwise redirects to login.
 */
const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
