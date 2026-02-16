import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
} from '@mui/icons-material';

const drawerWidth = 260;

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');
  const isEmpresa = user && user.roles && user.roles.includes('ROLE_EMPRESA');
  const isUser = user && user.roles && user.roles.includes('ROLE_USER');

  const menuItems = [
    {
      text: 'Ver Praças',
      icon: <ParkIcon />,
      path: '/pracas',
      show: true,
    },
    {
      text: 'Denúncias Comunitárias',
      icon: <ReportIcon />,
      path: '/denuncias',
      show: true,
    },
    {
      text: 'Minhas Propostas',
      icon: <AssignmentIcon />,
      path: '/minhas-propostas',
      show: isEmpresa,
    },
    {
      text: 'Gerenciar Propostas',
      icon: <AdminIcon />,
      path: '/admin/propostas',
      show: isAdmin,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header do Drawer */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1d7a3d 0%, #2e9e57 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            🌿 Communitex
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      {/* Informações do Usuário */}
      <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.username || user?.sub || 'Usuário'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {isAdmin ? 'Administrador' : isEmpresa ? 'Empresa' : 'Usuário'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Menu de Navegação */}
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
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
                    minWidth: 40,
                    color: location.pathname === item.path ? 'inherit' : 'primary.main',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <Divider />

      {/* Botão de Logout */}
      <List sx={{ px: 1, pb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: 'error.main',
              '&:hover': {
                bgcolor: 'error.lighter',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Sair"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
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
            {location.pathname === '/pracas' && 'Praças'}
            {location.pathname === '/denuncias' && 'Denúncias Comunitárias'}
            {location.pathname === '/minhas-propostas' && 'Minhas Propostas'}
            {location.pathname.includes('/admin') && 'Administração'}
            {location.pathname.includes('/pracas/') && 'Detalhes da Praça'}
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
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer Desktop (permanente) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
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
          p: location.pathname === '/denuncias' ? 0 : 3,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
          bgcolor: location.pathname === '/denuncias' ? 'transparent' : 'grey.50',
          minHeight: '100vh',
          mt: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;