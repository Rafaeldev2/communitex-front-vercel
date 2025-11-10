import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from "./hooks/auth.jsx";
import {IndexRoutes} from "./routes/index.jsx";

function App() {

  return (
      <Router>
          <AuthProvider>
              <IndexRoutes />
          </AuthProvider>
      </Router>
  )
}

export default App
