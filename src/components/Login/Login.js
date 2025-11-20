import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);

    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Usuário ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Painel Lateral com Informações */}
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelContent}>
          <h1>🌿 Communitex</h1>
          <p className={styles.sidePanelTitle}>Gestão de Adoção de Praças</p>
          
          <div className={styles.benefitsContainer}>
            <h3>Por que participar?</h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🌱</span>
                <span>Transforme espaços públicos</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🤝</span>
                <span>Ganhe visibilidade para sua marca</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>🌍</span>
                <span>Contribua com a sustentabilidade</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.icon}>👥</span>
                <span>Conecte-se com a comunidade</span>
              </div>
            </div>
          </div>

          <p className={styles.sideFooter}>
            Ainda não tem conta?<br/>
            <Link to="/register" className={styles.sideLink}>Cadastre-se agora →</Link>
          </p>
        </div>
      </div>

      {/* Formulário de Login */}
      <div className={styles.loginSection}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h2>Bem-vindo!</h2>
            <p>Acesse sua conta para começar</p>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <span className={styles.errorIcon}>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="username">
              <span className={styles.inputIcon}>👤</span>
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="seu_usuario"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <span className={styles.inputIcon}>🔐</span>
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Entrando...
              </>
            ) : (
              '🔓 Entrar'
            )}
          </button>

          <div className={styles.divider}>ou</div>

          <div className={styles.linksContainer}>
            <p className={styles.registerLink}>
              Não tem cadastro ainda?
              <Link to="/register">Cadastro de Empresa</Link>
            </p>

            <p className={styles.homeLink}>
              <Link to="/">← Voltar para a página inicial</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;