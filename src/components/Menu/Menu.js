import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import PetrobrasLogo from '../../assets/logo/logo.png'; // Ajuste o caminho conforme sua estrutura

const Menu = () => {
  return (
    <nav className="petrobras-menu">
      <div className="menu-logo-container">
        <img 
          src={PetrobrasLogo} 
          alt="Logo Petrobras" 
          className="menu-logo"
        />
      </div>
      
      <ul className="menu-items">
        <li className="menu-item">
          <NavLink 
            to="/uf" 
            className={({ isActive }) => 
              `menu-link ${isActive ? 'active' : ''}`
            }
          >
            UFs
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/municipio" 
            className={({ isActive }) => 
              `menu-link ${isActive ? 'active' : ''}`
            }
          >
            Municípios
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/bairro" 
            className={({ isActive }) => 
              `menu-link ${isActive ? 'active' : ''}`
            }
          >
            Bairros
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/logradouro" 
            className={({ isActive }) => 
              `menu-link ${isActive ? 'active' : ''}`
            }
          >
            Logradouros
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/comunidade" 
            className={({ isActive }) => 
              `menu-link ${isActive ? 'active' : ''}`
            }
          >
            Comunidades
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/indicadores" 
            className={({ isActive }) => 
              `menu-link ${isActive ? 'active' : ''}`
            }
          >
            Indicadores
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;