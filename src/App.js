
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1>Bem-vindo ao Portal Petrobras</h1>
        <p>Conteúdo principal da página será inserido aqui</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;