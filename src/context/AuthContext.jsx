import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    setAuthenticated(isAuthenticated === 'true');
  };

  const login = async () => {
    // Logic to perform login
    localStorage.setItem('isAuthenticated', 'true');
    setAuthenticated(true);
  };

  const logout = async () => {
    // Logic to perform logout
    localStorage.setItem('isAuthenticated', 'false');
    setAuthenticated(false);
  };

  const authContextValue = {
    authenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

