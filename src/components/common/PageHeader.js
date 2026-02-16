/**
 * PageHeader - Componente de header reutilizável com gradiente
 * @description Header com gradiente verde padrão da aplicação
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Stack,
  useTheme,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  backLink,
  backLabel = 'Voltar',
  actions,
  chip,
  children,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        py: { xs: 3, md: 4 },
        px: 3,
        borderRadius: 3,
        mx: 3,
        mt: 3,
        mb: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Botão Voltar */}
        {backLink && (
          <Button
            component={Link}
            to={backLink}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'white',
              mb: 2,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            {backLabel}
          </Button>
        )}

        {/* Conteúdo principal */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { md: 'center' },
            gap: 2,
          }}
        >
          {/* Título e ícone */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {Icon && (
              <Avatar
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  width: 64,
                  height: 64,
                }}
              >
                {typeof Icon === 'function' ? <Icon sx={{ fontSize: 36 }} /> : Icon}
              </Avatar>
            )}
            <Box>
              <Typography variant="h4" fontWeight={800}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Actions ou Chip */}
          {actions && <Stack direction="row" spacing={2}>{actions}</Stack>}
          {chip}
        </Box>

        {/* Children (conteúdo adicional) */}
        {children}
      </Box>
    </Paper>
  );
};

export default PageHeader;
