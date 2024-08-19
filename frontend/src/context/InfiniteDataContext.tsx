"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import InfiniteDataService, { InfiniteData } from '../app/services/InfiniteDataService';
import Cookies from 'js-cookie';

interface InfiniteDataContextProps {
  infiniteData: InfiniteData | null;
  loading: boolean;
  fetchInfiniteData: () => Promise<void>;
}

const InfiniteDataContext = createContext<InfiniteDataContextProps | undefined>(undefined);

export const InfiniteDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [infiniteData, setInfiniteData] = useState<InfiniteData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInfiniteData = async () => {
    try {
      console.log('fetchInfiniteData function called');
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      console.log(`token: ${token}`);

      const data = await InfiniteDataService.getInfiniteData(token);
      console.log(data);
      setInfiniteData(data);
    } catch (error) {
      console.error('Failed to fetch infinite data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfiniteData();
  }, []);

  return (
    <InfiniteDataContext.Provider value={{ infiniteData, loading, fetchInfiniteData }}>
      {children}
    </InfiniteDataContext.Provider>
  );
};

export const useInfiniteData = (): InfiniteDataContextProps => {
  const context = useContext(InfiniteDataContext);
  if (!context) {
    throw new Error('useInfiniteData must be used within an InfiniteDataProvider');
  }
  return context;
};
