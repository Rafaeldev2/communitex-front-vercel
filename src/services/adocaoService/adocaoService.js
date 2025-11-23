import { api } from "../api.js";

    const adocaoService = {
        async getAll() {
            const response = await api.get("/api/adocoes");
            return response.data.data || response.data;
        },

        async getById(id) {
            const response = await api.get(`/api/adocoes/${id}`);
            return response.data.data || response.data;
        },

        async create(adocao) {
            const response = await api.post("/api/adocoes", adocao);
            return response.data.data || response.data;
        },

        async update(id, adocao) {
            const response = await api.put(`/api/adocoes/${id}`, adocao);
            return response.data.data || response.data;
        },

        async delete(id) {
            const response = await api.delete(`/api/adocoes/${id}`);
            return response.data.data || response.data;
        },

        async aprovar(id) {
            const response = await api.patch(`/api/adocoes/${id}/aprovar`);
            return response.data.data || response.data;
        },

        async rejeitar(id) {
            const response = await api.patch(`/api/adocoes/${id}/rejeitar`);
            return response.data.data || response.data;
        },
    };

    export default adocaoService;