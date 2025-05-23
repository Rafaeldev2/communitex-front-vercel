import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import IndicadoresPage from './pages/Indicadores/IndicadoresPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/indicadores" element={<IndicadoresPage />} />
          {/* outras rotas */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;