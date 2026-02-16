import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

const getStatusConfig = (status) => {
  switch (status) {
    case 'PROPOSTA':
      return { label: 'Proposta', color: 'info' };
    case 'EM_ANALISE':
      return { label: 'Em Análise', color: 'warning' };
    case 'APROVADA':
      return { label: 'Aprovada', color: 'success' };
    case 'REJEITADA':
      return { label: 'Rejeitada', color: 'error' };
    case 'CONCLUIDA':
      return { label: 'Concluída', color: 'success' };
    case 'FINALIZADA':
      return { label: 'Finalizada', color: 'default' };
    default:
      return { label: status || 'N/A', color: 'default' };
  }
};

const MinhasPropostas = () => {
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPropostas = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/adocao/minhas-propostas');
        const propostasOrdenadas = response.data.sort((a, b) =>
          new Date(b.dataRegistro) - new Date(a.dataRegistro)
        );
        setPropostas(propostasOrdenadas);
        setError('');
      } catch (err) {
        console.error("Erro ao buscar propostas:", err);
        setError('Erro ao carregar suas propostas de interesse.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropostas();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DescriptionIcon color="primary" /> Minhas Propostas
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Acompanhe suas propostas de interesse em adoção de praças.
      </Typography>

      {propostas.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary" gutterBottom>
              Sua empresa ainda não enviou propostas de interesse.
            </Typography>
            <Button component={Link} to="/pracas" variant="contained" sx={{ mt: 2 }}>
              Ver praças disponíveis
            </Button>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Praça</strong></TableCell>
                <TableCell><strong>Data da Proposta</strong></TableCell>
                <TableCell><strong>Proposta</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propostas.map(proposta => {
                const statusConfig = getStatusConfig(proposta.status);
                return (
                  <TableRow key={proposta.id} hover>
                    <TableCell>
                      <Typography fontWeight={600}>
                        {proposta.nomePraca || 'Praça não disponível'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(proposta.dataRegistro).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Tooltip title={proposta.proposta} arrow>
                        <Typography variant="body2" noWrap>
                          {proposta.proposta.length > 100
                            ? `${proposta.proposta.substring(0, 100)}...`
                            : proposta.proposta}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip label={statusConfig.label} color={statusConfig.color} size="small" />
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/pracas/${proposta.pracaId}`}
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        Ver Praça
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MinhasPropostas;