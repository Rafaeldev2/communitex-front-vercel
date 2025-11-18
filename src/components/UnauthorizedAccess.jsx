import { useNavigate, useLocation } from "react-router-dom";

/**
 * Componente exibido quando o usuário não tem permissão para acessar uma rota
 */
export default function UnauthorizedAccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message || "Você não tem permissão para acessar esta página.";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Ícone de erro */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                        <svg
                            className="h-8 w-8 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    {/* Título */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Acesso Negado
                    </h2>

                    {/* Mensagem */}
                    <p className="text-gray-600 mb-8">{message}</p>

                    {/* Botões de ação */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                            Ir para Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}