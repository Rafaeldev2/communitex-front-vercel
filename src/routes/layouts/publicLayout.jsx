import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";


export default function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Menu />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}