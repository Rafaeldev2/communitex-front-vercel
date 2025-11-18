import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function RoleBasedRoute({ allowedRoles, redirectTo = "/dashboard" }) {
    const { user, loading, hasAnyRole } = useAuth();


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600 font-medium">Verificando permissões...</p>
                </div>
            </div>
        );
    }


    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!hasAnyRole(allowedRoles)) {
        return (
            <Navigate
                to={redirectTo}
                replace
                state={{
                    message: "Você não tem permissão para acessar esta página.",
                    from: window.location.pathname
                }}
            />
        );
    }

    return <Outlet />;
}