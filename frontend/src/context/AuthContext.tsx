"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import UserService, { Player } from '../app/services/UserService';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  user: Player | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string, emailUpdates: boolean) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<Player>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      getUserData(token)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const refreshToken = async () => {
    const refresh = Cookies.get('refresh_token');
    if (refresh) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/users/refresh/', { refresh });
        const { access } = response.data;
        Cookies.set('access_token', access);
        return access;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
      }
    }
  };

  const getCurrentUserDataWithRefresh = async () => {
    let token = Cookies.get('access_token');
    try {
      const userData = await UserService.getCurrentUserData(token);
      setUser(userData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        token = await refreshToken();
        if (token) {
          const userData = await UserService.getCurrentUserData(token);
          setUser(userData);
        }
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      getCurrentUserDataWithRefresh();
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login/', { username, password });
      const { access, refresh } = response.data;
      Cookies.set('access_token', access);
      Cookies.set('refresh_token', refresh);
      const userData = await UserService.getCurrentUserData(access);
      setUser(userData);
      router.push('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string, email: string, emailUpdates: boolean) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/register/', {
        username,
        password,
        email,
        email_updates: emailUpdates,
      });
      const { access, refresh } = response.data;
      Cookies.set('access_token', access);
      Cookies.set('refresh_token', refresh);
      const userData = await UserService.getCurrentUserData(access);
      setUser(userData);
      router.push('/profile');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
    router.push('/');
  };

  const updateUser = async (userData: Partial<Player>) => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        await UserService.updateUserData(token, userData);
        // Fetch the latest user data after updating
        const updatedUser = await UserService.getCurrentUserData(token);
        setUser(updatedUser);
      } catch (error) {
        console.error('Failed to update user data:', error);
        throw error;  
      }
    }
  };

  const getUserData = async (token: string): Promise<Player> => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
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
