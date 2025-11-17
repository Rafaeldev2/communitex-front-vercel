import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/Sidebars/SidebarAdmin.jsx";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex" }}>
            <SidebarAdmin />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}
