import { api } from "./api";

const authService = {

    async login(credentials) {
        try {
            const response = await api.post("/api/auth/login", credentials);
            const { accessToken, refreshToken } = response.data;


            const userData = this.decodeToken(accessToken);


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


    async register(userData) {
        try {
            const response = await api.post("/api/auth/register", userData);
            return response.data;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw error;
        }
    },


    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem("@communitex:refreshToken");

            if (!refreshToken) {
                throw new Error("Refresh token não encontrado");
            }

            const response = await api.post("/api/auth/refresh", { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response.data;

            localStorage.setItem("@communitex:token", accessToken);
            localStorage.setItem("@communitex:refreshToken", newRefreshToken);

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


    logout() {
        localStorage.removeItem("@communitex:token");
        localStorage.removeItem("@communitex:refreshToken");
        localStorage.removeItem("@communitex:user");
    },


    isAuthenticated() {
        const token = localStorage.getItem("@communitex:token");
        const user = localStorage.getItem("@communitex:user");

        if (!token || !user) {
            return false;
        }


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


    getCurrentUser() {
        try {
            const user = localStorage.getItem("@communitex:user");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Erro ao obter usuário atual:", error);
            return null;
        }
    },


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


    hasRole(requiredRole) {
        const user = this.getCurrentUser();

        if (!user || !user.role) {
            return false;
        }


        const userRole = user.role.startsWith("ROLE_") ? user.role : `ROLE_${user.role}`;
        const checkRole = requiredRole.startsWith("ROLE_") ? requiredRole : `ROLE_${requiredRole}`;

        return userRole === checkRole;
    },

    hasAnyRole(roles) {
        return roles.some((role) => this.hasRole(role));
    },
};

export default authService;