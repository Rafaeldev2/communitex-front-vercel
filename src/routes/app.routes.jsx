import {Route, Routes } from 'react-router-dom';
import Home from "../components/Home/Home.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import CadastroPraca from "../pages/Praca/cadastroPraca.jsx";
import SocioeconomicCharts from "../components/Grafico/SocioeconomicCharts.jsx";
import Mapa from "../pages/Mapa/Mapa.jsx";
import {useEffect} from "react";

function AppRoutes () {

    useEffect(() => {
        console.log("|Passou por aqui - APP Routes")
    }, []);


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
export default AppRoutes