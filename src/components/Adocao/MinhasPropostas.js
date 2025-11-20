import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import styles from './MinhasPropostas.module.css';

const StatusBadge = ({ status }) => {
  let statusClass = '';
  let statusText = '';

  switch (status) {
    case 'PROPOSTA':
      statusClass = styles.statusProposta;
      statusText = 'Proposta';
      break;
    case 'EM_ANALISE':
      statusClass = styles.statusAnalise;
      statusText = 'Em Análise';
      break;
    case 'APROVADA':
      statusClass = styles.statusAprovada;
      statusText = 'Aprovada';
      break;
    case 'REJEITADA':
      statusClass = styles.statusRejeitada;
      statusText = 'Rejeitada';
      break;
    case 'CONCLUIDA':
      statusClass = styles.statusConcluida;
      statusText = 'Concluída';
      break;
    case 'FINALIZADA':
      statusClass = styles.statusFinalizada;
      statusText = 'Finalizada';
      break;
    default:
      statusClass = styles.statusDefault;
      statusText = status || 'N/A';
  }

  return <span className={`${styles.statusBadge} ${statusClass}`}>{statusText}</span>;
};


const MinhasPropostas = () => {
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPropostas = async () => {
      try {
        setLoading(true);
        // Novo endpoint - backend obtém empresaId do token
        const response = await api.get('/api/adocao/minhas-propostas');

        // Ordena por data de registro (mais recentes primeiro)
        const propostasOrdenadas = response.data.sort((a, b) =>
          new Date(b.dataRegistro) - new Date(a.dataRegistro)
        );

        setPropostas(propostasOrdenadas);
        setError('');
      } catch (err) {
        console.error("Erro ao buscar propostas:", err);
        setError('Erro ao carregar suas propostas de interesse.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropostas();
  }, []);

  if (loading) {
    return <div className={styles.message}>Carregando propostas...</div>;
  }

  if (error) {
    return <div className={styles.messageError}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Minhas Propostas</h1>
      <p>Acompanhe suas propostas de interesse em adoção de praças.</p>

      {propostas.length === 0 ? (
        <div className={styles.message}>
          Sua empresa ainda não enviou propostas de interesse.
          <Link to="/pracas"> Ver praças disponíveis</Link>
        </div>
      ) : (
        <table className={styles.adocoesTable}>
          <thead>
            <tr>
              <th>Praça</th>
              <th>Data da Proposta</th>
              <th>Proposta</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {propostas.map(proposta => (
              <tr key={proposta.id}>
                <td>
                  <strong>{proposta.nomePraca || 'Praça não disponível'}</strong>
                </td>
                <td>
                  {new Date(proposta.dataRegistro).toLocaleDateString('pt-BR')}
                </td>
                <td>
                  <div className={styles.propostaText}>
                    {proposta.proposta.length > 100
                      ? `${proposta.proposta.substring(0, 100)}...`
                      : proposta.proposta}
                  </div>
                </td>
                <td>
                  <StatusBadge status={proposta.status} />
                </td>
                <td>
                  <Link
                    to={`/pracas/${proposta.pracaId}`}
                    className={styles.actionButton}
                  >
                    Ver Praça
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MinhasPropostas;