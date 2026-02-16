// /src/components/CommunityMap/IssueCard.js
import React, { useState } from 'react';
import styles from './IssueCard.module.css';

/**
 * Mapeamento de tipos de denúncia para ícones e labels
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
 * Mapeamento de status para estilos
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
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Componente de Card para visualização de uma denúncia
 */
const IssueCard = ({ 
  issue, 
  onClose, 
  onSupport, 
  onViewDetails,
  isCompact = false 
}) => {
  const [isSupporting, setIsSupporting] = useState(false);
  const [supportError, setSupportError] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  if (!issue) return null;

  const typeConfig = ISSUE_TYPES[issue.tipo] || ISSUE_TYPES.OUTRO;
  const statusConfig = STATUS_CONFIG[issue.status] || STATUS_CONFIG.ABERTA;

  const handleSupport = async () => {
    if (!onSupport || isSupporting) return;
    
    setIsSupporting(true);
    setSupportError(null);
    
    try {
      const result = await onSupport(issue.id, 'APOIO');
      if (!result.success) {
        setSupportError(result.error);
      }
    } catch (err) {
      setSupportError('Erro ao apoiar denúncia');
    } finally {
      setIsSupporting(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!onSupport || isSubmittingComment || !commentText.trim()) return;
    
    setIsSubmittingComment(true);
    setSupportError(null);
    
    try {
      const result = await onSupport(issue.id, 'COMENTARIO', commentText.trim());
      if (result.success) {
        setCommentText('');
        setShowCommentInput(false);
      } else {
        setSupportError(result.error);
      }
    } catch (err) {
      setSupportError('Erro ao enviar comentário');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Versão compacta para popup do mapa
  if (isCompact) {
    return (
      <div className={styles.compactCard}>
        <div className={styles.compactHeader}>
          <span className={styles.typeIcon}>{typeConfig.icon}</span>
          <h4 className={styles.compactTitle}>{issue.titulo}</h4>
        </div>
        <p className={styles.compactDescription}>
          {issue.descricao?.substring(0, 100)}
          {issue.descricao?.length > 100 ? '...' : ''}
        </p>
        <div className={styles.compactActions}>
          <button 
            className={styles.supportButton}
            onClick={handleSupport}
            disabled={isSupporting}
          >
            👍 {issue.totalApoios || 0}
          </button>
          {onViewDetails && (
            <button 
              className={styles.detailsButton}
              onClick={() => onViewDetails(issue)}
            >
              Ver Detalhes
            </button>
          )}
        </div>
      </div>
    );
  }

  // Versão completa
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.typeIcon}>{typeConfig.icon}</span>
          <span className={styles.typeLabel}>{typeConfig.label}</span>
        </div>
        <div className={styles.headerRight}>
          <span 
            className={styles.statusBadge}
            style={{ backgroundColor: statusConfig.color }}
          >
            {statusConfig.label}
          </span>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          )}
        </div>
      </div>

      {issue.fotoUrl && (
        <div className={styles.imageContainer}>
          <img 
            src={issue.fotoUrl} 
            alt={issue.titulo}
            className={styles.image}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{issue.titulo}</h3>
        <p className={styles.description}>{issue.descricao}</p>
        
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>👤</span>
            <span>{issue.autorNome || 'Anônimo'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span>
            <span>{formatDate(issue.dataCriacao)}</span>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>👍</span>
            <span className={styles.statValue}>{issue.totalApoios || 0}</span>
            <span className={styles.statLabel}>apoios</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>💬</span>
            <span className={styles.statValue}>{issue.totalInteracoes || 0}</span>
            <span className={styles.statLabel}>interações</span>
          </div>
        </div>

        {supportError && (
          <div className={styles.errorMessage}>
            {supportError}
          </div>
        )}

        {/* Seção de Comentários */}
        {issue.interacoes && issue.interacoes.length > 0 && (
          <div className={styles.commentsSection}>
            <h4 className={styles.commentsTitle}>💬 Comentários</h4>
            <div className={styles.commentsList}>
              {issue.interacoes
                .filter(i => i.tipo === 'COMENTARIO')
                .slice(0, 5)
                .map((comment) => (
                  <div key={comment.id} className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{comment.usuarioNome}</span>
                      <span className={styles.commentDate}>{formatDate(comment.dataCriacao)}</span>
                    </div>
                    <p className={styles.commentText}>{comment.conteudo}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Input de Comentário */}
        {showCommentInput && (
          <div className={styles.commentInputSection}>
            <textarea
              className={styles.commentInput}
              placeholder="Digite seu comentário..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              maxLength={1000}
            />
            <div className={styles.commentInputActions}>
              <span className={styles.charCount}>{commentText.length}/1000</span>
              <button
                className={styles.cancelCommentButton}
                onClick={() => {
                  setShowCommentInput(false);
                  setCommentText('');
                }}
                disabled={isSubmittingComment}
              >
                Cancelar
              </button>
              <button
                className={styles.submitCommentButton}
                onClick={handleCommentSubmit}
                disabled={isSubmittingComment || !commentText.trim()}
              >
                {isSubmittingComment ? '⏳' : '📤'} Enviar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardActions}>
        <button 
          className={styles.supportActionButton}
          onClick={handleSupport}
          disabled={isSupporting}
        >
          {isSupporting ? '⏳' : '👍'} Apoiar
        </button>
        <button 
          className={styles.commentActionButton}
          onClick={() => setShowCommentInput(!showCommentInput)}
        >
          💬 Comentar
        </button>
        {onViewDetails && (
          <button 
            className={styles.detailsActionButton}
            onClick={() => onViewDetails(issue)}
          >
            📋 Ver Detalhes
          </button>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
