import Footer from "../components/Footer/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "../components/Menu/Menu.jsx";
import Home from "../components/Home/Home.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import CadastroPraca from "../pages/Praca/cadastroPraca.jsx";
import SocioeconomicCharts from "../components/Grafico/SocioeconomicCharts.jsx";
import Mapa from "../pages/Mapa/Mapa.jsx";

function appRoutes () {
    return(

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/pracas" element={<CadastroPraca />} />
                <Route path="/relatorios" element={<SocioeconomicCharts/>} />
                <Route path='/maps' element={<Mapa/>}/>
            </Routes>

        )
}
export default appRoutes