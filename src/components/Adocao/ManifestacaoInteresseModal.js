import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ManifestacaoInteresseModal.module.css';

const manifestacaoSchema = Yup.object().shape({
  proposta: Yup.string()
    .min(20, 'A proposta deve ter pelo menos 20 caracteres')
    .max(2000, 'A proposta não pode exceder 2000 caracteres')
    .required('A proposta é obrigatória'),
});

const ManifestacaoInteresseModal = ({
  isOpen,
  onClose,
  onSubmit,
  pracaNome,
  isLoading = false,
  error = null,
}) => {
  if (!isOpen) return null;

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values.proposta);
      setSubmitting(false);
    } catch (err) {
      console.error('Erro no submit:', err);
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Manifestar Interesse - {pracaNome}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalContent}>
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <Formik
            initialValues={{ proposta: '' }}
            validationSchema={manifestacaoSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, values, errors, touched }) => (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="proposta">
                    Descreva sua proposta de adoção *
                  </label>
                  <p className={styles.helperText}>
                    Explique como sua empresa planeja cuidar da praça, quais melhorias pretende realizar e o cronograma.
                  </p>
                  <Field
                    as="textarea"
                    id="proposta"
                    name="proposta"
                    placeholder="Ex: Nossa empresa pretende realizar manutenção mensal incluindo jardinagem, limpeza e pequenos reparos. Também instalaremos bancos e lixeiras novas. Estimamos 6 meses para conclusão das obras iniciais..."
                    rows={6}
                    className={`${styles.textarea} ${
                      touched.proposta && errors.proposta ? styles.error : ''
                    }`}
                  />
                  <div className={styles.characterCount}>
                    {values.proposta.length} / 2000 caracteres
                  </div>
                  <ErrorMessage
                    name="proposta"
                    component="div"
                    className={styles.errorText}
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Manifestação'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ManifestacaoInteresseModal;
