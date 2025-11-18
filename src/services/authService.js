import { api } from "./api";

/**
 * Serviço de autenticação com integração ao backend Spring Boot
 */
const authService = {
    /**
     * Realiza o login do usuário
     * @param {Object} credentials - Credenciais do usuário
     * @param {string} credentials.username - Nome de usuário
     * @param {string} credentials.password - Senha
     * @returns {Promise<Object>} Dados do usuário e tokens
     */
    async login(credentials) {
        try {
            const response = await api.post("/api/auth/login", credentials);
            const { accessToken, refreshToken } = response.data;

            // Decodifica o token JWT para extrair informações do usuário
            const userData = this.decodeToken(accessToken);

            // Armazena os dados no localStorage
            localStorage.setItem("@communitex:token", accessToken);
            localStorage.setItem("@communitex:refreshToken", refreshToken);
            localStorage.setItem("@communitex:user", JSON.stringify(userData));

            return {
                user: userData,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    },

    /**
     * Registra um novo usuário
     * @param {Object} userData - Dados do novo usuário
     * @param {string} userData.username - Nome de usuário
     * @param {string} userData.password - Senha
     * @param {string} userData.role - Role do usuário (opcional)
     * @returns {Promise<string>} Mensagem de sucesso
     */
    async register(userData) {
        try {
            const response = await api.post("/api/auth/register", userData);
            return response.data;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw error;
        }
    },

    /**
     * Renova o token de acesso usando o refresh token
     * @returns {Promise<Object>} Novos tokens
     */
    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem("@communitex:refreshToken");

            if (!refreshToken) {
                throw new Error("Refresh token não encontrado");
            }

            const response = await api.post("/api/auth/refresh", { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response.data;

            // Atualiza os tokens no localStorage
            localStorage.setItem("@communitex:token", accessToken);
            localStorage.setItem("@communitex:refreshToken", newRefreshToken);

            // Atualiza os dados do usuário
            const userData = this.decodeToken(accessToken);
            localStorage.setItem("@communitex:user", JSON.stringify(userData));

            return {
                accessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            console.error("Erro ao renovar token:", error);
            this.logout();
            throw error;
        }
    },

    /**
     * Realiza o logout do usuário
     */
    logout() {
        localStorage.removeItem("@communitex:token");
        localStorage.removeItem("@communitex:refreshToken");
        localStorage.removeItem("@communitex:user");
    },

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean} True se autenticado, false caso contrário
     */
    isAuthenticated() {
        const token = localStorage.getItem("@communitex:token");
        const user = localStorage.getItem("@communitex:user");

        if (!token || !user) {
            return false;
        }

        // Verifica se o token não está expirado
        try {
            const userData = JSON.parse(user);
            const currentTime = Date.now() / 1000;

            if (userData.exp && userData.exp < currentTime) {
                this.logout();
                return false;
            }

            return true;
        } catch (error) {
            this.logout();
            return false;
        }
    },

    /**
     * Obtém os dados do usuário armazenados
     * @returns {Object|null} Dados do usuário ou null
     */
    getCurrentUser() {
        try {
            const user = localStorage.getItem("@communitex:user");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Erro ao obter usuário atual:", error);
            return null;
        }
    },

    /**
     * Decodifica um token JWT (sem validação de assinatura)
     * @param {string} token - Token JWT
     * @returns {Object} Payload do token
     */
    decodeToken(token) {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );

            const payload = JSON.parse(jsonPayload);

            // Extrai as informações relevantes
            return {
                username: payload.sub,
                role: payload.authorities?.[0] || payload.role || "ROLE_USER",
                exp: payload.exp,
                iat: payload.iat,
            };
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            return null;
        }
    },

    /**
     * Verifica se o usuário tem uma role específica
     * @param {string} requiredRole - Role necessária
     * @returns {boolean} True se o usuário tem a role, false caso contrário
     */
    hasRole(requiredRole) {
        const user = this.getCurrentUser();

        if (!user || !user.role) {
            return false;
        }

        // Normaliza as roles (adiciona ROLE_ se não tiver)
        const userRole = user.role.startsWith("ROLE_") ? user.role : `ROLE_${user.role}`;
        const checkRole = requiredRole.startsWith("ROLE_") ? requiredRole : `ROLE_${requiredRole}`;

        return userRole === checkRole;
    },

    /**
     * Verifica se o usuário tem pelo menos uma das roles especificadas
     * @param {string[]} roles - Array de roles
     * @returns {boolean} True se o usuário tem pelo menos uma role, false caso contrário
     */
    hasAnyRole(roles) {
        return roles.some((role) => this.hasRole(role));
    },
};

export default authService;