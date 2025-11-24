import React from 'react';
            import { Routes, Route, Navigate } from 'react-router-dom';
            import { useAuth } from '../hooks/useAuth';

            // Layouts
            import PublicLayout from './layouts/publicLayout';
            import AuthLayout from './layouts/authLayout';
            import AdminLayout from './layouts/adminLayout';
            import EmpresaLayout from './layouts/empresaLayout';

            // Components
            import Loading from '../components/Loading';
            import ProtectedRoute from '../components/ProtectedRoute';
            import RoleBasedRoute from '../components/RoleBasedRoute';
            import UnauthorizedAccess from '../components/UnauthorizedAccess';
            import NotFound from '../pages/NotFound';

            // Pages - Public
            import Home from '../pages/home/Home';

            // Pages - Auth
            import LoginPage from '../pages/login/LoginPage';

            // Pages - Admin
            import DashboardAdmin from '../pages/admin/DashboardAdmin';
            import CadastroPraca from '../pages/praca/cadastroPraca';
            import CadastroEmpresas from '../pages/empresa/cadastroEmpresa';
            import CadastroRepresentantes from '../pages/representante/cadastroRepresentante.jsx';
            import CadastroAdocoes from '../pages/adocoes/cadastroAdocoes';

            function AppRoutes() {
                const { loading } = useAuth();

                if (loading) {
                    return <Loading />;
                }

                return (
                    <Routes>
                        {/* Public Routes */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/sobre" element={<div className="card">Página Sobre</div>} />
                            <Route path="/pracas" element={<div className="card">Praças Públicas</div>} />
                            <Route path="/contato" element={<div className="card">Contato</div>} />
                        </Route>

                        {/* Auth Routes */}
                        <Route element={<AuthLayout />}>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/registro" element={<div>Registro</div>} />
                            <Route path="/recuperar-senha" element={<div>Recuperar Senha</div>} />
                        </Route>

                        {/* Admin Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<RoleBasedRoute allowedRoles={['ADMIN']} />}>
                                <Route path="/admin" element={<AdminLayout />}>
                                    <Route index element={<DashboardAdmin />} />
                                    <Route path="pracas" element={<CadastroPraca />} />
                                    <Route path="empresas" element={<CadastroEmpresas />} />
                                    <Route path="representantes" element={<CadastroRepresentantes />} />
                                    <Route path="adocoes" element={<CadastroAdocoes />} />
                                    <Route path="usuarios" element={<div className="card">Página de Usuários</div>} />
                                </Route>
                            </Route>
                        </Route>

                        {/* Empresa Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<RoleBasedRoute allowedRoles={['EMPRESA']} />}>
                                <Route path="/empresa" element={<EmpresaLayout />}>
                                    <Route index element={<div className="card">Dashboard Empresa</div>} />
                                    <Route path="minhas-adocoes" element={<div className="card">Minhas Adoções</div>} />
                                    <Route path="pracas" element={<div className="card">Praças Disponíveis</div>} />
                                    <Route path="perfil" element={<div className="card">Meu Perfil</div>} />
                                </Route>
                            </Route>
                        </Route>

                        {/* Error Routes */}
                        <Route path="/acesso-negado" element={<UnauthorizedAccess />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                );
            }

            export default AppRoutes;