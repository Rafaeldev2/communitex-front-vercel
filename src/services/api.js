import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});


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

                    localStorage.removeItem("@communitex:token");
                    localStorage.removeItem("@communitex:refreshToken");
                    localStorage.removeItem("@communitex:user");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }


                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/refresh`,
                    { refreshToken }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;


                localStorage.setItem("@communitex:token", accessToken);
                localStorage.setItem("@communitex:refreshToken", newRefreshToken);


                originalRequest.headers.Authorization = `Bearer ${accessToken}`;


                return api(originalRequest);
            } catch (refreshError) {

                localStorage.removeItem("@communitex:token");
                localStorage.removeItem("@communitex:refreshToken");
                localStorage.removeItem("@communitex:user");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }


        if (error.response?.status === 403) {
            console.error("Acesso negado: você não tem permissão para acessar este recurso");
        }

        return Promise.reject(error);
    }
);

export { api };