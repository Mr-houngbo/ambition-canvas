import { useState, useEffect } from 'react';

const AUTH_KEY = 'app_authenticated';
const APP_PASSWORD = 'projets2025'; // Mot de passe par défaut - à changer

export const useSimpleAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const login = (password: string): boolean => {
    if (password === APP_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
