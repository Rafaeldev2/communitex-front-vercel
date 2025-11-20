// /src/components/Auth/ProtectedRoute.js (Ajuste)
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    // 1. MUDANÇA CRÍTICA: Redirecionar para /login, não mais /
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;