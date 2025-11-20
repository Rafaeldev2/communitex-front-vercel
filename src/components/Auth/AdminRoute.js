// /src/components/Auth/AdminRoute.js (Ajuste)
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  // ... (lógica de isAdmin) ...
  const isAutenticado = isAuthenticated();
  const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

  if (!isAutenticado) {
    // 1. MUDANÇA CRÍTICA: Redirecionar para /login, não mais /
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/pracas" replace />; // Se logado mas não admin
  }

  return children;
};

export default AdminRoute;