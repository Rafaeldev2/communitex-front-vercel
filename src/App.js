import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import AppLayout from './components/Layout/AppLayout';

// Componentes de Rota
import AdminRoute from './components/Auth/AdminRoute';
import UserRoute from './components/Auth/UserRoute';
import PracaForm from './components/Pracas/PracaForm';
import { CommunityMap, IssueList } from './components/CommunityMap';

// Tema MUI personalizado com cores sustentáveis
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e9e57',
      light: '#5ccb82',
      dark: '#1d7a3d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    error: {
      main: '#d32f2f',
      lighter: '#ffebee',
    },
    warning: {
      main: '#ffc107',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Componente de Rota Protegida
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

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
              element={<ProtectedRoute><AppLayout><CommunityMap /></AppLayout></ProtectedRoute>}
            />
            <Route
              path="/denuncias/lista"
              element={<ProtectedRoute><AppLayout><IssueList /></AppLayout></ProtectedRoute>}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;