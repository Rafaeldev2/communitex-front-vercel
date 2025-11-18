import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

/**
 * Layout para páginas autenticadas (usuários logados)
 * Inclui Menu e área de conteúdo principal
 */
export default function AuthLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Menu />

            <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}