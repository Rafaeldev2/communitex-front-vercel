// /src/components/Admin/GerenciamentoPropostas.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import styles from './GerenciamentoPropostas.module.css';

// Reutilizando o StatusBadge da tela "MinhasAdoções"
// (Idealmente, este seria um componente separado em /src/components/common/StatusBadge.js)
const StatusBadge = ({ status }) => {
  let statusClass = '';
  let statusText = '';
  switch (status) {
    case 'PENDENTE': statusClass = styles.statusPendente; statusText = 'Pendente'; break;
    case 'APROVADA': statusClass = styles.statusAprovada; statusText = 'Aprovada'; break;
    case 'REPROVADA': statusClass = styles.statusReprovada; statusText = 'Reprovada'; break;
    default: statusClass = styles.statusDefault; statusText = status;
  }
  return <span className={`${styles.statusBadge} ${statusClass}`}>{statusText}</span>;
};


const GerenciamentoPropostas = () => {
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Usamos useCallback para evitar recriação desnecessária da função
  const fetchPropostas = useCallback(async () => {
    try {
      setLoading(true);
      // Endpoint que busca TODAS as propostas (diferente da tela do usuário)
      const response = await api.get('/api/propostas');
      
      // Ordena por data, da mais recente para a mais antiga
      const propostasOrdenadas = response.data.sort((a, b) => 
        new Date(b.dataProposta) - new Date(a.dataProposta)
      );
      setPropostas(propostasOrdenadas);
      setError('');
    } catch (err) {
      console.error("Erro ao buscar propostas:", err);
      setError('Erro ao carregar o painel de propostas.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca inicial
  useEffect(() => {
    fetchPropostas();
  }, [fetchPropostas]);

  // Função para aprovar ou reprovar
  const handleUpdateStatus = async (propostaId, novoStatus) => {
    // Confirmação para evitar cliques acidentais
    const acao = novoStatus === 'APROVADA' ? 'Aprovar' : 'Reprovar';
    if (!window.confirm(`Tem certeza que deseja ${acao.toLowerCase()} esta proposta?`)) {
      return;
    }

    try {
      // Usando o endpoint: PUT /api/propostas/{id}/status
      // O DTO esperado é { "status": "NOVO_STATUS" }
      await api.put(`/api/propostas/${propostaId}/status`, { status: novoStatus });
      
      // Sucesso! Atualiza o estado localmente sem refazer o fetch
      setPropostas(prevPropostas => 
        prevPropostas.map(proposta => 
          proposta.id === propostaId ? { ...proposta, status: novoStatus } : proposta
        )
      );
      
      alert(`Proposta ${acao.toLowerCase()}da com sucesso!`);

    } catch (err) {
      console.error(`Erro ao ${acao.toLowerCase()} proposta:`, err);
      alert(`Não foi possível ${acao.toLowerCase()} a proposta. Tente novamente.`);
    }
  };

  if (loading) {
    return <div className={styles.message}>Carregando propostas...</div>;
  }

  if (error) {
    return <div className={styles.messageError}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Gerenciamento de Propostas</h1>
      <p>Analise e responda às solicitações de adoção.</p>

      {propostas.length === 0 ? (
        <div className={styles.message}>Nenhuma proposta pendente ou registrada no momento.</div>
      ) : (
        <table className={styles.propostasTable}>
          <thead>
            <tr>
              <th>Praça</th>
              <th>Empresa Proponente</th>
              <th>Data da Proposta</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {propostas.map(proposta => (
              <tr key={proposta.id}>
                <td>
                  {/* O DTO GET /api/propostas/ deve trazer o praçaNome */}
                  {proposta.praçaNome || 'Praça (ID ' + proposta.praçaId + ')'}
                </td>
                <td>
                  {/* ... e também o empresaNome */}
                  {proposta.empresaNome || 'Empresa (ID ' + proposta.empresaId + ')'}
                </td>
                <td>
                  {new Date(proposta.dataProposta).toLocaleDateString('pt-BR')}
                </td>
                <td>
                  <StatusBadge status={proposta.status} />
                </td>
                <td className={styles.actionCell}>
                  {/* Só mostra botões de Ação se o status for PENDENTE */}
                  {proposta.status === 'PENDENTE' && (
                    <>
                      <button 
                        className={`${styles.actionButton} ${styles.approveButton}`}
                        onClick={() => handleUpdateStatus(proposta.id, 'APROVADA')}
                      >
                        Aprovar
                      </button>
                      <button 
                        className={`${styles.actionButton} ${styles.rejectButton}`}
                        onClick={() => handleUpdateStatus(proposta.id, 'REPROVADA')}
                      >
                        Reprovar
                      </button>
                    </>
                  )}
                  {/* Se não estiver pendente, exibe N/A */}
                  {proposta.status !== 'PENDENTE' && (
                    <span className={styles.noAction}>N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GerenciamentoPropostas;