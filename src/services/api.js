import axios from "axios";

// Configuração base da API
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("@communitex:token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar respostas e renovar token automaticamente
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Se o erro for 401 e não for uma tentativa de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("@communitex:refreshToken");

                if (!refreshToken) {
                    // Se não houver refresh token, redireciona para login
                    localStorage.removeItem("@communitex:token");
                    localStorage.removeItem("@communitex:refreshToken");
                    localStorage.removeItem("@communitex:user");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }

                // Tenta renovar o token
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/refresh`,
                    { refreshToken }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // Atualiza os tokens no localStorage
                localStorage.setItem("@communitex:token", accessToken);
                localStorage.setItem("@communitex:refreshToken", newRefreshToken);

                // Atualiza o header da requisição original
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Refaz a requisição original
                return api(originalRequest);
            } catch (refreshError) {
                // Se falhar ao renovar, limpa tudo e redireciona para login
                localStorage.removeItem("@communitex:token");
                localStorage.removeItem("@communitex:refreshToken");
                localStorage.removeItem("@communitex:user");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        // Se for 403, usuário não tem permissão
        if (error.response?.status === 403) {
            console.error("Acesso negado: você não tem permissão para acessar este recurso");
        }

        return Promise.reject(error);
    }
);

export { api };