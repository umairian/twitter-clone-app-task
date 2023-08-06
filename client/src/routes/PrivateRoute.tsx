import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, token, navigateTo }) => {
  const location = useLocation();

  if (!token) {
    return <Navigate to={navigateTo} state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;
