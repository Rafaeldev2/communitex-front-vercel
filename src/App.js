import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login/Login';
import PracaList from './components/Pracas/PracaList';
import PracaDetail from './components/Pracas/PracaDetail';
import PropostaAdocaoForm from './components/Adocao/PropostaAdocaoForm';
import MinhasPropostas from './components/Adocao/MinhasPropostas';
import ManifestacaoInteresse from './components/Adocao/ManifestacaoInteresse';
import GerenciamentoPropostas from './components/Admin/GerenciamentoPropostas';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import RegisterPessoaFisica from './components/Register/RegisterPessoaFisica';

// Componentes de Rota
import AdminRoute from './components/Auth/AdminRoute';
import UserRoute from './components/Auth/UserRoute';
import PracaForm from './components/Pracas/PracaForm';
import { CommunityMap, IssueList } from './components/CommunityMap';


// Componente de Rota Protegida (sem alterações)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

// Componente de Dashboard com tema verde sustentável
const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();

  const navButtonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none'
  };

  // Layout com header verde sustentável
  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #1d7a3d 0%, #2e9e57 100%)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(46, 158, 87, 0.15)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      }}>
        <span style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🌿 Communitex - Bem-vindo, {user?.sub}
        </span>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a 
            href="/denuncias" 
            style={navButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            📍 Denúncias
          </a>
        <button onClick={logout} style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: 'white',
          cursor: 'pointer',
          fontWeight: '600',
          padding: '0.6rem 1.2rem',
          borderRadius: '6px',
          fontSize: '0.95rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(0)';
        }}>
          ← Sair
        </button>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>


          {/* === ROTAS PÚBLICAS === */}
          {/* 2. Landing Page é a nova rota "/" */}
          <Route path="/" element={<Landing />} />

          {/* 3. Login ganha sua própria rota */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          
          <Route path="/register/pessoa-fisica" element={<RegisterPessoaFisica />} />


          {/* === ROTAS PROTEGIDAS (Usuário Comum e Admin) === */}
          <Route
            path="/pracas"
            element={<ProtectedRoute><AppLayout><PracaList /></AppLayout></ProtectedRoute>}
          />
          <Route
            path="/pracas/:id"
            element={<ProtectedRoute><AppLayout><PracaDetail /></AppLayout></ProtectedRoute>}
          />
          <Route
            path="/pracas/:id/manifestar-interesse"
            element={<ProtectedRoute><AppLayout><ManifestacaoInteresse /></AppLayout></ProtectedRoute>}
          />
          <Route
            path="/pracas/:id/propor-adocao"
            element={<ProtectedRoute><AppLayout><PropostaAdocaoForm /></AppLayout></ProtectedRoute>}
          />
          <Route
            path="/minhas-propostas"
            element={<ProtectedRoute><AppLayout><MinhasPropostas /></AppLayout></ProtectedRoute>}
          />
          <Route
            path="/dashboard"
            element={<Navigate to="/pracas" replace />}
          />

          {/* === ROTAS DE ADMIN === */}
          <Route
            path="/admin/pracas/nova"
            element={<AdminRoute><AppLayout><PracaForm /></AppLayout></AdminRoute>}
          />
          <Route
            path="/admin/propostas"
            element={<AdminRoute><AppLayout><GerenciamentoPropostas /></AppLayout></AdminRoute>}
          />

          {/* === ROTAS PARA ROLE_USER === */}
          <Route
            path="/user/pracas/nova"
            element={<UserRoute><AppLayout><PracaForm /></AppLayout></UserRoute>}
          />

          {/* === ROTA DE DENÚNCIAS COMUNITÁRIAS === */}
          <Route
            path="/denuncias"
            element={<ProtectedRoute><CommunityMap /></ProtectedRoute>}
          />
          <Route
            path="/denuncias/lista"
            element={<ProtectedRoute><IssueList /></ProtectedRoute>}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;