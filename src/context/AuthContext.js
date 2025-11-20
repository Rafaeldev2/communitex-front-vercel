// /src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode'; // (Instale com: npm install jwt-decode)

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para checar o token inicial

  // Efeito para carregar o usuário do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decodifica o token
        setUser(decodedUser);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        localStorage.clear(); // Limpa token inválido
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Usa o endpoint de login do swagger.json
      const response = await api.post('/api/auth/login', {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // Salva os tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Decodifica e salva o usuário no estado
      const decodedUser = jwtDecode(accessToken);
      setUser(decodedUser);

      return true; // Sucesso
    } catch (error) {
      console.error('Falha no login:', error);
      return false; // Falha
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    // (Opcional: chamar /api/auth/logout se você tiver um endpoint de blacklist)
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};