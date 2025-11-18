import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

/**
 * Menu principal da aplicação
 * Exibe diferentes opções baseadas no estado de autenticação e role do usuário
 */
const Menu = () => {
    const { user, signOut, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        signOut();
        navigate("/login");
    };

    // Determina os links do menu baseado na autenticação e role
    const getMenuLinks = () => {
        if (!isAuthenticated()) {
            // Menu para usuários não autenticados
            return [
                { to: "/", label: "Início" },
                { to: "/mapa", label: "Mapa de Praças" },
            ];
        }

        // Menu base para usuários autenticados
        const baseLinks = [
            { to: "/dashboard", label: "Dashboard" },
            { to: "/mapa", label: "Mapa" },
        ];

        // Adiciona links específicos baseado na role
        if (user?.role?.includes("ADMIN")) {
            return [
                ...baseLinks,
                { to: "/admin/pracas", label: "Gerenciar Praças" },
                { to: "/admin/empresas", label: "Gerenciar Empresas" },
                { to: "/admin/adocoes", label: "Gerenciar Adoções" },
            ];
        }

        if (user?.role?.includes("EMPRESA")) {
            return [
                ...baseLinks,
                { to: "/empresa/minhas-adocoes", label: "Minhas Adoções" },
                { to: "/empresa/pracas", label: "Cadastrar Praça" },
            ];
        }

        return baseLinks;
    };

    const menuLinks = getMenuLinks();

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800 hidden sm:block">
              Communitex
            </span>
                    </Link>

                    {/* Links do Menu - Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {menuLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-green-600 text-white shadow-md"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Área de Usuário - Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated() ? (
                            <div className="relative">
                                {/* Botão do Menu de Usuário */}
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                        {user?.username?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-gray-800">
                                            {user?.username}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {user?.role?.replace("ROLE_", "") || "Usuário"}
                                        </p>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                                            isUserMenuOpen ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown do Menu de Usuário */}
                                {isUserMenuOpen && (
                                    <>
                                        {/* Overlay para fechar o menu */}
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        />

                                        {/* Menu Dropdown */}
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                                            <Link
                                                to="/perfil"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
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
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                Meu Perfil
                                            </Link>

                                            <div className="border-t border-gray-200 my-2" />

                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
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
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                Sair
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
                            >
                                Entrar
                            </Link>
                        )}
                    </div>

                    {/* Botão do Menu Mobile */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Menu Mobile */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        {/* Links do Menu Mobile */}
                        <div className="space-y-1">
                            {menuLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-green-600 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Área de Usuário Mobile */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            {isAuthenticated() ? (
                                <>
                                    <div className="flex items-center gap-3 px-4 py-2 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold shadow-md">
                                            {user?.username?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {user?.username}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user?.role?.replace("ROLE_", "") || "Usuário"}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        to="/perfil"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        Meu Perfil
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full text-left mt-1"
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
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-center transition-all duration-200"
                                >
                                    Entrar
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Menu;