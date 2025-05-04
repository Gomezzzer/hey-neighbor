// components/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  user: any;
  children: React.ReactNode;
};

const PublicRoute = ({ user, children }: Props) => {
  if (user) {
    return <Navigate to="/messages" replace />;
  }
  return children;
};

export default PublicRoute;
