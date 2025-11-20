import React from 'react';
import styles from './HistoricoInteresses.module.css';

const HistoricoInteresses = ({ interesses, loading = false }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <h2>Histórico de Interesses</h2>
        <div className={styles.loading}>Carregando histórico...</div>
      </div>
    );
  }

  if (!interesses || interesses.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Histórico de Interesses</h2>
        <div className={styles.empty}>
          <p>Nenhuma empresa manifestou interesse nesta praça ainda.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Histórico de Interesses ({interesses.length})</h2>
      
      <div className={styles.historicoList}>
        {interesses.map((interesse, index) => (
          <div key={index} className={styles.interesseCard}>
            <div className={styles.empresaHeader}>
              <h3 className={styles.empresaNome}>
                {interesse.nomeEmpresa}
              </h3>
              <span className={styles.empresaId}>ID: {interesse.empresaId}</span>
            </div>

            <div className={styles.propostaContainer}>
              <h4>Proposta de Adoção:</h4>
              <p className={styles.proposta}>
                {interesse.proposta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricoInteresses;
