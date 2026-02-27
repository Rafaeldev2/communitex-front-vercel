import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme
import theme from './theme';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import AppLayout from './components/Layout/AppLayout';

// Pages - Auth
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RegisterPessoaFisica from './components/Register/RegisterPessoaFisica';
import { Landing } from './components/Landing/Landing';

// Pages - Praças
import PracaList from './components/Pracas/PracaList';
import PracaDetail from './components/Pracas/PracaDetail';
import PracaForm from './components/Pracas/PracaForm';

// Pages - Adoção
import PropostaAdocaoForm from './components/Adocao/PropostaAdocaoForm';
import MinhasPropostas from './components/Adocao/MinhasPropostas';
import ManifestacaoInteresse from './components/Adocao/ManifestacaoInteresse';

// Pages - Admin
import GerenciamentoPropostas from './components/Admin/GerenciamentoPropostas';

// Pages - Community Map
import { CommunityMap, IssueList } from './components/CommunityMap';

// Route Guards
import AdminRoute from './components/Auth/AdminRoute';
import UserRoute from './components/Auth/UserRoute';

/**
 * Componente de Rota Protegida
 * Redireciona para landing se não autenticado
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

/**
 * Wrapper de layout para rotas protegidas
 */
const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

/**
 * Componente principal da aplicação
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* === ROTAS PÚBLICAS === */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/pessoa-fisica" element={<RegisterPessoaFisica />} />

            {/* === ROTAS PROTEGIDAS === */}
            <Route path="/pracas" element={<ProtectedLayout><PracaList /></ProtectedLayout>} />
            <Route path="/pracas/:id" element={<ProtectedLayout><PracaDetail /></ProtectedLayout>} />
            <Route path="/pracas/:id/manifestar-interesse" element={<ProtectedLayout><ManifestacaoInteresse /></ProtectedLayout>} />
            <Route path="/pracas/:id/propor-adocao" element={<ProtectedLayout><PropostaAdocaoForm /></ProtectedLayout>} />
            <Route path="/minhas-propostas" element={<ProtectedLayout><MinhasPropostas /></ProtectedLayout>} />
            <Route path="/dashboard" element={<Navigate to="/pracas" replace />} />

            {/* === ROTAS DE ADMIN === */}
            <Route path="/admin/pracas/nova" element={<AdminRoute><AppLayout><PracaForm /></AppLayout></AdminRoute>} />
            <Route path="/admin/propostas" element={<AdminRoute><AppLayout><GerenciamentoPropostas /></AppLayout></AdminRoute>} />

            {/* === ROTAS PARA ROLE_USER === */}
            <Route path="/user/pracas/nova" element={<UserRoute><AppLayout><PracaForm /></AppLayout></UserRoute>} />

            {/* === DENÚNCIAS COMUNITÁRIAS === */}
            <Route path="/denuncias" element={<ProtectedLayout><CommunityMap /></ProtectedLayout>} />
            <Route path="/denuncias/lista" element={<ProtectedLayout><IssueList /></ProtectedLayout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;