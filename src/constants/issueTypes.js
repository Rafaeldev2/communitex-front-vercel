/**
 * Tipos de denúncia disponíveis no sistema
 * @description Configurações de ícones, labels e cores para cada tipo de issue
 */
export const ISSUE_TYPES = {
  ILUMINACAO: { icon: '💡', label: 'Iluminação', color: '#ffc107', value: 'ILUMINACAO' },
  BURACO: { icon: '🕳️', label: 'Buraco', color: '#795548', value: 'BURACO' },
  LIXO: { icon: '🗑️', label: 'Lixo', color: '#607d8b', value: 'LIXO' },
  PODA_ARVORE: { icon: '🌳', label: 'Poda de Árvore', color: '#4caf50', value: 'PODA_ARVORE' },
  VAZAMENTO: { icon: '💧', label: 'Vazamento', color: '#2196f3', value: 'VAZAMENTO' },
  PICHACAO: { icon: '🎨', label: 'Pichação', color: '#9c27b0', value: 'PICHACAO' },
  CALCADA_DANIFICADA: { icon: '🚧', label: 'Calçada Danificada', color: '#ff5722', value: 'CALCADA_DANIFICADA' },
  SINALIZACAO: { icon: '🚦', label: 'Sinalização', color: '#f44336', value: 'SINALIZACAO' },
  OUTRO: { icon: '❓', label: 'Outro', color: '#9e9e9e', value: 'OUTRO' }
};

/**
 * Array de tipos para renderização em selects/filters
 */
export const ISSUE_TYPES_ARRAY = Object.entries(ISSUE_TYPES).map(([key, config]) => ({
  value: key,
  ...config
}));

/**
 * Retorna a configuração de um tipo de issue
 * @param {string} type - Tipo da issue (ex: 'BURACO')
 * @returns {object} Configuração do tipo
 */
export const getIssueTypeConfig = (type) => {
  return ISSUE_TYPES[type] || ISSUE_TYPES.OUTRO;
};
