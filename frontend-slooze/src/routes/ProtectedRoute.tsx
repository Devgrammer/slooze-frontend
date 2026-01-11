import React from "react";
import { useAuth, } from "../context/authContext";
import { Navigate } from "react-router";
interface ProtectedRouteType {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const  token = sessionStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
