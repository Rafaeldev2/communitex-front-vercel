import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Park as ParkIcon,
  LightbulbOutlined as LightbulbIcon,
  CheckCircleOutline as CheckIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material';

const manifestacaoSchema = Yup.object().shape({
  proposta: Yup.string()
    .min(20, 'A proposta deve ter pelo menos 20 caracteres')
    .max(2000, 'A proposta não pode exceder 2000 caracteres')
    .required('A proposta é obrigatória'),
});

const ManifestacaoInteresse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pracaNome] = useState(location.state?.pracaNome || 'Praça');

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('');
    setLoading(true);

    try {
      const interesseDTO = {
        pracaId: parseInt(id),
        proposta: values.proposta,
      };

      await api.post('/api/adocao/interesse', interesseDTO);

      navigate(`/pracas/${id}`, { 
        state: { successMessage: 'Manifestação de interesse enviada com sucesso!' } 
      });
    } catch (err) {
      console.error('Erro ao manifestar interesse:', err);
      setServerError(err.response?.data?.message || 'Erro ao enviar manifestação.');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const tips = [
    'Seja específico sobre as melhorias',
    'Mencione cronograma realista',
    'Descreva estrutura de manutenção',
    'Inclua equipe responsável',
  ];

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/pracas/${id}`)} sx={{ mb: 3 }}>
        Voltar
      </Button>

      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ParkIcon color="primary" /> Manifestar Interesse - {pracaNome}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <CardContent>
              <Typography>
                📋 Preencha os detalhes de sua proposta para adoção dessa praça. 
                Seja claro e conciso sobre como sua empresa planeja cuidar do espaço.
              </Typography>
            </CardContent>
          </Card>

          {serverError && (
            <Alert severity="error" sx={{ mb: 3 }}>{serverError}</Alert>
          )}

          <Card>
            <CardContent>
              <Formik
                initialValues={{ proposta: '' }}
                validationSchema={manifestacaoSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <Typography variant="h6" gutterBottom>📝 Descrição do Projeto *</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Descreva como sua empresa planeja cuidar da praça, quais melhorias pretende realizar e o cronograma.
                    </Typography>

                    <TextField
                      fullWidth
                      multiline
                      rows={8}
                      name="proposta"
                      placeholder="Ex: Nossa empresa pretende realizar manutenção mensal incluindo jardinagem, limpeza e pequenos reparos..."
                      value={values.proposta}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.proposta && Boolean(errors.proposta)}
                      helperText={(touched.proposta && errors.proposta) || `${values.proposta.length} / 2000 caracteres`}
                    />

                    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                      <Button variant="outlined" onClick={() => navigate(`/pracas/${id}`)} disabled={isSubmitting}>
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || loading}
                        startIcon={isSubmitting || loading ? <CircularProgress size={20} color="inherit" /> : <ParkIcon />}
                      >
                        {isSubmitting || loading ? 'Enviando...' : 'Enviar Manifestação'}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LightbulbIcon color="primary" /> Dicas para sua proposta
              </Typography>
              <List dense>
                {tips.map((tip, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HelpIcon color="primary" /> Dúvidas?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entre em contato conosco através do email contato@communitex.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManifestacaoInteresse;
