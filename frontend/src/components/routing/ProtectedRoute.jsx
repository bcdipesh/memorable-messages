import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext/AuthContext";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
