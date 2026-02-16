import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Stack,
  Divider,
  Chip,
  Avatar,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Handshake as HandshakeIcon,
  Park as ParkIcon,
  LocationOn as LocationIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  Description as DescriptionIcon,
  Gavel as GavelIcon,
  Assignment as AssignmentIcon,
  Build as BuildIcon,
  CleaningServices as CleaningIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as CheckIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowForward as ArrowForwardIcon,
  Public as PublicIcon,
  EnergySavingsLeaf as EcoIcon,
  Groups as GroupsIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Nature as NatureIcon,
} from '@mui/icons-material';

const Landing = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const aboutCards = [
    {
      icon: <HandshakeIcon />,
      title: 'Parceria Público-Privada',
      description: 'Um programa de cooperação entre a prefeitura e empresas ou pessoas físicas para manter e revitalizar espaços públicos.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <ParkIcon />,
      title: 'Impacto Ambiental',
      description: 'Contribua para a preservação de áreas verdes, limpeza, jardinagem e manutenção de espaços que beneficiam toda a comunidade.',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
    {
      icon: <LocationIcon />,
      title: 'Identidade da Marca',
      description: 'Ganhe visibilidade! Adotantes têm direito de instalar uma placa de identificação no espaço de acordo com as normas do programa.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];

  const steps = [
    { icon: <PersonAddIcon />, title: 'Cadastre-se', description: 'Crie sua conta como empresa ou pessoa física em minutos.' },
    { icon: <SearchIcon />, title: 'Explore Praças', description: 'Navegue pelas praças disponíveis em sua região.' },
    { icon: <DescriptionIcon />, title: 'Envie Proposta', description: 'Detalhe seu plano de manutenção e melhorias.' },
    { icon: <GavelIcon />, title: 'Análise', description: 'A prefeitura analisa sua proposta com transparência.' },
    { icon: <AssignmentIcon />, title: 'Assine o Termo', description: 'Formalize a parceria com a prefeitura.' },
    { icon: <BuildIcon />, title: 'Mantenha', description: 'Realize a manutenção e tenha reconhecimento.' },
  ];

  const responsibilities = [
    {
      icon: <CleaningIcon />,
      title: 'Manutenção Regular',
      color: '#4CAF50',
      items: ['Limpeza e remoção de lixo', 'Corte de grama e jardinagem', 'Cuidado com a iluminação'],
    },
    {
      icon: <BuildIcon />,
      title: 'Pequenos Reparos',
      color: '#2196F3',
      items: ['Manutenção de bancos e lixeiras', 'Limpeza de fontes e estruturas', 'Conservação geral do espaço'],
    },
    {
      icon: <MoneyIcon />,
      title: 'Responsabilidade Financeira',
      color: '#FF9800',
      items: ['Custeio das atividades', 'Responsabilidade por danos', 'Cumprimento do acordo'],
    },
  ];

  const benefits = [
    { icon: <GroupsIcon />, title: 'Impacto Social', description: 'Melhore a qualidade de vida da comunidade' },
    { icon: <BusinessIcon />, title: 'Visibilidade', description: 'Ganhe exposição através de placa identificativa' },
    { icon: <EcoIcon />, title: 'Sustentabilidade', description: 'Demonstre compromisso com o meio ambiente' },
    { icon: <NatureIcon />, title: 'Ambiente Verde', description: 'Contribua para a preservação ambiental' },
    { icon: <PublicIcon />, title: 'Comunidade', description: 'Conecte-se com cidadãos engajados' },
    { icon: <AssignmentIcon />, title: 'Parceria Legal', description: 'Termo de cooperação formalizado' },
  ];

  const stats = [
    { value: '150+', label: 'Praças Adotadas' },
    { value: '80+', label: 'Empresas Parceiras' },
    { value: '12', label: 'Cidades Atendidas' },
    { value: '98%', label: 'Satisfação' },
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Header/AppBar */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                <ParkIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={800} color="primary.main">
                Communitex
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                component={Link}
                to="/login"
                variant="text"
                sx={{ fontWeight: 600 }}
              >
                Entrar
              </Button>
              <Button
                onClick={handleMenuOpen}
                variant="contained"
                endIcon={<ArrowDropDownIcon />}
                sx={{ 
                  borderRadius: 3,
                  px: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Cadastre-se
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { borderRadius: 2, mt: 1, minWidth: 200 }
                }}
              >
                <MenuItem component={Link} to="/register" onClick={handleMenuClose} sx={{ py: 1.5 }}>
                  <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} /> Sou Empresa
                </MenuItem>
                <MenuItem component={Link} to="/register/pessoa-fisica" onClick={handleMenuClose} sx={{ py: 1.5 }}>
                  <PersonIcon sx={{ mr: 2, color: 'secondary.main' }} /> Pessoa Física
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, #38ef7d 100%)`,
          pt: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip 
                label="Alinhado com a ODS 11 - Cidades Sustentáveis" 
                icon={<PublicIcon />}
                sx={{ 
                  mb: 3, 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  fontWeight: 600,
                  '& .MuiChip-icon': { color: 'white' }
                }} 
              />
              <Typography 
                variant="h1" 
                fontWeight={800} 
                color="white"
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                Adote uma Praça.
                <br />
                <Box component="span" sx={{ color: alpha('#fff', 0.85) }}>
                  Transforme sua Cidade.
                </Box>
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400,
                  maxWidth: 500,
                  lineHeight: 1.6,
                }}
              >
                Conectamos empresas, cidadãos e o poder público para revitalizar 
                espaços públicos mais verdes, seguros e acessíveis.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main', 
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    '&:hover': { 
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Começar Agora
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{ 
                    borderColor: 'rgba(255,255,255,0.5)', 
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      borderWidth: 2,
                    } 
                  }}
                >
                  Já tenho conta
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Grid container spacing={3}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight={800} color="white">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.8)">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* O que é Adoção de Praça */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip label="SOBRE O PROGRAMA" color="primary" sx={{ mb: 2, fontWeight: 600 }} />
            <Typography variant="h3" fontWeight={800} gutterBottom>
              O que é Adoção de Praça?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Um programa inovador que transforma a relação entre cidadãos e espaços públicos
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {aboutCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center', 
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      borderColor: 'transparent',
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 3,
                      background: card.gradient,
                      '& .MuiSvgIcon-root': { fontSize: 40 }
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {card.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Como Funciona */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip label="PASSO A PASSO" color="primary" sx={{ mb: 2, fontWeight: 600 }} />
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Como Funciona?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Um processo simples e transparente em apenas 6 passos
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      '& .step-number': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      }
                    }
                  }}
                >
                  <Box
                    className="step-number"
                    sx={{
                      position: 'absolute',
                      top: -16,
                      left: 24,
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, mt: 1 }}>
                    <Box sx={{ color: 'primary.main' }}>{step.icon}</Box>
                    <Typography variant="h6" fontWeight={700}>
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {step.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Responsabilidades */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip label="COMPROMISSOS" color="primary" sx={{ mb: 2, fontWeight: 600 }} />
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Responsabilidades do Adotante
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {responsibilities.map((resp, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ bgcolor: resp.color, p: 3, color: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {resp.icon}
                      <Typography variant="h6" fontWeight={700}>
                        {resp.title}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ pt: 3 }}>
                    <Stack spacing={2}>
                      {resp.items.map((item, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <CheckIcon sx={{ color: resp.color, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefícios */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip label="VANTAGENS" color="primary" sx={{ mb: 2, fontWeight: 600 }} />
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Benefícios de Adotar uma Praça
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 3,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    }
                  }}
                >
                  <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                    {benefit.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Pronto para Fazer a Diferença?
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.9, maxWidth: 500, mx: 'auto' }}>
            Junte-se a centenas de adotantes que já estão transformando suas cidades.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main', 
                px: 5,
                py: 1.8,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                '&:hover': { 
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                } 
              }}
            >
              Começar Agora
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{ 
                borderColor: 'rgba(255,255,255,0.5)', 
                color: 'white',
                px: 5,
                py: 1.8,
                borderRadius: 3,
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
                  borderWidth: 2,
                } 
              }}
            >
              Já Tenho Conta
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0f172a', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <ParkIcon />
                </Avatar>
                <Typography variant="h5" fontWeight={800}>
                  Communitex
                </Typography>
              </Box>
              <Typography variant="body2" color="grey.400" sx={{ mb: 3, lineHeight: 1.8 }}>
                Transformando cidades através de praças mais verdes e sustentáveis. 
                Juntos construímos comunidades melhores.
              </Typography>
              <Chip 
                icon={<PublicIcon />} 
                label="ODS 11 - Cidades Sustentáveis" 
                size="small"
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  color: 'primary.light',
                  '& .MuiChip-icon': { color: 'primary.light' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Links Rápidos
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                {['Sobre o Programa', 'Como Funciona', 'Praças Disponíveis', 'FAQ'].map((link) => (
                  <Typography 
                    key={link} 
                    variant="body2" 
                    color="grey.400"
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      '&:hover': { color: 'primary.light' }
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Contato
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: alpha(theme.palette.primary.main, 0.2) }}>
                    <EmailIcon sx={{ fontSize: 18, color: 'primary.light' }} />
                  </Avatar>
                  <Typography variant="body2" color="grey.400">
                    contato@communitex.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: alpha(theme.palette.primary.main, 0.2) }}>
                    <PhoneIcon sx={{ fontSize: 18, color: 'primary.light' }} />
                  </Avatar>
                  <Typography variant="body2" color="grey.400">
                    (47) 1234-5678
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 5, borderColor: 'grey.800' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="grey.500">
              © {new Date().getFullYear()} Communitex - Todos os direitos reservados.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="body2" color="grey.500" sx={{ cursor: 'pointer', '&:hover': { color: 'grey.300' } }}>
                Termos de Uso
              </Typography>
              <Typography variant="body2" color="grey.500" sx={{ cursor: 'pointer', '&:hover': { color: 'grey.300' } }}>
                Política de Privacidade
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;