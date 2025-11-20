import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // ... (handleLogout) ...
  const handleLogout = () => {
    logout();
    navigate('/'); 
  };
  const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          {/* O link principal do Admin também pode ser o dashboard de propostas */}
          <Link to={isAdmin ? "/admin/propostas" : "/pracas"}>Communitex</Link>
        </div>
        <nav className={styles.navigation}>
          
          {/* --- Visão do ADMIN --- */}
          {isAdmin && (
            <>
              <Link to="/pracas">Ver Praças</Link>
              {/* 1. Novo link de Gerenciamento */}
              <Link to="/admin/propostas">Gerenciar Propostas</Link>
            </>
          )}

          {/* --- Visão do Usuário (Empresa) --- */}
          {!isAdmin && (
            <>
              <Link to="/pracas">Ver Praças</Link>
              <Link to="/minhas-propostas">Minhas Propostas</Link>
            </>
          )}
          
        </nav>
        <div className={styles.userMenu}>
          {/* ... (Menu do usuário e botão Sair) ... */}
          <span>Olá, {user?.username || 'Usuário'}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;