/**
 * Tema MUI centralizado da aplicação Communitex
 * @description Configuração do tema Material-UI com cores sustentáveis
 */
import { createTheme, alpha } from '@mui/material/styles';

// Paleta de cores principal
const PRIMARY = {
  main: '#2e9e57',
  light: '#5ccb82',
  dark: '#1d7a3d',
  contrastText: '#ffffff',
};

const SECONDARY = {
  main: '#1976d2',
  light: '#42a5f5',
  dark: '#1565c0',
};

// Criação do tema
const theme = createTheme({
  palette: {
    primary: PRIMARY,
    secondary: SECONDARY,
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
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
  },
});

// Estilos utilitários baseados no tema
export const gradients = {
  primary: `linear-gradient(135deg, ${PRIMARY.dark} 0%, ${PRIMARY.main} 100%)`,
  hero: `linear-gradient(135deg, ${PRIMARY.dark} 0%, ${PRIMARY.main} 50%, #38ef7d 100%)`,
};

export const shadows = {
  button: '0 8px 20px rgba(46, 158, 87, 0.3)',
  buttonHover: '0 12px 30px rgba(46, 158, 87, 0.4)',
  card: '0 4px 20px rgba(0,0,0,0.08)',
  cardHover: '0 8px 30px rgba(0,0,0,0.12)',
};

// Estilos de input reutilizáveis
export const inputStyles = {
  rounded: {
    '& .MuiOutlinedInput-root': { borderRadius: 2 },
  },
  filled: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: alpha('#000', 0.02),
      '&:hover': {
        bgcolor: alpha('#000', 0.04),
      },
    },
  },
};

export default theme;
