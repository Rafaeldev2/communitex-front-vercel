import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import styles from './PracaForm.module.css';

const statusOptions = [
  { value: 'DISPONIVEL', label: 'Disponível para Adoção' },
  { value: 'EM_PROCESSO', label: 'Em Processo de Adoção' },
  { value: 'ADOTADA', label: 'Adotada' },
];

const PracaSchema = Yup.object().shape({
  nome: Yup.string()
    .min(5, 'O nome deve ter pelo menos 5 caracteres')
    .required('O nome é obrigatório'),

  logradouro: Yup.string()
    .nullable(),
  bairro: Yup.string()
    .nullable(),
  cidade: Yup.string()
    .required('A cidade é obrigatória'),

  latitude: Yup.number()
    .typeError('Latitude deve ser um número (ex: -27.59)')
    .nullable(),
  longitude: Yup.number()
    .typeError('Longitude deve ser um número (ex: -48.54)')
    .nullable(),

  descricao: Yup.string()
    .max(1000, 'Descrição não pode exceder 1000 caracteres')
    .nullable(),

  fotoUrl: Yup.string()
    .url('Deve ser uma URL válida (ex: http://.../imagem.png)')
    .nullable(),

  metragemM2: Yup.number()
    .typeError('Metragem deve ser um número (ex: 2500.5)')
    .positive('Metragem deve ser um valor positivo')
    .nullable(),

  status: Yup.string()
    .oneOf(statusOptions.map(opt => opt.value), 'Status inválido')
    .required('O status é obrigatório'),
});

const PracaForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('');

    const pracaRequestDTO = {
      nome: values.nome,
      logradouro: values.logradouro || null,
      bairro: values.bairro || null,
      cidade: values.cidade,
      latitude: values.latitude ? parseFloat(values.latitude) : null,
      longitude: values.longitude ? parseFloat(values.longitude) : null,
      descricao: values.descricao || null,
      fotoUrl: values.fotoUrl || null,
      metragemM2: values.metragemM2 ? parseFloat(values.metragemM2) : null,
      status: values.status,
    };

    try {
      await api.post('/api/pracas', pracaRequestDTO);

      setSubmitting(false);
      setSuccessMessage('Praça cadastrada com sucesso!');
      setShowSuccess(true);

      setTimeout(() => {
        navigate('/pracas');
      }, 2000);

    } catch (err) {
      console.error("Erro ao cadastrar praça:", err);
      setSubmitting(false);
      setServerError(err.response?.data?.message || 'Erro ao salvar a praça.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link to="/pracas" className={styles.backButton}>
          ← Voltar para a lista
        </Link>

        {/* Toast de Sucesso */}
        {showSuccess && (
          <div className={styles.successToast}>
            <div className={styles.toastContent}>
              <span className={styles.toastIcon}>✓</span>
              <div>
                <strong>{successMessage}</strong>
                <p>Redirecionando para a lista...</p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1>🌳 Cadastrar Nova Praça</h1>
            <p>Preencha as informações do novo espaço público para a plataforma</p>
          </div>

          <Formik
            initialValues={{
              nome: '',
              logradouro: '',
              bairro: '',
              cidade: '',
              latitude: '',
              longitude: '',
              descricao: '',
              fotoUrl: '',
              metragemM2: '',
              status: 'DISPONIVEL', 
            }}
            validationSchema={PracaSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>
                {serverError && (
                  <div className={styles.errorBox}>
                    <span className={styles.errorIcon}>⚠️</span>
                    <p>{serverError}</p>
                  </div>
                )}

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>📋 Informações Básicas</legend>

                  <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome da Praça</label>
                    <Field id="nome" type="text" name="nome" placeholder="Ex: Praça Central do Parque" />
                    <ErrorMessage name="nome" component="div" className={styles.error} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="fotoUrl">URL da Foto Principal (Opcional)</label>
                    <Field id="fotoUrl" type="text" name="fotoUrl" placeholder="http://exemplo.com/foto.jpg" />
                    <ErrorMessage name="fotoUrl" component="div" className={styles.error} />
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>📍 Localização</legend>

                  <div className={styles.formGroup}>
                    <label htmlFor="logradouro">Logradouro (Opcional)</label>
                    <Field id="logradouro" type="text" name="logradouro" placeholder="Ex: Av. Principal, 100" />
                    <ErrorMessage name="logradouro" component="div" className={styles.error} />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="bairro">Bairro (Opcional)</label>
                      <Field id="bairro" type="text" name="bairro" placeholder="Ex: Centro" />
                      <ErrorMessage name="bairro" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="cidade">Cidade</label>
                      <Field id="cidade" type="text" name="cidade" placeholder="Ex: São Paulo" />
                      <ErrorMessage name="cidade" component="div" className={styles.error} />
                    </div>
                  </div>

                  {/* --- Coordenadas --- */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="latitude">Latitude (Opcional)</label>
                      <Field id="latitude" type="number" name="latitude" step="any" placeholder="-27.5969" />
                      <ErrorMessage name="latitude" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="longitude">Longitude (Opcional)</label>
                      <Field id="longitude" name="longitude" type="number" step="any" placeholder="-48.5495" />
                      <ErrorMessage name="longitude" component="div" className={styles.error} />
                    </div>
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>📏 Características</legend>

                  <div className={styles.formGroup}>
                    <label htmlFor="metragemM2">Metragem (m²) (Opcional)</label>
                    <Field id="metragemM2" type="number" name="metragemM2" step="0.01" placeholder="Ex: 2500.50" />
                    <ErrorMessage name="metragemM2" component="div" className={styles.error} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status da Praça</label>
                    <Field as="select" id="status" name="status" className={styles.selectInput}>
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="status" component="div" className={styles.error} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="descricao">Descrição (Opcional)</label>
                    <Field as="textarea" id="descricao" name="descricao" rows={4}
                      placeholder="Descreva brevemente a praça, infraestrutura existente, equipamentos, etc." />
                    <ErrorMessage name="descricao" component="div" className={styles.error} />
                  </div>
                </fieldset>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Salvando...
                    </>
                  ) : (
                    '🌿 Salvar Praça'
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PracaForm;