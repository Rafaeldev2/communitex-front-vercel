import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import SocioeconomicCharts from './components/Grafico/SocioeconomicCharts';
import Mapa from './pages/Mapa/Mapa';
import LoginPage from './pages/Login/LoginPage.jsx';
import CadastroPraca from "./pages/Praca/cadastroPraca.jsx";

function App() {

  return (
      <Router>
          <div className="app-container">
              <Menu />
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/pracas" element={<CadastroPraca />} />
                  <Route path="/relatorios" element={<SocioeconomicCharts/>} />
                  <Route path='/maps' element={<Mapa/>}/>
              </Routes>
              <Footer />
          </div>
      </Router>
  )
}

export default App
