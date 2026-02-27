// /src/hooks/useIssuesMap.js
import { useState, useEffect, useCallback } from 'react';
import IssueService from '../services/IssueService';

/**
 * Hook customizado para gerenciar denúncias no mapa
 * @param {Object} center - Centro do mapa { lat, lng }
 * @param {number} raioMetros - Raio de busca em metros (padrão: 2000)
 * @returns {Object} { issues, selectedIssue, isLoading, error, refetch, selectIssue, clearSelection, addInteraction }
 */
const useIssuesMap = (center, raioMetros = 2000) => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIssues = useCallback(async () => {
    if (!center?.lat || !center?.lng) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await IssueService.findByProximity(
        center.lat,
        center.lng,
        raioMetros
      );
      setIssues(response.data || []);
    } catch (err) {
      console.error('Erro ao buscar denúncias:', err);
      setError('Não foi possível carregar as denúncias. Tente novamente.');
      // Tenta buscar todas as issues como fallback
      try {
        const fallbackResponse = await IssueService.findAll();
        setIssues(fallbackResponse.data || []);
        setError(null);
      } catch (fallbackErr) {
        console.error('Erro no fallback:', fallbackErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, [center?.lat, center?.lng, raioMetros]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const selectIssue = useCallback(async (issue) => {
    if (!issue?.id) {
      setSelectedIssue(null);
      return;
    }

    try {
      // Busca detalhes completos da denúncia
      const response = await IssueService.findByIdWithDetails(issue.id);
      setSelectedIssue(response.data);
    } catch (err) {
      console.error('Erro ao buscar detalhes:', err);
      // Usa os dados básicos se falhar ao buscar detalhes
      setSelectedIssue(issue);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIssue(null);
  }, []);

  const addInteraction = useCallback(async (issueId, tipo, conteudo = null) => {
    try {
      const interactionData = { tipo };
      if (conteudo && tipo === 'COMENTARIO') {
        interactionData.conteudo = conteudo;
      }
      
      await IssueService.addInteraction(issueId, interactionData);
      
      // Atualiza a lista de issues
      await fetchIssues();
      
      // Se a issue selecionada é a que foi interagida, atualiza os detalhes
      if (selectedIssue?.id === issueId) {
        const response = await IssueService.findByIdWithDetails(issueId);
        setSelectedIssue(response.data);
      }
      
      return { success: true };
    } catch (err) {
      console.error('Erro ao adicionar interação:', err);
      const errorMessage = err.response?.status === 400 
        ? 'Você já realizou esta ação nesta denúncia.'
        : 'Não foi possível registrar sua interação.';
      return { success: false, error: errorMessage };
    }
  }, [fetchIssues, selectedIssue?.id]);

  return {
    issues,
    selectedIssue,
    isLoading,
    error,
    refetch: fetchIssues,
    selectIssue,
    clearSelection,
    addInteraction
  };
};

export default useIssuesMap;
