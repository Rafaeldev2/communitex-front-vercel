import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "./hooks/auth.jsx";
import {IndexRoutes} from "./routes/index.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {

  return (
      <BrowserRouter>
          <Menu/>
          <AuthProvider>
              <IndexRoutes />
          </AuthProvider>
          <Footer/>
      </BrowserRouter>
  );
}

export default App
