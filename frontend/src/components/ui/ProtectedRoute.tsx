import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  user: any;
  children: React.ReactNode;
};

const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;

