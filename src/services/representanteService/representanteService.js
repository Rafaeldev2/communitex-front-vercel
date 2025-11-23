import { api } from "../api.js";

const representanteService = {
    async getAll() {
        const response = await api.get("/api/representantes");
        return response.data.data || response.data;
    },

    async getById(id) {
        const response = await api.get(`/api/representantes/${id}`);
        return response.data.data || response.data;
    },

    async create(representante) {
        const response = await api.post("/api/representantes", representante);
        return response.data.data || response.data;
    },

    async update(id, representante) {
        const response = await api.put(`/api/representantes/${id}`, representante);
        return response.data.data || response.data;
    },

    async delete(id) {
        const response = await api.delete(`/api/representantes/${id}`);
        return response.data.data || response.data;
    },
};

export default representanteService;