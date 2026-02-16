// /src/components/CommunityMap/IssueList.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueService from '../../services/IssueService';
import styles from './IssueList.module.css';

/**
 * Tipos de denúncia disponíveis
 */
const ISSUE_TYPES = {
  ILUMINACAO: { icon: '💡', label: 'Iluminação' },
  BURACO: { icon: '🕳️', label: 'Buraco' },
  LIXO: { icon: '🗑️', label: 'Lixo' },
  PODA_ARVORE: { icon: '🌳', label: 'Poda de Árvore' },
  VAZAMENTO: { icon: '💧', label: 'Vazamento' },
  PICHACAO: { icon: '🎨', label: 'Pichação' },
  CALCADA_DANIFICADA: { icon: '🚧', label: 'Calçada Danificada' },
  SINALIZACAO: { icon: '🚦', label: 'Sinalização' },
  OUTRO: { icon: '❓', label: 'Outro' }
};

/**
 * Status disponíveis
 */
const STATUS_CONFIG = {
  ABERTA: { label: 'Aberta', color: '#ff9800' },
  EM_ANALISE: { label: 'Em Análise', color: '#2196f3' },
  EM_ANDAMENTO: { label: 'Em Andamento', color: '#9c27b0' },
  RESOLVIDA: { label: 'Resolvida', color: '#4caf50' },
  REJEITADA: { label: 'Rejeitada', color: '#f44336' }
};

/**
 * Formata data para exibição
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Componente de Card individual
 */
const IssueListCard = ({ issue, onClick }) => {
  const typeConfig = ISSUE_TYPES[issue.tipo] || ISSUE_TYPES.OUTRO;
  const statusConfig = STATUS_CONFIG[issue.status] || STATUS_CONFIG.ABERTA;

  return (
    <div className={styles.card} onClick={() => onClick(issue)}>
      <div className={styles.cardHeader}>
        <span className={styles.typeIcon}>{typeConfig.icon}</span>
        <span 
          className={styles.statusBadge}
          style={{ backgroundColor: statusConfig.color }}
        >
          {statusConfig.label}
        </span>
      </div>
      
      <h3 className={styles.cardTitle}>{issue.titulo}</h3>
      
      <p className={styles.cardDescription}>
        {issue.descricao?.substring(0, 120)}
        {issue.descricao?.length > 120 ? '...' : ''}
      </p>
      
      <div className={styles.cardMeta}>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>👤</span>
          {issue.autorNome || 'Anônimo'}
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>📅</span>
          {formatDate(issue.dataCriacao)}
        </span>
      </div>
      
      <div className={styles.cardStats}>
        <span className={styles.stat}>
          👍 {issue.totalApoios || 0}
        </span>
        <span className={styles.stat}>
          💬 {issue.totalInteracoes || 0}
        </span>
      </div>
      
      <div className={styles.cardFooter}>
        <span className={styles.viewOnMap}>
          📍 Ver no Mapa →
        </span>
      </div>
    </div>
  );
};

/**
 * Componente principal de listagem de denúncias
 */
const IssueList = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Busca todas as denúncias
  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await IssueService.findAll();
        setIssues(response.data || []);
      } catch (err) {
        console.error('Erro ao buscar denúncias:', err);
        setError('Não foi possível carregar as denúncias. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Filtra e ordena as denúncias
  const filteredIssues = useMemo(() => {
    let result = [...issues];

    // Filtro por texto (título ou descrição)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(issue => 
        issue.titulo?.toLowerCase().includes(term) ||
        issue.descricao?.toLowerCase().includes(term) ||
        issue.autorNome?.toLowerCase().includes(term)
      );
    }

    // Filtro por tipo
    if (filterType) {
      result = result.filter(issue => issue.tipo === filterType);
    }

    // Filtro por status
    if (filterStatus) {
      result = result.filter(issue => issue.status === filterStatus);
    }

    // Ordenação
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.dataCriacao) - new Date(b.dataCriacao));
        break;
      case 'mostSupported':
        result.sort((a, b) => (b.totalApoios || 0) - (a.totalApoios || 0));
        break;
      case 'mostCommented':
        result.sort((a, b) => (b.totalInteracoes || 0) - (a.totalInteracoes || 0));
        break;
      default:
        break;
    }

    return result;
  }, [issues, searchTerm, filterType, filterStatus, sortBy]);

  // Navega para o mapa com a issue selecionada
  const handleIssueClick = (issue) => {
    navigate(`/denuncias?lat=${issue.latitude}&lng=${issue.longitude}&issueId=${issue.id}`);
  };

  // Limpa todos os filtros
  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterStatus('');
    setSortBy('recent');
  };

  const hasActiveFilters = searchTerm || filterType || filterStatus || sortBy !== 'recent';

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando denúncias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <span className={styles.errorIcon}>⚠️</span>
        <p>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>📋 Denúncias Comunitárias</h1>
          <p className={styles.subtitle}>
            {issues.length} denúncia{issues.length !== 1 ? 's' : ''} registrada{issues.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button 
          className={styles.mapButton}
          onClick={() => navigate('/denuncias')}
        >
          🗺️ Ver Mapa
        </button>
      </header>

      {/* Filtros */}
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por título, descrição ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterRow}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todos os Tipos</option>
            {Object.entries(ISSUE_TYPES).map(([key, { icon, label }]) => (
              <option key={key} value={key}>
                {icon} {label}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todos os Status</option>
            {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="recent">Mais Recentes</option>
            <option value="oldest">Mais Antigas</option>
            <option value="mostSupported">Mais Apoiadas</option>
            <option value="mostCommented">Mais Comentadas</option>
          </select>
        </div>

        {hasActiveFilters && (
          <div className={styles.activeFilters}>
            <span className={styles.filterCount}>
              {filteredIssues.length} resultado{filteredIssues.length !== 1 ? 's' : ''}
            </span>
            <button 
              className={styles.clearFiltersButton}
              onClick={clearFilters}
            >
              ✕ Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Lista de Issues */}
      {filteredIssues.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📭</span>
          <h3>Nenhuma denúncia encontrada</h3>
          <p>
            {hasActiveFilters 
              ? 'Tente ajustar os filtros para ver mais resultados.'
              : 'Seja o primeiro a registrar uma denúncia!'}
          </p>
          {hasActiveFilters && (
            <button 
              className={styles.clearFiltersButtonAlt}
              onClick={clearFilters}
            >
              Limpar Filtros
            </button>
          )}
          <button 
            className={styles.newIssueButton}
            onClick={() => navigate('/denuncias')}
          >
            + Nova Denúncia
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredIssues.map((issue) => (
            <IssueListCard 
              key={issue.id} 
              issue={issue} 
              onClick={handleIssueClick}
            />
          ))}
        </div>
      )}

      {/* FAB para nova denúncia */}
      <button 
        className={styles.fab}
        onClick={() => navigate('/denuncias')}
        title="Nova Denúncia"
      >
        +
      </button>
    </div>
  );
};

export default IssueList;
