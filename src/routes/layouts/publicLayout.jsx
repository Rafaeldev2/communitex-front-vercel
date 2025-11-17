import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu/Menu.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function PublicLayout() {
    return (
        <>
            <Menu />
            <Outlet />
            <Footer />
        </>
    );
}
