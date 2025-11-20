import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>🌿 Communitex</div>
        <nav className={styles.nav}>
          <Link to="/login" className={styles.navLink}>Entrar</Link>
          <div className={styles.navDropdown}>
            <button className={`${styles.navLink} ${styles.navButton}`}>
              Cadastre-se ▼
            </button>
            <div className={styles.dropdownMenu}>
              <Link to="/register" className={styles.dropdownItem}>
                🏢 Empresa
              </Link>
              <Link to="/register/pessoa-fisica" className={styles.dropdownItem}>
                👤 Pessoa Física
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className={styles.mainContent}>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Adote uma Praça.<br/>Transforme sua Cidade.</h1>
            <p className={styles.subtitle}>
              Communitex conecta empresas, cidadãos e o poder público para revitalizar 
              e manter espaços públicos mais verdes, seguros e acessíveis. 
              <br/><strong>Juntos construindo cidades mais sustentáveis.</strong>
            </p>
            <p className={styles.ods}>
              🌍 Alinhado com a ODS 11: Cidades e comunidades sustentáveis
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/register" className={styles.ctaPrimary}>
                🏢 Cadastro de Empresa
              </Link>
              <Link to="/register/pessoa-fisica" className={styles.ctaSecondary}>
                👤 Cadastro de Pessoa Física
              </Link>
              <Link to="/login" className={styles.ctaTertiary}>
                🔑 Já tenho conta
              </Link>
            </div>
          </div>
        </section>

        {/* O QUE É ADOÇÃO DE PRAÇA */}
        <section className={styles.aboutSection}>
          <div className={styles.containerContent}>
            <h2>O que é Adoção de Praça?</h2>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutCard}>
                <div className={styles.aboutIcon}>🤝</div>
                <h3>Parceria Público-Privada</h3>
                <p>
                  Um programa de cooperação entre a prefeitura e empresas ou pessoas físicas 
                  para manter e revitalizar espaços públicos.
                </p>
              </div>
              <div className={styles.aboutCard}>
                <div className={styles.aboutIcon}>🌳</div>
                <h3>Impacto Ambiental</h3>
                <p>
                  Contribua para a preservação de áreas verdes, limpeza, jardinagem 
                  e manutenção de espaços que beneficiam toda a comunidade.
                </p>
              </div>
              <div className={styles.aboutCard}>
                <div className={styles.aboutIcon}>📍</div>
                <h3>Identidade da Marca</h3>
                <p>
                  Ganhe visibilidade! Adotantes têm direito de instalar uma placa 
                  de identificação no espaço de acordo com as normas do programa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className={styles.features}>
          <h2>Como Funciona?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.stepNumber}>1</div>
              <h3>Cadastre-se na Plataforma</h3>
              <p>
                Crie sua conta como empresa ou pessoa física em minutos. 
                Verifique seus documentos e esteja pronto para adotar.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.stepNumber}>2</div>
              <h3>Explore Praças Disponíveis</h3>
              <p>
                Navegue pela lista de praças disponíveis em sua região. 
                Veja fotos, localização e características de cada espaço.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.stepNumber}>3</div>
              <h3>Envie sua Proposta</h3>
              <p>
                Detalhe seu plano de manutenção, melhorias previstas 
                e o período de duração da adoção.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.stepNumber}>4</div>
              <h3>Análise da Prefeitura</h3>
              <p>
                A prefeitura analisa sua proposta técnica e viabilidade. 
                Transparência completa no processo de decisão.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.stepNumber}>5</div>
              <h3>Assine o Termo</h3>
              <p>
                Aprovado? Assine o Termo de Cooperação formal com a prefeitura 
                e comece a revitalizar a praça.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.stepNumber}>6</div>
              <h3>Acompanhe & Mantenha</h3>
              <p>
                Realize a manutenção conforme acordado. Acompanhe o histórico 
                de ações e tenha sua contribuição reconhecida.
              </p>
            </div>
          </div>
        </section>

        {/* RESPONSABILIDADES */}
        <section className={styles.responsibilitySection}>
          <div className={styles.containerContent}>
            <h2>Responsabilidades do Adotante</h2>
            <div className={styles.responsibilityGrid}>
              <div className={styles.responsibilityCard}>
                <h3>🧹 Manutenção Regular</h3>
                <ul>
                  <li>Limpeza e remoção de lixo</li>
                  <li>Corte de grama e jardinagem</li>
                  <li>Cuidado com a iluminação (se houver)</li>
                </ul>
              </div>
              <div className={styles.responsibilityCard}>
                <h3>🔧 Pequenos Reparos</h3>
                <ul>
                  <li>Manutenção de bancos e lixeiras</li>
                  <li>Limpeza de fontes e estruturas</li>
                  <li>Conservação geral do espaço</li>
                </ul>
              </div>
              <div className={styles.responsibilityCard}>
                <h3>💰 Responsabilidade Financeira</h3>
                <ul>
                  <li>Custeio das atividades de manutenção</li>
                  <li>Responsabilidade por danos causados</li>
                  <li>Cumprimento do período acordado</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className={styles.benefitsSection}>
          <h2>Benefícios de Adotar uma Praça</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <h4>Impacto Social</h4>
              <p>Melhore a qualidade de vida da comunidade</p>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <h4>Visibilidade</h4>
              <p>Ganhe exposição através de placa identificativa</p>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <h4>Responsabilidade Social</h4>
              <p>Demonstre compromisso com a sustentabilidade</p>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <h4>Ambiente Mais Verde</h4>
              <p>Contribua para a preservação ambiental</p>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <h4>Comunidade Engajada</h4>
              <p>Conecte-se com outros adotantes e cidadãos</p>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <h4>Parceria Formalizada</h4>
              <p>Termo de cooperação legal e transparente</p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.finalCTA}>
          <h2>Pronto para Fazer a Diferença?</h2>
          <p>Comece agora mesmo a transformar os espaços públicos da sua cidade.</p>
          <div className={styles.finalButtons}>
            <Link to="/register" className={styles.ctaPrimary}>
              🚀 Começar Agora
            </Link>
            <Link to="/login" className={styles.ctaSecondary}>
              🔑 Já Tenho Conta
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Communitex</h4>
            <p>Transformando cidades através de praças mais verdes e sustentáveis.</p>
          </div>
          <div className={styles.footerSection}>
            <h4>ODS 11</h4>
            <p>Cidades e comunidades sustentáveis, seguras e resilientes.</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Contato</h4>
            <p>📧 contato@communitex.com<br/>📱 (11) 1234-5678</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Communitex - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;