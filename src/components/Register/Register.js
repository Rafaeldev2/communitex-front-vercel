import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './Register.module.css';

// Esquema de Validação (Yup)
const RegisterSchema = Yup.object().shape({
  // Dados da Empresa
  razaoSocial: Yup.string()
    .required('A Razão Social é obrigatória'),
  cnpj: Yup.string()
    .matches(/^[0-9]{14}$/, 'CNPJ deve conter 14 números (sem pontos ou traços)')
    .required('CNPJ é obrigatório'),
  nomeFantasia: Yup.string()
    .nullable(),
  email: Yup.string()
    .email('Email da empresa inválido')
    .required('Email da empresa é obrigatório'),
  telefone: Yup.string()
    .nullable(),

  // Dados do Representante
  nomeRepresentante: Yup.string()
    .required('Nome do representante é obrigatório'),
  emailRepresentante: Yup.string()
    .email('Email do representante inválido')
    .required('Email do representante é obrigatório'),

  // Dados de Acesso
  senhaRepresentante: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
  confirmSenha: Yup.string()
    .oneOf([Yup.ref('senhaRepresentante'), null], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('');
    
    const newRegisterDTO = {
      razaoSocial: values.razaoSocial,
      cnpj: values.cnpj,
      nomeFantasia: values.nomeFantasia || null,
      email: values.email,
      telefone: values.telefone || null,
      nomeRepresentante: values.nomeRepresentante,
      emailRepresentante: values.emailRepresentante,
      senhaRepresentante: values.senhaRepresentante,
    };

    try {
      await api.post('/api/empresas', newRegisterDTO);
      
      setSubmitting(false);
      alert('Cadastro realizado com sucesso! Use o EMAIL DO REPRESENTANTE para fazer o login.');
      navigate('/login'); 

    } catch (err) {
      console.error("Erro no cadastro:", err);
      setSubmitting(false);
      if (err.response && err.response.data) {
        setServerError(err.response.data.message || 'Erro ao realizar o cadastro. Verifique os dados.');
      } else {
        setServerError('Não foi possível conectar ao servidor.');
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      {/* PAINEL LATERAL */}
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelContent}>
          <h1>🌿 Communitex</h1>
          <p className={styles.sidePanelTitle}>Transformando cidades através de praças sustentáveis</p>
          
          <div className={styles.benefitsContainer}>
            <h3>Por que sua empresa?</h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🌱</span>
                <span>Cumpra responsabilidade ambiental</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🤝</span>
                <span>Fortaleça relação com a comunidade</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🏆</span>
                <span>Destaque como empresa sustentável</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>💚</span>
                <span>Transforme espaços públicos</span>
              </div>
            </div>
          </div>

          <div className={styles.sideFooter}>
            <p>Já tem uma conta?<br/><Link to="/login" className={styles.sideLink}>Faça login →</Link></p>
            <p>É pessoa física?<br/><Link to="/register-pessoa-fisica" className={styles.sideLink}>Cadastre-se aqui →</Link></p>
          </div>
        </div>
      </div>

      <div className={styles.registerSection}>
        <Formik
          initialValues={{
            razaoSocial: '',
            cnpj: '',
            nomeFantasia: '',
            email: '',
            telefone: '',
            nomeRepresentante: '',
            emailRepresentante: '',
            senhaRepresentante: '',
            confirmSenha: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.registerForm}>
              <div className={styles.formHeader}>
                <h2>Registrar Empresa</h2>
                <p>Preencha os dados para cadastrar sua empresa na plataforma</p>
              </div>
              
              {serverError && (
                <div className={styles.errorBox}>
                  <span className={styles.errorIcon}>⚠️</span>
                  <p>{serverError}</p>
                </div>
              )}

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>📋 Dados da Empresa</legend>
                <div className={styles.formGroup}>
                  <label htmlFor="razaoSocial">Razão Social</label>
                  <Field id="razaoSocial" type="text" name="razaoSocial" placeholder="Minha Empresa LTDA" />
                  <ErrorMessage name="razaoSocial" component="div" className={styles.error} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="nomeFantasia">Nome Fantasia (Opcional)</label>
                  <Field id="nomeFantasia" type="text" name="nomeFantasia" placeholder="Nome Fantasia" />
                  <ErrorMessage name="nomeFantasia" component="div" className={styles.error} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="cnpj">CNPJ (somente números)</label>
                  <Field id="cnpj" type="text" name="cnpj" placeholder="12345678000199" />
                  <ErrorMessage name="cnpj" component="div" className={styles.error} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email da Empresa</label>
                  <Field id="email" name="email" type="email" placeholder="contato@empresa.com" />
                  <ErrorMessage name="email" component="div" className={styles.error} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="telefone">Telefone (Opcional)</label>
                  <Field id="telefone" type="text" name="telefone" placeholder="4733333333" />
                  <ErrorMessage name="telefone" component="div" className={styles.error} />
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>👤 Dados do Representante Legal</legend>
                <div className={styles.formGroup}>
                  <label htmlFor="nomeRepresentante">Nome Completo</label>
                  <Field id="nomeRepresentante" type="text" name="nomeRepresentante" placeholder="João da Silva" />
                  <ErrorMessage name="nomeRepresentante" component="div" className={styles.error} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="emailRepresentante">Email (será seu login)</label>
                  <Field id="emailRepresentante" name="emailRepresentante" type="email" placeholder="joao.silva@empresa.com" />
                  <ErrorMessage name="emailRepresentante" component="div" className={styles.error} />
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>🔐 Acesso ao Sistema</legend>
                <div className={styles.formGroup}>
                  <label htmlFor="senhaRepresentante">Defina uma Senha</label>
                  <Field id="senhaRepresentante" type="password" name="senhaRepresentante" placeholder="Mínimo 8 caracteres" />
                  <ErrorMessage name="senhaRepresentante" component="div" className={styles.error} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmSenha">Confirme a Senha</label>
                  <Field id="confirmSenha" name="confirmSenha" type="password" placeholder="Confirme a senha" />
                  <ErrorMessage name="confirmSenha" component="div" className={styles.error} />
                </div>
              </fieldset>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Cadastrando...
                  </>
                ) : (
                  '🚀 Criar Conta'
                )}
              </button>

              <div className={styles.divider}>ou</div>

              <div className={styles.linksContainer}>
                <p className={styles.loginLink}>
                  Já tem cadastro?
                  <Link to="/login">Fazer login</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;