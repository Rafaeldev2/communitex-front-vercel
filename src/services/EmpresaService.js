import api from './api';

const EmpresaService = {
  // Buscar ID da empresa do usuário autenticado
  buscarEmpresaUsuario: async () => {
    try {
      const response = await api.get('/api/empresas/minha-empresa');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar empresa do usuário:', error);
      throw error;
    }
  },

  // Buscar empresa por ID
  buscarEmpresaPorId: async (id) => {
    try {
      const response = await api.get(`/api/empresas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar empresa ${id}:`, error);
      throw error;
    }
  },

  // Listar todas as empresas
  listarEmpresas: async () => {
    try {
      const response = await api.get('/api/empresas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar empresas:', error);
      throw error;
    }
  },

  // Criar nova empresa
  criarEmpresa: async (empresaDTO) => {
    try {
      const response = await api.post('/api/empresas', empresaDTO);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      throw error;
    }
  },

  // Atualizar empresa
  atualizarEmpresa: async (id, empresaDTO) => {
    try {
      const response = await api.put(`/api/empresas/${id}`, empresaDTO);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar empresa ${id}:`, error);
      throw error;
    }
  },

  // Deletar empresa
  deletarEmpresa: async (id) => {
    try {
      await api.delete(`/api/empresas/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar empresa ${id}:`, error);
      throw error;
    }
  },
};

export default EmpresaService;
