import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PROTECTED_ROUTES, ADMIN_ROUTES, PUBLIC_ROUTES } from '../../routes/paths';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Park as ParkIcon,
  Assignment as AssignmentIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  ReportProblem as ReportIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

const drawerWidthExpanded = 260;
const drawerWidthCollapsed = 72;

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  const drawerWidth = drawerCollapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerCollapse = () => {
    setDrawerCollapsed(!drawerCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');
  const isEmpresa = user && user.roles && user.roles.includes('ROLE_EMPRESA');

  const menuItems = [
    {
      text: 'Ver Praças',
      icon: <ParkIcon />,
      path: PROTECTED_ROUTES.PRACAS,
      show: true,
    },
    {
      text: 'Denúncias Comunitárias',
      icon: <ReportIcon />,
      path: PROTECTED_ROUTES.DENUNCIAS,
      show: true,
    },
    {
      text: 'Minhas Propostas',
      icon: <AssignmentIcon />,
      path: PROTECTED_ROUTES.MINHAS_PROPOSTAS,
      show: isEmpresa,
    },
    {
      text: 'Gerenciar Propostas',
      icon: <AdminIcon />,
      path: ADMIN_ROUTES.PROPOSTAS,
      show: isAdmin,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // Função para obter o título da página baseado na rota
  const pageTitle = useMemo(() => {
    const path = location.pathname;
    
    // Rotas exatas
    if (path === PROTECTED_ROUTES.PRACAS) return 'Praças';
    if (path === PROTECTED_ROUTES.DENUNCIAS) return 'Denúncias Comunitárias';
    if (path === PROTECTED_ROUTES.DENUNCIAS_LISTA) return 'Lista de Denúncias';
    if (path === PROTECTED_ROUTES.MINHAS_PROPOSTAS) return 'Minhas Propostas';
    if (path === ADMIN_ROUTES.PROPOSTAS) return 'Gerenciar Propostas';
    if (path === ADMIN_ROUTES.NOVA_PRACA) return 'Nova Praça';
    
    // Rotas dinâmicas
    if (path.startsWith('/pracas/') && path.includes('/manifestar-interesse')) return 'Manifestar Interesse';
    if (path.startsWith('/pracas/') && path.includes('/propor-adocao')) return 'Propor Adoção';
    if (path.startsWith('/pracas/')) return 'Detalhes da Praça';
    if (path.startsWith('/admin')) return 'Administração';
    
    return 'Communitex';
  }, [location.pathname]);

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header do Drawer */}
      <Box
        sx={{
          p: drawerCollapsed ? 1 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: drawerCollapsed ? 'center' : 'space-between',
          background: 'linear-gradient(135deg, #1d7a3d 0%, #2e9e57 100%)',
          color: 'white',
          minHeight: 64,
        }}
      >
        {!drawerCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              🌿 Communitex
            </Typography>
          </Box>
        )}
        {drawerCollapsed && (
          <Typography sx={{ fontSize: 24 }}>🌿</Typography>
        )}
        {isMobile ? (
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton 
            onClick={handleDrawerCollapse}
            sx={{ 
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            {drawerCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Box>

      {/* Informações do Usuário */}
      <Box sx={{ p: drawerCollapsed ? 1 : 2, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: drawerCollapsed ? 'center' : 'flex-start' }}>
          <Tooltip title={drawerCollapsed ? (user?.username || user?.sub || 'Usuário') : ''} placement="right">
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              <PersonIcon />
            </Avatar>
          </Tooltip>
          {!drawerCollapsed && (
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {user?.username || user?.sub || 'Usuário'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isAdmin ? 'Administrador' : isEmpresa ? 'Empresa' : 'Usuário'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Menu de Navegação */}
      <List sx={{ flex: 1, px: drawerCollapsed ? 0.5 : 1 }}>
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={drawerCollapsed ? item.text : ''} placement="right">
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    borderRadius: 2,
                    justifyContent: drawerCollapsed ? 'center' : 'flex-start',
                    px: drawerCollapsed ? 2 : 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                      '&:hover': {
                        bgcolor: 'primary.main',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: drawerCollapsed ? 0 : 40,
                      mr: drawerCollapsed ? 0 : 'auto',
                      color: location.pathname === item.path ? 'inherit' : 'primary.main',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!drawerCollapsed && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
      </List>

      <Divider />

      {/* Botão de Logout */}
      <List sx={{ px: drawerCollapsed ? 0.5 : 1, pb: 1 }}>
        <ListItem disablePadding>
          <Tooltip title={drawerCollapsed ? 'Sair' : ''} placement="right">
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                justifyContent: drawerCollapsed ? 'center' : 'flex-start',
                color: 'error.main',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: drawerCollapsed ? 0 : 40, color: 'error.main' }}>
                <LogoutIcon />
              </ListItemIcon>
              {!drawerCollapsed && (
                <ListItemText
                  primary="Sair"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: 'linear-gradient(135deg, #1d7a3d 0%, #2e9e57 100%)',
          boxShadow: '0 4px 12px rgba(46, 158, 87, 0.15)',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Bem-vindo, {user?.username || user?.sub || 'Usuário'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidthExpanded,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer Desktop (retrátil) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: location.pathname === PROTECTED_ROUTES.DENUNCIAS ? 0 : 3,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
          bgcolor: location.pathname === PROTECTED_ROUTES.DENUNCIAS ? 'transparent' : 'grey.50',
          minHeight: '100vh',
          mt: '64px',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;