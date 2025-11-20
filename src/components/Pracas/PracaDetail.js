import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PracaService from '../../services/PracaService';
import HistoricoInteresses from '../Adocao/HistoricoInteresses';
import styles from './PracaDetail.module.css';

const PracaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [praca, setPraca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sucesso, setSucesso] = useState(!!location.state?.successMessage);

  const isEmpresa = user && user.roles && user.roles.includes('ROLE_EMPRESA');

  useEffect(() => {
    const fetchPraca = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const data = await PracaService.buscarPracaComDetalhes(id);
          setPraca(data);
        } catch (detailsError) {
          console.warn('Falha ao buscar detalhes, tentando versão simples...');
          const data = await PracaService.buscarPracaSimples(id);
          setPraca(data);
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes da praça:", err);
        setError('Não foi possível carregar os detalhes da praça.');
      } finally {
        setLoading(false);
      }
    };

    fetchPraca();
  }, [id]);

  const handleAbrirManifestacao = () => {
    navigate(`/pracas/${id}/manifestar-interesse`, {
      state: { pracaNome: praca.nome }
    });
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Carregando detalhes da praça...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !praca) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Link to="/pracas" className={styles.backButton}>← Voltar para a lista</Link>
          <div className={styles.errorState}>
            <p className={styles.errorIcon}>⚠️</p>
            <p className={styles.errorMessage}>{error || "Praça não encontrada."}</p>
          </div>
        </div>
      </div>
    );
  }

  const isDisponivel = praca.status === 'DISPONIVEL';
  const emProcesso = praca.status === 'EM_PROCESSO';
  const adotada = praca.status === 'ADOTADA';

  const successMessage = (
    <div className={styles.successToast}>
      <span className={styles.toastIcon}>✓</span>
      <div>
        <strong>Manifestação enviada com sucesso!</strong>
        <p>O responsável pela praça receberá sua proposta em breve.</p>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link to="/pracas" className={styles.backButton}>← Voltar para a lista</Link>

        {sucesso && (
          <div className={styles.successToast}>
            <span className={styles.toastIcon}>✓</span>
            <div>
              <strong>Manifestação enviada com sucesso!</strong>
              <p>O responsável pela praça receberá sua proposta em breve.</p>
            </div>
          </div>
        )}

        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>🌳 {praca.nome}</h1>
          </div>
          <div className={`${styles.statusBadge} ${styles[`status_${praca.status}`]}`}>
            {praca.status === 'DISPONIVEL' ? '🟢 Disponível' : praca.status === 'EM_PROCESSO' ? '🟡 Em Processo' : '🔴 Adotada'}
          </div>
        </div>

        <div className={styles.content}>
          {praca.fotoUrl && (
            <div className={styles.fotoContainer}>
              <img src={praca.fotoUrl} alt={praca.nome} className={styles.foto} />
            </div>
          )}

          <div className={styles.detailsCard}>
            <h2>📋 Informações da Praça</h2>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🏷️ Nome</span>
                <span className={styles.infoValue}>{praca.nome}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>📍 Localização</span>
                <span className={styles.infoValue}>{praca.logradouro || 'Não informado'}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🏘️ Bairro</span>
                <span className={styles.infoValue}>{praca.bairro || 'Não informado'}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🏙️ Cidade</span>
                <span className={styles.infoValue}>{praca.cidade || 'Não informado'}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🗺️ Latitude</span>
                <span className={styles.infoValue}>{praca.latitude || 'Não informada'}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🗺️ Longitude</span>
                <span className={styles.infoValue}>{praca.longitude || 'Não informada'}</span>
              </div>
            </div>

            {praca.metragemM2 && (
              <div className={styles.infoHighlight}>
                <span className={styles.infoLabel}>📐 Metragem</span>
                <span className={styles.infoValue}>{praca.metragemM2} m²</span>
              </div>
            )}

            <div className={styles.infoFull}>
              <span className={styles.infoLabel}>📝 Descrição</span>
              <p>{praca.descricao || 'Nenhuma descrição fornecida.'}</p>
            </div>

            {/* Mostrar informações do cadastrante se disponível */}
            {praca.cadastradoPor && (
              <div className={styles.cadastranteCard}>
                <h3>👤 Responsável pela Praça</h3>
                <div className={styles.cadastranteInfo}>
                  <p><strong>Nome:</strong> {praca.cadastradoPor.nome}</p>
                  <p><strong>Email:</strong> {praca.cadastradoPor.email}</p>
                  {praca.cadastradoPor.telefone && (
                    <p><strong>Telefone:</strong> {praca.cadastradoPor.telefone}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.actionCard}>
            {isDisponivel && isEmpresa ? (
              <>
                <h2>🤝 Inicie a Adoção</h2>
                <p>Sua empresa pode ser a próxima a cuidar deste espaço, melhorando o bairro e ganhando visibilidade.</p>
                <button onClick={handleAbrirManifestacao} className={styles.actionButton}>
                  🌿 Manifestar Interesse
                </button>
              </>
            ) : emProcesso ? (
              <>
                <h2>⏳ Processo em Andamento</h2>
                <p>Esta praça está em processo de adoção. Aguarde a conclusão da análise.</p>
              </>
            ) : adotada ? (
              <>
                <h2>✅ Praça Adotada</h2>
                <p>Esta praça já foi adotada por uma empresa. Conheça outras praças disponíveis!</p>
                <Link to="/pracas" className={styles.backToList}>🌳 Ver todas as praças</Link>
              </>
            ) : (
              <>
                <h2>🔒 Acesso Restrito</h2>
                <p>Apenas empresas autenticadas podem manifestar interesse em adotar praças.</p>
              </>
            )}
          </div>
        </div>

        {praca.historicoInteresses && (
          <HistoricoInteresses
            interesses={praca.historicoInteresses}
            loading={false}
          />
        )}
      </div>
    </div>
  );
};

export default PracaDetail;