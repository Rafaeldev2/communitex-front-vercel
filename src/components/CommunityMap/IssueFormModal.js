// /src/components/CommunityMap/IssueFormModal.js
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import IssueService from '../../services/IssueService';
import styles from './IssueFormModal.module.css';

/**
 * Tipos de denúncia disponíveis
 */
const ISSUE_TYPES = [
  { value: 'BURACO', label: 'Buraco na Via', icon: '🕳️' },
  { value: 'ILUMINACAO', label: 'Problema de Iluminação', icon: '💡' },
  { value: 'LIXO', label: 'Lixo/Entulho', icon: '🗑️' },
  { value: 'PODA_ARVORE', label: 'Poda de Árvore', icon: '🌳' },
  { value: 'VAZAMENTO', label: 'Vazamento de Água', icon: '💧' },
  { value: 'PICHACAO', label: 'Pichação/Vandalismo', icon: '🎨' },
  { value: 'CALCADA_DANIFICADA', label: 'Calçada Danificada', icon: '🚧' },
  { value: 'SINALIZACAO', label: 'Sinalização', icon: '🚦' },
  { value: 'OUTRO', label: 'Outro Problema', icon: '❓' }
];

/**
 * Schema de validação do formulário
 */
const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('Título é obrigatório')
    .min(5, 'Título deve ter pelo menos 5 caracteres')
    .max(150, 'Título deve ter no máximo 150 caracteres'),
  descricao: Yup.string()
    .required('Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres'),
  tipo: Yup.string()
    .required('Selecione o tipo do problema')
    .oneOf(ISSUE_TYPES.map(t => t.value), 'Tipo inválido')
});

/**
 * Modal de formulário para cadastro de nova denúncia
 */
const IssueFormModal = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  latitude, 
  longitude 
}) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      titulo: '',
      descricao: '',
      tipo: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const issueData = {
          titulo: values.titulo,
          descricao: values.descricao,
          tipo: values.tipo,
          latitude,
          longitude
        };

        // Se tiver uma foto via URL (para simplicidade, pode ser expandido para upload real)
        // Por enquanto, a API espera fotoUrl como string
        // Em produção, você implementaria upload para S3/CloudStorage
        if (photoPreview && photoFile) {
          // Converter para base64 ou usar URL de upload
          // Por simplicidade, deixamos sem foto ou usamos uma URL placeholder
          // issueData.fotoUrl = await uploadPhoto(photoFile);
        }

        await IssueService.create(issueData);
        
        // Limpa o formulário
        formik.resetForm();
        setPhotoPreview(null);
        setPhotoFile(null);
        
        // Callback de sucesso
        if (onSuccess) {
          onSuccess();
        }
        
        // Fecha o modal
        onClose();
      } catch (err) {
        console.error('Erro ao criar denúncia:', err);
        
        if (err.response?.status === 409) {
          setSubmitError('Já existe uma denúncia similar nesta região. Considere apoiar a existente!');
        } else if (err.response?.status === 401) {
          setSubmitError('Você precisa estar logado para fazer uma denúncia.');
        } else if (err.response?.status === 400) {
          setSubmitError('Dados inválidos. Verifique os campos e tente novamente.');
        } else {
          setSubmitError('Não foi possível enviar a denúncia. Tente novamente mais tarde.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Valida tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setSubmitError('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Valida tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setPhotoFile(file);
    setSubmitError(null);

    // Cria preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setPhotoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setPhotoPreview(null);
    setPhotoFile(null);
    setSubmitError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>📍 Nova Denúncia</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.locationInfo}>
            <span className={styles.locationIcon}>📌</span>
            <span className={styles.locationText}>
              Lat: {latitude?.toFixed(6)} | Lng: {longitude?.toFixed(6)}
            </span>
          </div>

          {/* Tipo do Problema */}
          <div className={styles.field}>
            <label className={styles.label}>
              Tipo do Problema <span className={styles.required}>*</span>
            </label>
            <div className={styles.typeGrid}>
              {ISSUE_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`${styles.typeButton} ${
                    formik.values.tipo === type.value ? styles.typeButtonActive : ''
                  }`}
                  onClick={() => formik.setFieldValue('tipo', type.value)}
                >
                  <span className={styles.typeIcon}>{type.icon}</span>
                  <span className={styles.typeLabel}>{type.label}</span>
                </button>
              ))}
            </div>
            {formik.touched.tipo && formik.errors.tipo && (
              <span className={styles.error}>{formik.errors.tipo}</span>
            )}
          </div>

          {/* Título */}
          <div className={styles.field}>
            <label htmlFor="titulo" className={styles.label}>
              Título <span className={styles.required}>*</span>
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              placeholder="Ex: Buraco grande na Rua das Flores"
              className={`${styles.input} ${
                formik.touched.titulo && formik.errors.titulo ? styles.inputError : ''
              }`}
              {...formik.getFieldProps('titulo')}
            />
            {formik.touched.titulo && formik.errors.titulo && (
              <span className={styles.error}>{formik.errors.titulo}</span>
            )}
          </div>

          {/* Descrição */}
          <div className={styles.field}>
            <label htmlFor="descricao" className={styles.label}>
              Descrição <span className={styles.required}>*</span>
            </label>
            <textarea
              id="descricao"
              name="descricao"
              placeholder="Descreva o problema em detalhes. Quanto mais informações, melhor!"
              rows={4}
              className={`${styles.textarea} ${
                formik.touched.descricao && formik.errors.descricao ? styles.inputError : ''
              }`}
              {...formik.getFieldProps('descricao')}
            />
            <div className={styles.charCount}>
              {formik.values.descricao.length}/2000
            </div>
            {formik.touched.descricao && formik.errors.descricao && (
              <span className={styles.error}>{formik.errors.descricao}</span>
            )}
          </div>

          {/* Upload de Foto */}
          <div className={styles.field}>
            <label className={styles.label}>Foto (opcional)</label>
            
            {photoPreview ? (
              <div className={styles.photoPreviewContainer}>
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className={styles.photoPreview}
                />
                <button 
                  type="button" 
                  className={styles.removePhotoButton}
                  onClick={removePhoto}
                >
                  ✕ Remover
                </button>
              </div>
            ) : (
              <div 
                className={styles.uploadArea}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className={styles.uploadIcon}>📷</span>
                <span className={styles.uploadText}>
                  Clique para adicionar uma foto
                </span>
                <span className={styles.uploadHint}>
                  JPG, PNG ou GIF (máx. 5MB)
                </span>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={styles.fileInput}
            />
          </div>

          {/* Erro de submit */}
          {submitError && (
            <div className={styles.submitError}>
              ⚠️ {submitError}
            </div>
          )}

          {/* Botões de ação */}
          <div className={styles.actions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting || !formik.isValid}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Enviando...
                </>
              ) : (
                '📤 Enviar Denúncia'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueFormModal;
