import { api } from "../api.js";

    const empresaService = {
        async getAll() {
            const response = await api.get("/api/empresas");
            return response.data.data || response.data;
        },

        async getById(id) {
            const response = await api.get(`/api/empresas/${id}`);
            return response.data.data || response.data;
        },

        async create(empresa) {
            const response = await api.post("/api/empresas", empresa);
            return response.data.data || response.data;
        },

        async update(id, empresa) {
            const response = await api.put(`/api/empresas/${id}`, empresa);
            return response.data.data || response.data;
        },

        async delete(id) {
            const response = await api.delete(`/api/empresas/${id}`);
            return response.data.data || response.data;
        },
    };

    export default empresaService;