import './Footer.css';

const Footer = () => {
  return (
    <footer className="petrobras-footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="https://www.petrobras.com.br/content/dam/petrobras-site/imagems/logo.svg" alt="Petrobras Logo" width="120" />
        </div>
        <div className="footer-links">
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/saude">Saúde</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contato</h4>
          <p>communitex@communitex.com.br</p>
          <p>+55 21 99999-9999</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Communitex. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;