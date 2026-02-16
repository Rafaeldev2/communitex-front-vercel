// /src/components/Admin/GerenciamentoPropostas.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from '@mui/icons-material';

const getStatusConfig = (status) => {
  switch (status) {
    case 'PENDENTE':
      return { label: 'Pendente', color: 'warning' };
    case 'APROVADA':
      return { label: 'Aprovada', color: 'success' };
    case 'REPROVADA':
      return { label: 'Reprovada', color: 'error' };
    default:
      return { label: status, color: 'default' };
  }
};

const GerenciamentoPropostas = () => {
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ open: false, propostaId: null, novoStatus: '' });

  const fetchPropostas = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/propostas');
      const propostasOrdenadas = response.data.sort((a, b) =>
        new Date(b.dataProposta) - new Date(a.dataProposta)
      );
      setPropostas(propostasOrdenadas);
      setError('');
    } catch (err) {
      console.error("Erro ao buscar propostas:", err);
      setError('Erro ao carregar o painel de propostas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPropostas();
  }, [fetchPropostas]);

  const handleOpenConfirm = (propostaId, novoStatus) => {
    setConfirmDialog({ open: true, propostaId, novoStatus });
  };

  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, propostaId: null, novoStatus: '' });
  };

  const handleUpdateStatus = async () => {
    const { propostaId, novoStatus } = confirmDialog;
    try {
      await api.put(`/api/propostas/${propostaId}/status`, { status: novoStatus });
      setPropostas(prevPropostas =>
        prevPropostas.map(proposta =>
          proposta.id === propostaId ? { ...proposta, status: novoStatus } : proposta
        )
      );
      handleCloseConfirm();
    } catch (err) {
      console.error(`Erro ao atualizar proposta:`, err);
      alert(`Não foi possível atualizar a proposta. Tente novamente.`);
    }
  };

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
        <AdminIcon color="primary" /> Gerenciamento de Propostas
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Analise e responda às solicitações de adoção.
      </Typography>

      {propostas.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              Nenhuma proposta pendente ou registrada no momento.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Praça</strong></TableCell>
                <TableCell><strong>Empresa Proponente</strong></TableCell>
                <TableCell><strong>Data da Proposta</strong></TableCell>
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
                      {proposta.praçaNome || `Praça (ID ${proposta.praçaId})`}
                    </TableCell>
                    <TableCell>
                      {proposta.empresaNome || `Empresa (ID ${proposta.empresaId})`}
                    </TableCell>
                    <TableCell>
                      {new Date(proposta.dataProposta).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Chip label={statusConfig.label} color={statusConfig.color} size="small" />
                    </TableCell>
                    <TableCell>
                      {proposta.status === 'PENDENTE' ? (
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            color="success"
                            variant="contained"
                            startIcon={<ApproveIcon />}
                            onClick={() => handleOpenConfirm(proposta.id, 'APROVADA')}
                          >
                            Aprovar
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            startIcon={<RejectIcon />}
                            onClick={() => handleOpenConfirm(proposta.id, 'REPROVADA')}
                          >
                            Reprovar
                          </Button>
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.secondary">N/A</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={confirmDialog.open} onClose={handleCloseConfirm}>
        <DialogTitle>
          {confirmDialog.novoStatus === 'APROVADA' ? 'Aprovar Proposta' : 'Reprovar Proposta'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja {confirmDialog.novoStatus === 'APROVADA' ? 'aprovar' : 'reprovar'} esta proposta?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancelar</Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            color={confirmDialog.novoStatus === 'APROVADA' ? 'success' : 'error'}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GerenciamentoPropostas;