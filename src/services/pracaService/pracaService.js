import { api } from "../api.js";

        const pracaService = {
            async getAll() {
                const response = await api.get("/api/pracas");
                return response.data.data || response.data;
            },

            async getById(id) {
                const response = await api.get(`/api/pracas/${id}`);
                return response.data.data || response.data;
            },

            async create(praca) {
                const response = await api.post("/api/pracas", praca);
                return response.data.data || response.data;
            },

            async update(id, praca) {
                const response = await api.put(`/api/pracas/${id}`, praca);
                return response.data.data || response.data;
            },

            async delete(id) {
                const response = await api.delete(`/api/pracas/${id}`);
                return response.data.data || response.data;
            },
        };

        export default pracaService;