import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './RegisterPessoaFisica.module.css';

const RegisterPessoaFisicaSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .required('Nome é obrigatório'),
  
  cpf: Yup.string()
    .matches(/^[0-9]{11}$/, 'CPF deve conter 11 números (sem pontos ou traços)')
    .required('CPF é obrigatório'),
  
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  
  telefone: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Telefone deve conter 10 ou 11 números')
    .required('Telefone é obrigatório'),
  
  endereco: Yup.string()
    .min(5, 'Endereço deve ter no mínimo 5 caracteres')
    .required('Endereço é obrigatório'),
  
  bairro: Yup.string()
    .required('Bairro é obrigatório'),
  
  cidade: Yup.string()
    .required('Cidade é obrigatória'),
  
  estado: Yup.string()
    .length(2, 'Estado deve ter 2 caracteres (ex: SC)')
    .required('Estado é obrigatório'),
  
  cep: Yup.string()
    .matches(/^[0-9]{8}$/, 'CEP deve conter 8 números (sem traço)')
    .required('CEP é obrigatório'),
  
  senha: Yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Senha deve conter maiúsculas, minúsculas, números e caracteres especiais'
    )
    .required('Senha é obrigatória'),
  
  confirmSenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
  
  termos: Yup.boolean()
    .oneOf([true], 'Você deve aceitar os termos de uso'),
});

const RegisterPessoaFisica = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('');
    
    const pessoaFisicaDTO = {
      nome: values.nome,
      cpf: values.cpf,
      email: values.email,
      telefone: values.telefone,
      endereco: values.endereco,
      bairro: values.bairro,
      cidade: values.cidade,
      estado: values.estado,
      cep: values.cep,
      senha: values.senha,
    };

    try {
      await api.post('/api/pessoas-fisicas', pessoaFisicaDTO);
      
      setSubmitting(false);
      
      alert('Cadastro realizado com sucesso! Você já pode fazer o login com seu email e senha.');
      navigate('/login');

    } catch (err) {
      console.error('Erro no cadastro:', err);
      setSubmitting(false);
      
      if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const mensagens = err.response.data.errors
          .map(e => e.message)
          .join(', ');
        setServerError(mensagens);
      } else {
        setServerError('Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelContent}>
          <h1>🌿 Communitex</h1>
          <p className={styles.sidePanelTitle}>Transformando cidades através de praças sustentáveis</p>
          
          <div className={styles.benefitsContainer}>
            <h3>Por que se cadastrar?</h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>📋</span>
                <span>Cadastre praças de sua comunidade</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>📊</span>
                <span>Acompanhe o interesse das empresas</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🌍</span>
                <span>Participe da transformação urbana</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🤝</span>
                <span>Conecte-se com empresas parceiras</span>
              </div>
            </div>
          </div>

          <div className={styles.sideFooter}>
            <p>Já tem uma conta?<br/><Link to="/login" className={styles.sideLink}>Faça login →</Link></p>
            <p>É uma empresa?<br/><Link to="/register" className={styles.sideLink}>Cadastre-se aqui →</Link></p>
          </div>
        </div>
      </div>

      {/* SEÇÃO FORM */}
      <div className={styles.registerSection}>
        <div className={styles.header}>
          <h2>Cadastro de Pessoa Física</h2>
          <p>Cadastre-se para participar da plataforma e cadastrar praças para adoção</p>
        </div>

        {serverError && (
          <div className={styles.errorBox}>
            <span className={styles.errorIcon}>⚠️</span>
            <p>{serverError}</p>
          </div>
        )}

        <Formik
          initialValues={{
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            endereco: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            senha: '',
            confirmSenha: '',
            termos: false,
          }}
          validationSchema={RegisterPessoaFisicaSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form className={styles.registerForm}>
              {/* Seção: Dados Pessoais */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Dados Pessoais</legend>

                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome Completo *</label>
                  <Field
                    id="nome"
                    type="text"
                    name="nome"
                    placeholder="João da Silva Santos"
                    className={touched.nome && errors.nome ? styles.inputError : ''}
                  />
                  <ErrorMessage name="nome" component="div" className={styles.error} />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cpf">CPF (somente números) *</label>
                    <Field
                      id="cpf"
                      type="text"
                      name="cpf"
                      placeholder="12345678910"
                      maxLength="11"
                      className={touched.cpf && errors.cpf ? styles.inputError : ''}
                    />
                    <ErrorMessage name="cpf" component="div" className={styles.error} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="telefone">Telefone (com DDD) *</label>
                    <Field
                      id="telefone"
                      type="text"
                      name="telefone"
                      placeholder="4733333333"
                      maxLength="11"
                      className={touched.telefone && errors.telefone ? styles.inputError : ''}
                    />
                    <ErrorMessage name="telefone" component="div" className={styles.error} />
                  </div>
                </div>
              </fieldset>

              {/* Seção: Dados de Contato */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Dados de Contato</legend>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email (será seu login) *</label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="joao@email.com"
                    className={touched.email && errors.email ? styles.inputError : ''}
                  />
                  <ErrorMessage name="email" component="div" className={styles.error} />
                </div>
              </fieldset>

              {/* Seção: Endereço */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Endereço</legend>

                <div className={styles.formGroup}>
                  <label htmlFor="endereco">Endereço (Rua, Avenida, etc.) *</label>
                  <Field
                    id="endereco"
                    type="text"
                    name="endereco"
                    placeholder="Rua Principal, 123"
                    className={touched.endereco && errors.endereco ? styles.inputError : ''}
                  />
                  <ErrorMessage name="endereco" component="div" className={styles.error} />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="bairro">Bairro *</label>
                    <Field
                      id="bairro"
                      type="text"
                      name="bairro"
                      placeholder="Centro"
                      className={touched.bairro && errors.bairro ? styles.inputError : ''}
                    />
                    <ErrorMessage name="bairro" component="div" className={styles.error} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cidade">Cidade *</label>
                    <Field
                      id="cidade"
                      type="text"
                      name="cidade"
                      placeholder="Florianópolis"
                      className={touched.cidade && errors.cidade ? styles.inputError : ''}
                    />
                    <ErrorMessage name="cidade" component="div" className={styles.error} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="estado">Estado (UF) *</label>
                    <Field
                      id="estado"
                      type="text"
                      name="estado"
                      placeholder="SC"
                      maxLength="2"
                      className={touched.estado && errors.estado ? styles.inputError : ''}
                    />
                    <ErrorMessage name="estado" component="div" className={styles.error} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cep">CEP (somente números) *</label>
                    <Field
                      id="cep"
                      type="text"
                      name="cep"
                      placeholder="88000000"
                      maxLength="8"
                      className={touched.cep && errors.cep ? styles.inputError : ''}
                    />
                    <ErrorMessage name="cep" component="div" className={styles.error} />
                  </div>
                </div>
              </fieldset>

              {/* Seção: Acesso */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Acesso ao Sistema</legend>

                <div className={styles.formGroup}>
                  <label htmlFor="senha">Senha *</label>
                  <div className={styles.passwordInputWrapper}>
                    <Field
                      id="senha"
                      type={showPassword ? 'text' : 'password'}
                      name="senha"
                      placeholder="Mínimo 8 caracteres"
                      className={touched.senha && errors.senha ? styles.inputError : ''}
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️‍🗨️' : '👁️'}
                    </button>
                  </div>
                  <div className={styles.passwordHint}>
                    A senha deve conter maiúsculas, minúsculas, números e caracteres especiais
                  </div>
                  <ErrorMessage name="senha" component="div" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmSenha">Confirme a Senha *</label>
                  <Field
                    id="confirmSenha"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmSenha"
                    placeholder="Repita a senha"
                    className={touched.confirmSenha && errors.confirmSenha ? styles.inputError : ''}
                  />
                  <ErrorMessage name="confirmSenha" component="div" className={styles.error} />
                </div>
              </fieldset>

              {/* Seção: Termos */}
              <div className={styles.termsGroup}>
                <label className={styles.termsLabel}>
                  <Field
                    type="checkbox"
                    name="termos"
                    className={styles.termsCheckbox}
                  />
                  <span>Aceito os <Link to="#" onClick={(e) => e.preventDefault()}>termos de uso</Link> e a <Link to="#" onClick={(e) => e.preventDefault()}>política de privacidade</Link></span>
                </label>
                <ErrorMessage name="termos" component="div" className={styles.error} />
              </div>

              {/* Botão Enviar */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
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

              {/* Link para Login/Register Empresa */}
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

export default RegisterPessoaFisica;
