import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function RoleProtected({ roles }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (!roles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}