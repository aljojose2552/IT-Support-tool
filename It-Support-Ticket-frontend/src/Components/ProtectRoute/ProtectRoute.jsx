import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userState } from "../../redux/auth/authSlice";

const ProtectRoute = ({ children, allowedRoles = [] }) => {
  const { user, token } = useSelector(userState);

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  if (allowedRoles.includes(user?.role)) {
    return children;
  }

  return <h2>Page not Found</h2>;
};

export default ProtectRoute;
