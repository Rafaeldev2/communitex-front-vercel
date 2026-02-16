/**
 * Utilitários de formatação
 * @description Funções utilitárias para formatação de dados
 */

/**
 * Formata data para exibição no formato brasileiro
 * @param {string} dateString - String de data ISO
 * @param {object} options - Opções de formatação
 * @returns {string} Data formatada
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const defaultOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  };
  
  return date.toLocaleDateString('pt-BR', defaultOptions);
};

/**
 * Formata data e hora para exibição
 * @param {string} dateString - String de data ISO
 * @returns {string} Data e hora formatadas
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formata número como moeda brasileira
 * @param {number} value - Valor numérico
 * @returns {string} Valor formatado como moeda
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Formata número com casas decimais
 * @param {number} value - Valor numérico
 * @param {number} decimals - Número de casas decimais
 * @returns {string} Valor formatado
 */
export const formatNumber = (value, decimals = 2) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Trunca texto mantendo palavras completas
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};
