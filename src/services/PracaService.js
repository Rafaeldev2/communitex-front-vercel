/**
 * PracaService - Serviço centralizado para operações com Praças
 * Encapsula toda comunicação com os endpoints de praças e adoções
 */

import api from './api';

const PracaService = {
  /**
   * Busca todas as praças disponíveis
   * GET /api/pracas
   * @returns {Promise} Array de praças
   */
  listarPracas: async () => {
    try {
      const response = await api.get('/api/pracas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar praças:', error);
      throw error;
    }
  },

  /**
   * Busca uma praça específica por ID
   * GET /api/pracas/{id}
   * @param {number} id - ID da praça
   * @returns {Promise} Dados da praça
   */
  buscarPracaSimples: async (id) => {
    try {
      const response = await api.get(`/api/pracas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar praça ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Busca uma praça com detalhes completos e histórico de interesses
   * GET /api/pracas/{id}/detalhes
   * @param {number} id - ID da praça
   * @returns {Promise} Dados da praça com cadastrante e histórico
   */
  buscarPracaComDetalhes: async (id) => {
    try {
      const response = await api.get(`/api/pracas/${id}/detalhes`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar detalhes da praça ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cadastra uma nova praça (apenas para Pessoa Física)
   * POST /api/pracas
   * @param {Object} pracaData - Dados da praça
   * @returns {Promise} Praça cadastrada
   */
  cadastrarPraca: async (pracaData) => {
    try {
      const response = await api.post('/api/pracas', pracaData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar praça:', error);
      throw error;
    }
  },

  /**
   * Registra interesse de adoção de uma praça
   * POST /api/adocao/interesse
   * @param {Object} interesseData - Dados do interesse
   *        { pracaId, empresaId, proposta }
   * @returns {Promise} Resposta do registro de interesse
   */
  registrarInteresse: async (interesseData) => {
    try {
      const response = await api.post('/api/adocao/interesse', interesseData);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar interesse:', error);
      throw error;
    }
  },

  /**
   * Busca minhas adoções (para usuário logado)
   * GET /api/minhas-adocoes
   * @returns {Promise} Array de adoções do usuário
   */
  buscarMinhasAdocoes: async () => {
    try {
      const response = await api.get('/api/minhas-adocoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar minhas adoções:', error);
      throw error;
    }
  },
};

export default PracaService;
