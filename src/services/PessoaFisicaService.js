/**
 * PessoaFisicaService.js - Serviço para operações com Pessoa Física
 * Encapsula operações de cadastro e autenticação
 */

import api from './api';

const PessoaFisicaService = {
  /**
   * Cadastra uma nova pessoa física
   * POST /api/pessoas-fisicas
   * @param {Object} pessoaData - Dados da pessoa física
   * @returns {Promise} Resposta do servidor
   */
  cadastrar: async (pessoaData) => {
    try {
      const response = await api.post('/api/pessoas-fisicas', pessoaData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar pessoa física:', error);
      throw error;
    }
  },

  /**
   * Busca perfil da pessoa física autenticada
   * GET /api/pessoas-fisicas/perfil
   * @returns {Promise} Dados do perfil
   */
  buscarPerfil: async () => {
    try {
      const response = await api.get('/api/pessoas-fisicas/perfil');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  /**
   * Atualiza dados da pessoa física
   * PUT /api/pessoas-fisicas/{id}
   * @param {number} id - ID da pessoa física
   * @param {Object} pessoaData - Dados a atualizar
   * @returns {Promise} Dados atualizados
   */
  atualizar: async (id, pessoaData) => {
    try {
      const response = await api.put(`/api/pessoas-fisicas/${id}`, pessoaData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar pessoa física ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Deleta uma pessoa física
   * DELETE /api/pessoas-fisicas/{id}
   * @param {number} id - ID da pessoa física
   * @returns {Promise} Resposta do servidor
   */
  deletar: async (id) => {
    try {
      const response = await api.delete(`/api/pessoas-fisicas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar pessoa física ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Valida CPF
   * GET /api/pessoas-fisicas/validar-cpf/{cpf}
   * @param {string} cpf - CPF a validar
   * @returns {Promise} Validação
   */
  validarCPF: async (cpf) => {
    try {
      const response = await api.get(`/api/pessoas-fisicas/validar-cpf/${cpf}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao validar CPF:', error);
      throw error;
    }
  },

  /**
   * Busca praças cadastradas por essa pessoa
   * GET /api/pessoas-fisicas/minhas-pracas
   * @returns {Promise} Array de praças
   */
  buscarMinhasPracas: async () => {
    try {
      const response = await api.get('/api/pessoas-fisicas/minhas-pracas');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar minhas praças:', error);
      throw error;
    }
  },
};

export default PessoaFisicaService;
