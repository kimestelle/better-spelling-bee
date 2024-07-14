"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>(Cookies.get('username') || '');
  const [password, setPassword] = useState<string>('');

  const handleSetUsername = (username: string) => {
    setUsername(username);
    Cookies.set('username', username);
  };

  const handleSetPassword = (password: string) => {
    setPassword(password);
  };

  return (
    <AuthContext.Provider value={{ username, password, setUsername: handleSetUsername, setPassword: handleSetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
