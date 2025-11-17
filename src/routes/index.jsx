import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import EmpresaLayout from "./layouts/EmpresaLayout";
import RoleProtected from "./RoleProtected";

import Home from "../components/Home/Home.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import Mapa from "../pages/Mapa/Mapa.jsx";

import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Perfil from "../pages/Perfil/Perfil.jsx";


import MinhasAdocoes from "../pages/Empresa/MinhasAdocoes.jsx";
import CadastroPraca from "../pages/Praca/cadastroPraca.jsx";


import CrudPracas from "../pages/Admin/CrudPracas.jsx";
import CrudEmpresas from "../pages/Admin/CrudEmpresas.jsx";
import CrudAdocoes from "../pages/Admin/CrudAdocoes.jsx";
import CrudRepresentantes from "../pages/Admin/CrudRepresentantes.jsx";

export default function AppRoutes() {
    return (
        <Routes>

            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/maps" element={<Mapa />} />
            </Route>


            <Route element={<AuthLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/perfil" element={<Perfil />} />


                <Route element={<RoleProtected roles={['EMPRESA']} />}>
                    <Route element={<EmpresaLayout />}>
                        <Route path="/empresa/pracas" element={<CadastroPraca />} />
                        <Route path="/empresa/minhas-adocoes" element={<MinhasAdocoes />} />
                    </Route>
                </Route>


                <Route element={<RoleProtected roles={['ADMIN']} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/pracas" element={<CrudPracas />} />
                        <Route path="/admin/empresas" element={<CrudEmpresas />} />
                        <Route path="/admin/adocoes" element={<CrudAdocoes />} />
                        <Route path="/admin/representantes" element={<CrudRepresentantes />} />
                    </Route>
                </Route>
            </Route>

        </Routes>
    );
}
