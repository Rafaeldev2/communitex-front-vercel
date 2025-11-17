import { Outlet } from "react-router-dom";
import SidebarEmpresa from "../../components/Sidebars/SidebarEmpresa.jsx";

export default function EmpresaLayout() {
    return (
        <div style={{ display: "flex" }}>
            <SidebarEmpresa />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}
