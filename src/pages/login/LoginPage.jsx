import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await signIn({ username, password });

            if (result.success) {

                const userRole = result.user?.role;

                if (userRole?.includes("ADMIN")) {
                    navigate("/admin/pracas");
                } else if (userRole?.includes("EMPRESA")) {
                    navigate("/empresa/minhas-adocoes");
                } else {
                    navigate(from, { replace: true });
                }
            } else {
                setError(result.error || "Erro ao fazer login");
            }
        } catch (err) {
            setError("Erro inesperado. Tente novamente.");
            console.error("Erro no login:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-amber-400 px-4 rounded-3xl">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Bem-vindo ao Communitex
                        </h1>
                        <p className="text-gray-600">
                            Sistema de Gestão de Adoção de Praças
                        </p>
                    </div>


                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Usuário
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all outline-none text-gray-800"
                                placeholder="Digite seu usuário"
                                disabled={isLoading}
                            />
                        </div>


                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all outline-none text-gray-600"
                                placeholder="Digite sua senha"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Botão de submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Entrando...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Não tem uma conta?{" "}
                            <a
                                href="/registro"
                                className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                                Registre-se
                            </a>
                        </p>
                    </div>
                </div>


                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                        Credenciais de teste:
                    </p>
                    <p className="text-xs text-blue-700">
                        Usuário: <span className="font-mono font-semibold">admin</span>
                        <br />
                        Senha: <span className="font-mono font-semibold">password</span>
                    </p>
                </div>
            </div>
        </div>
    );
}