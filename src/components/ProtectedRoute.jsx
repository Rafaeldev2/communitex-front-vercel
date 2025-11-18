import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
                </div>
            </div>
        );
    }


    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}