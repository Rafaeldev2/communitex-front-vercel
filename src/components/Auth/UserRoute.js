import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  const isAutenticado = isAuthenticated();
  const hasUserRole = user && user.roles && (
    user.roles.includes('ROLE_USER') || 
    user.roles.includes('ROLE_ADMIN')
  );

  if (!isAutenticado) {
    return <Navigate to="/login" replace />;
  }

  if (!hasUserRole) {
    return <Navigate to="/pracas" replace />;
  }

  return children;
};

export default UserRoute;
