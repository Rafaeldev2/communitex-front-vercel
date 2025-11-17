import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth.jsx";
import Menu from "../../components/Menu/Menu.jsx";

export default function AuthLayout() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    return (
        <>
            <Menu />
            <Outlet />
        </>
    );
}
