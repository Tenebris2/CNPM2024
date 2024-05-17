import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TodoContext } from "../context";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(TodoContext);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth state
  }

  if (!currentUser) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
