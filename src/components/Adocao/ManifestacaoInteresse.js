import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import styles from './ManifestacaoInteresse.module.css';

const manifestacaoSchema = Yup.object().shape({
  proposta: Yup.string()
    .min(20, 'A proposta deve ter pelo menos 20 caracteres')
    .max(2000, 'A proposta não pode exceder 2000 caracteres')
    .required('A proposta é obrigatória'),
});

const ManifestacaoInteresse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pracaNome] = useState(location.state?.pracaNome || 'Praça');

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('');
    setLoading(true);

    try {
      const interesseDTO = {
        pracaId: parseInt(id),
        proposta: values.proposta,
      };

      console.log('Enviando interesse:', interesseDTO);

      await api.post('/api/adocao/interesse', interesseDTO);

      navigate(`/pracas/${id}`, { 
        state: { successMessage: 'Manifestação de interesse enviada com sucesso!' } 
      });
    } catch (err) {
      console.error('Erro ao manifestar interesse:', err);
      setServerError(err.response?.data?.message || 'Erro ao enviar manifestação.');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(`/pracas/${id}`)}>
          ← Voltar
        </button>
        <h1>🌿 Manifestar Interesse - {pracaNome}</h1>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.infoBox}>
            <p>
              📋 Preencha os detalhes de sua proposta para adoção dessa praça. 
              Seja claro e conciso sobre como sua empresa planeja cuidar do espaço.
            </p>
          </div>

          {serverError && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {serverError}
            </div>
          )}

          <Formik
            initialValues={{
              proposta: '',
            }}
            validationSchema={manifestacaoSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, errors, touched }) => (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="proposta">
                    📝 Descrição do Projeto *
                  </label>
                  <p className={styles.helperText}>
                    Descreva como sua empresa planeja cuidar da praça, quais melhorias pretende realizar e o cronograma.
                  </p>
                  <Field
                    as="textarea"
                    id="proposta"
                    name="proposta"
                    placeholder="Ex: Nossa empresa pretende realizar manutenção mensal incluindo jardinagem, limpeza e pequenos reparos..."
                    rows={8}
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
                    onClick={() => navigate(`/pracas/${id}`)}
                    disabled={isSubmitting}
                  >
                    ✕ Cancelar
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Enviando...
                      </>
                    ) : (
                      '🌿 Enviar Manifestação'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h3>💡 Dicas para sua proposta</h3>
            <ul>
              <li>Seja específico sobre as melhorias</li>
              <li>Mencione cronograma realista</li>
              <li>Descreva estrutura de manutenção</li>
              <li>Inclua equipe responsável</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>❓ Dúvidas?</h3>
            <p>Entre em contato com nosso suporte através do email: suporte@communitex.com</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestacaoInteresse;
