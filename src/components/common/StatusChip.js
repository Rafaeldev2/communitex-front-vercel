/**
 * StatusChip - Chip de status reutilizável
 * @description Exibe chips de status com cores padronizadas
 */
import React from 'react';
import { Chip } from '@mui/material';

const StatusChip = ({ 
  status, 
  config, 
  size = 'small',
  icon,
  sx = {} 
}) => {
  if (!config) return null;
  
  return (
    <Chip
      icon={icon}
      label={config.label || status}
      color={config.color || 'default'}
      size={size}
      sx={{
        fontWeight: 600,
        ...sx,
      }}
    />
  );
};

export default StatusChip;
