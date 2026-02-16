/**
 * EmptyState - Componente para estados vazios
 * @description Exibe mensagem e ação quando não há dados
 */
import React from 'react';
import { Box, Paper, Typography, Button, Stack, Avatar, useTheme, alpha } from '@mui/material';
import { SentimentDissatisfied as EmptyIcon } from '@mui/icons-material';

const EmptyState = ({
  icon: Icon = EmptyIcon,
  title = 'Nenhum item encontrado',
  description,
  actionLabel,
  actionIcon,
  onAction,
  actionComponent,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: 'center',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: alpha(theme.palette.primary.main, 0.02),
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: 'primary.main',
          mx: 'auto',
          mb: 3,
        }}
      >
        <Icon sx={{ fontSize: 40 }} />
      </Avatar>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
          {description}
        </Typography>
      )}

      <Stack direction="row" spacing={2} justifyContent="center">
        {actionComponent}
        
        {actionLabel && onAction && (
          <Button
            variant="contained"
            startIcon={actionIcon}
            onClick={onAction}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default EmptyState;
