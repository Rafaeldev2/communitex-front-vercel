import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Sidebar para empresas
 * Exibe menu de navegação com links para páginas de empresa
 */
export default function SidebarEmpresa() {
    const location = useLocation();
    const { user } = useAuth();

    // Função para verificar se o link está ativo
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Itens do menu empresa
    const menuItems = [
        {
            path: "/empresa/minhas-adocoes",
            label: "Minhas Adoções",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            ),
        },
        {
            path: "/empresa/pracas",
            label: "Cadastrar Praça",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-blue-800 to-blue-900 text-white">
            {/* Header da Sidebar */}
            <div className="p-6 border-b border-blue-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg">
                        {user?.username?.charAt(0).toUpperCase() || "E"}
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Empresa</p>
                        <p className="text-xs text-blue-300">{user?.username}</p>
                    </div>
                </div>
            </div>

            {/* Menu de Navegação */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive(item.path)
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "text-blue-200 hover:bg-blue-700 hover:text-white"
                                }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Seção de Informações */}
                <div className="mt-8 p-4 bg-blue-700 bg-opacity-50 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Dicas
                    </h3>
                    <p className="text-xs text-blue-200 leading-relaxed">
                        Cadastre praças para adoção e acompanhe o status das suas adoções
                        em tempo real.
                    </p>
                </div>
            </nav>

            {/* Link para Dashboard */}
            <div className="p-4 border-t border-blue-700">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-700 hover:text-white transition-all duration-200"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                    <span className="font-medium">Dashboard</span>
                </Link>
            </div>

            {/* Footer da Sidebar */}
            <div className="p-4 bg-blue-900 text-center">
                <p className="text-xs text-blue-400">Communitex Empresa</p>
                <p className="text-xs text-blue-600 mt-1">v1.0.0</p>
            </div>
        </div>
    );
}