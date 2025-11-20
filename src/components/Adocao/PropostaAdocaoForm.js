import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Importamos o Yup para validação
import api from '../../services/api';
import styles from './PropostaAdocaoForm.module.css';

const PropostaSchema = Yup.object().shape({
  descricaoProjeto: Yup.string()
    .max(1000, 'A descrição não pode exceder 1000 caracteres.')
    .min(20, 'A descrição deve ter pelo menos 20 caracteres.')
    .required('A descrição do projeto é obrigatória.'),
  dataInicio: Yup.date()
    .required('A data de início é obrigatória.')
    .typeError('A data de início deve ser válida.'),
  dataFim: Yup.date()
    .nullable()
    .typeError('A data de término deve ser válida.')
    .min(
      Yup.ref('dataInicio'),
      'A data de término deve ser após a data de início.'
    ),
});

const PropostaAdocaoForm = () => {
  const { id: pracaId } = useParams(); 
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(''); 

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('');
   
    const adocaoRequestDTO = {
      pracaId: parseInt(pracaId, 10),
      descricaoProjeto: values.descricaoProjeto,
      dataInicio: values.dataInicio,
      dataFim: values.dataFim || null,
      status: 'PROPOSTA',
    };

    try {
      const response = await api.post('/api/adocoes', adocaoRequestDTO);
      
      setSubmitting(false);
      navigate(`/pracas/${pracaId}`);
      
    } catch (err) {
      console.error("Erro ao enviar proposta:", err);
      setSubmitting(false);
      if (err.response && err.response.data) {
        setServerError(err.response.data.message || 'Ocorreu um erro desconhecido.');
      } else {
        setServerError('Não foi possível conectar ao servidor.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/pracas/${pracaId}`} className={styles.backButton}>
        &larr; Cancelar e Voltar
      </Link>
      
      <Formik
        initialValues={{
          descricaoProjeto: '',
          dataInicio: '',
          dataFim: '',
        }}
        validationSchema={PropostaSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h1>Proposta de Adoção</h1>
            <p>Preencha os detalhes do seu projeto para a praça.</p>

            {serverError && <div className={styles.serverError}>{serverError}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="descricaoProjeto">Descrição do Projeto *</label>
              <Field
                as="textarea"
                id="descricaoProjeto"
                name="descricaoProjeto"
                rows={6}
                placeholder="Detalhe o que sua empresa planeja fazer na praça (ex: manutenção, novos equipamentos, paisagismo...)"
              />
              <ErrorMessage name="descricaoProjeto" component="div" className={styles.error} />
            </div>

            <div className={styles.dateGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="dataInicio">Data de Início *</label>
                <Field
                  type="date"
                  id="dataInicio"
                  name="dataInicio"
                />
                <ErrorMessage name="dataInicio" component="div" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dataFim">Data de Término (opcional)</label>
                <Field
                  type="date"
                  id="dataFim"
                  name="dataFim"
                />
                <ErrorMessage name="dataFim" component="div" className={styles.error} />
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando Proposta...' : 'Enviar Proposta'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PropostaAdocaoForm;