"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import api, { Player } from '../app/services/UserService';
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

  const logout = useCallback(() => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
    router.push('/');
  }, [router]);

  const refreshToken = useCallback(async () => {
    const refresh = Cookies.get('refresh_token');
    if (refresh) {
      try {
        const response = await api.refreshToken(refresh as string);
        const { access } = response.data;
        Cookies.set('access_token', access);
        return access;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
      }
    }
  }, [logout]);

  const getCurrentUserDataWithRefresh = useCallback(async () => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        console.log('Fetching user data with token:', token);
        const userData = await api.getCurrentUserData(token as string);
        setUser(userData);
        console.log('User data set:', userData);
      } catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
          const newToken = await refreshToken();
          if (newToken) {
            const userData = await api.getCurrentUserData(newToken as string);
            setUser(userData);
            console.log('User data set after refresh:', userData);
          }
        }
      }
    }
  }, [refreshToken]);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      getCurrentUserDataWithRefresh().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [getCurrentUserDataWithRefresh]);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.login(username, password);
      const { access, refresh } = response.data;
      console.log('Login response:', response.data);
      Cookies.set('access_token', access);
      Cookies.set('refresh_token', refresh);
      const userData = await api.getCurrentUserData(access as string);
      setUser(userData);
      console.log('User data set after login:', userData);
      router.push('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string, email: string, emailUpdates: boolean) => {
    try {
      const response = await api.register(username, password, email, emailUpdates);
      const { access, refresh } = response.data;
      console.log('Register response:', response.data);
      Cookies.set('access_token', access);
      Cookies.set('refresh_token', refresh);
      const userData = await api.getCurrentUserData(access as string);
      setUser(userData);
      console.log('User data set after registration:', userData);
      router.push('/profile');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const updateUser = async (userData: Partial<Player>) => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const updatedUser = await api.updateUserData(token as string, userData);
        setUser(updatedUser);
        console.log('User data updated:', updatedUser);
      } catch (error) {
        console.error('Failed to update user data:', error);
        throw error;
      }
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
  console.log('useAuth context:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
