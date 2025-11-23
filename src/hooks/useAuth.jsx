import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth/authService.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

/**
 * Provider de autenticação que gerencia o estado do usuário
 * e fornece funções para login, logout e verificação de permissões
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    /**
     * Carrega os dados do usuário do localStorage ao iniciar
     */
    useEffect(() => {
        const loadUserFromStorage = () => {
            try {
                if (authService.isAuthenticated()) {
                    const userData = authService.getCurrentUser();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        loadUserFromStorage();
    }, []);

    /**
     * Realiza o login do usuário
     * @param {Object} credentials - Credenciais do usuário
     * @param {string} credentials.username - Nome de usuário
     * @param {string} credentials.password - Senha
     */
    const signIn = async (credentials) => {
        try {
            setLoading(true);
            const { user: userData } = await authService.login(credentials);
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            console.error("Erro ao fazer login:", error);

            let errorMessage = "Não foi possível fazer login. Tente novamente.";

            if (error.response?.status === 401) {
                errorMessage = "Usuário ou senha inválidos.";
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Realiza o logout do usuário
     */
    const signOut = () => {
        authService.logout();
        setUser(null);
        navigate("/login");
    };

    /**
     * Registra um novo usuário
     * @param {Object} userData - Dados do novo usuário
     */
    const register = async (userData) => {
        try {
            setLoading(true);
            const message = await authService.register(userData);
            return { success: true, message };
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);

            let errorMessage = "Não foi possível registrar o usuário.";

            if (error.response?.status === 400) {
                errorMessage = error.response.data || "Nome de usuário já existe.";
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Verifica se o usuário tem uma role específica
     * @param {string} role - Role necessária
     * @returns {boolean}
     */
    const hasRole = (role) => {
        return authService.hasRole(role);
    };

    /**
     * Verifica se o usuário tem pelo menos uma das roles especificadas
     * @param {string[]} roles - Array de roles
     * @returns {boolean}
     */
    const hasAnyRole = (roles) => {
        return authService.hasAnyRole(roles);
    };

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean}
     */
    const isAuthenticated = () => {
        return authService.isAuthenticated();
    };

    const value = {
        user,
        loading,
        signIn,
        signOut,
        register,
        hasRole,
        hasAnyRole,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook para acessar o contexto de autenticação
 * @returns {Object} Contexto de autenticação
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
}