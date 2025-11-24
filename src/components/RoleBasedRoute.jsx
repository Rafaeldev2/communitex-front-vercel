import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';

function RoleBasedRoute({ allowedRoles = [] }) {
    const { user, loading, hasRole } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!hasRole(allowedRoles)) {
        return <Navigate to="/acesso-negado" replace />;
    }

    return <Outlet />;
}

export default RoleBasedRoute;