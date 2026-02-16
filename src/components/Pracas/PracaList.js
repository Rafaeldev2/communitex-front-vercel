import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PracaService from '../../services/PracaService';
import styles from './PracaList.module.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; 

const PracaCard = ({ praca, isEmpresa }) => {
  const navigate = useNavigate();
  
  const handleAdotar = () => {
    navigate(`/pracas/${praca.id}`);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'DISPONIVEL':
        return '🟢';
      case 'EM_PROCESSO':
        return '🟡';
      case 'ADOTADA':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>🌳 {praca.nome}</h3>
          <p className={styles.cardLocal}>📍 {praca.logradouro || praca.bairro || 'Localização não especificada'}</p>
        </div>
        <div className={`${styles.statusBadge} ${styles[`status_${praca.status}`]}`}>
          {getStatusIcon(praca.status)}
          <span>{praca.status === 'DISPONIVEL' ? 'Disponível' : praca.status === 'EM_PROCESSO' ? 'Em Processo' : 'Adotada'}</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>🏙️ Cidade</span>
            <span className={styles.infoValue}>{praca.cidade || 'N/D'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>📐 Tamanho</span>
            <span className={styles.infoValue}>{praca.metragemM2 ? `${praca.metragemM2} m²` : 'N/D'}</span>
          </div>
        </div>
      </div>

      <div className={styles.cardActions}>
        <Link to={`/pracas/${praca.id}`} className={styles.detailsButton}>
          👁️ Ver Detalhes
        </Link>
        {isEmpresa && praca.status === 'DISPONIVEL' && (
          <button onClick={handleAdotar} className={styles.adotarButton}>
            🤝 Manifestar Interesse
          </button>
        )}
      </div>
    </div>
  );
};

const PracaList = () => {
  const [pracas, setPracas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchNome, setSearchNome] = useState('');
  const [searchCidade, setSearchCidade] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { user } = useAuth(); 

  const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');
  const isEmpresa = user && user.roles && user.roles.includes('ROLE_EMPRESA');
  const isUser = user && user.roles && user.roles.includes('ROLE_USER');
  
  console.log("Usuário:", user, "isAdmin:", isAdmin, "isEmpresa:", isEmpresa, "isUser:", isUser);
  
  const fetchPracas = async (nome = '', cidade = '') => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }
      const params = new URLSearchParams();
      if (nome) params.append('nome', nome);
      if (cidade) params.append('cidade', cidade);
      
      const queryString = params.toString();
      const endpoint = queryString ? `/api/pracas?${queryString}` : '/api/pracas';
      const response = await api.get(endpoint);
      setPracas(response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar praças:", err);
      setError('Não foi possível carregar as praças.');
    } finally {
      if (isInitialLoad) {
        setLoading(false);
        setIsInitialLoad(false);
      }
    }
  };

  useEffect(() => {
    fetchPracas();
  }, []);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      const nomeLength = searchNome.trim().length;
      const cidadeLength = searchCidade.trim().length;
      
      if (nomeLength >= 3 || cidadeLength >= 3) {
        fetchPracas(searchNome, searchCidade);
      } else if (nomeLength === 0 && cidadeLength === 0) {
        fetchPracas('', '');
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchNome, searchCidade]);

  const handleClearFilters = () => {
    setSearchNome('');
    setSearchCidade('');
  };
  
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Carregando praças...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.errorState}>
            <p className={styles.errorIcon}>⚠️</p>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>🌿 {isAdmin ? 'Gestão de Praças' : isUser ? 'Cadastro de Praças' : 'Praças Disponíveis'}</h1>
            <p className={styles.headerSubtitle}>Descubra e adote espaços públicos para transformar sua comunidade</p>
          </div>

          <div className={styles.headerActions}>
            {/* 4. Renderização condicional do botão */}
            {isAdmin && (
              <Link to="/admin/pracas/nova" className={styles.addButton}>
                ➕ Adicionar Nova Praça
              </Link>
            )}

            {isUser && (
              <Link to="/user/pracas/nova" className={styles.addButton}>
                ➕ Cadastrar Nova Praça
              </Link>
            )}
            
            {isEmpresa && (
              <Link to="/minhas-propostas" className={styles.minhasAdocoesButton}>
                📋 Minhas Adoções
              </Link>
            )}
          </div>
        </div>

        <div className={styles.searchForm}>
          <div className={styles.searchContainer}>
            <div className={styles.searchField}>
              <input
                type="text"
                placeholder="Buscar por nome da praça..."
                value={searchNome}
                onChange={(e) => setSearchNome(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.searchField}>
              <input
                type="text"
                placeholder="Buscar por cidade..."
                value={searchCidade}
                onChange={(e) => setSearchCidade(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            {(searchNome || searchCidade) && (
              <button 
                type="button" 
                className={styles.clearButton}
                onClick={handleClearFilters}
              >
                ✕ Limpar Filtros
              </button>
            )}
          </div>
        </div>

        {pracas.length > 0 ? (
          <div className={styles.grid}>
            {pracas.map(praca => <PracaCard key={praca.id} praca={praca} isEmpresa={isEmpresa} />)}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>🌍</p>
            <p className={styles.emptyMessage}>Nenhuma praça encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracaList;