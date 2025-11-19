import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import EmpresaLayout from "./layouts/EmpresaLayout";

// Componentes de proteção
import ProtectedRoute from "../components/ProtectedRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";

// Páginas públicas
import Home from "../pages/Home/Home"; // Assumindo que Home.jsx existe
import LoginPage from "../pages/login/LoginPage.jsx";
import Mapa from "../pages/mapa/Mapa.jsx"; // Assumindo que Mapa.jsx existe

// Páginas autenticadas (compartilhadas)
import Dashboard from "../pages/Dashboard/Dashboard";
import Perfil from "../pages/Perfil/Perfil";

// Páginas de empresa
import MinhasAdocoes from "../pages/Empresa/MinhasAdocoes";
import CadastroPraca from "../pages/Empresa/CadastroPraca"; // Corrigido o caminho

// Páginas de administrador
import GerenciarPracas from "../pages/Admin/GerenciarPracas";
import GerenciarEmpresas from "../pages/Admin/GerenciarEmpresas";
import GerenciarAdocoes from "../pages/Admin/GerenciarAdocoes";
import GerenciarRepresentantes from "../pages/Admin/GerenciarRepresentantes";


import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            {/* ==================== ROTAS PÚBLICAS ==================== */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mapa" element={<Mapa />} />
            </Route>

            {/* ==================== ROTAS AUTENTICADAS ==================== */}
            <Route element={<ProtectedRoute />}>
                <Route element={<AuthLayout />}>
                    {/* Rotas compartilhadas por todos os usuários autenticados */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/perfil" element={<Perfil />} />

                    {/* ==================== ROTAS DE EMPRESA ==================== */}
                    <Route element={<RoleBasedRoute allowedRoles={["EMPRESA", "ROLE_EMPRESA"]} />}>
                        <Route element={<EmpresaLayout />}>
                            <Route path="/empresa/pracas" element={<CadastroPraca />} />
                            <Route path="/empresa/minhas-adocoes" element={<MinhasAdocoes />} />
                        </Route>
                    </Route>

                    {/* ==================== ROTAS DE ADMINISTRADOR ==================== */}
                    <Route element={<RoleBasedRoute allowedRoles={["ADMIN", "ROLE_ADMIN"]} />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/pracas" element={<GerenciarPracas />} />
                            <Route path="/admin/empresas" element={<GerenciarEmpresas />} />
                            <Route path="/admin/adocoes" element={<GerenciarAdocoes />} />
                            <Route path="/admin/representantes" element={<GerenciarRepresentantes />} />
                        </Route>
                    </Route>
                </Route>
            </Route>

            {/* ==================== ROTA DE ERRO 404 ==================== */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}