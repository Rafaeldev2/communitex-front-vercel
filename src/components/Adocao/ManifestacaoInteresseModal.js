import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon, Park as ParkIcon } from '@mui/icons-material';

const manifestacaoSchema = Yup.object().shape({
  proposta: Yup.string()
    .min(20, 'A proposta deve ter pelo menos 20 caracteres')
    .max(2000, 'A proposta não pode exceder 2000 caracteres')
    .required('A proposta é obrigatória'),
});

const ManifestacaoInteresseModal = ({
  isOpen,
  onClose,
  onSubmit,
  pracaNome,
  isLoading = false,
  error = null,
}) => {
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values.proposta);
      setSubmitting(false);
    } catch (err) {
      console.error('Erro no submit:', err);
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ParkIcon color="primary" />
          Manifestar Interesse - {pracaNome}
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Formik
        initialValues={{ proposta: '' }}
        validationSchema={manifestacaoSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <DialogContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Explique como sua empresa planeja cuidar da praça, quais melhorias pretende realizar e o cronograma.
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={6}
                name="proposta"
                label="Descreva sua proposta de adoção *"
                placeholder="Ex: Nossa empresa pretende realizar manutenção mensal incluindo jardinagem, limpeza e pequenos reparos. Também instalaremos bancos e lixeiras novas. Estimamos 6 meses para conclusão das obras iniciais..."
                value={values.proposta}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.proposta && Boolean(errors.proposta)}
                helperText={(touched.proposta && errors.proposta) || `${values.proposta.length} / 2000 caracteres`}
              />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || isLoading}
                startIcon={isSubmitting || isLoading ? <CircularProgress size={20} color="inherit" /> : <ParkIcon />}
              >
                {isSubmitting || isLoading ? 'Enviando...' : 'Enviar Manifestação'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ManifestacaoInteresseModal;
