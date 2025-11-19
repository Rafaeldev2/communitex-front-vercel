import { Outlet } from "react-router-dom";
import SidebarEmpresa from "../../components/Sidebars/SidebarEmpresa";


export default function EmpresaLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <SidebarEmpresa />
            </aside>

            {/* Área de conteúdo principal */}
            <main className="flex-1 overflow-x-hidden">
                <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}