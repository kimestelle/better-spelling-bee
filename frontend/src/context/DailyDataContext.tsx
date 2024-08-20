"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import DailyDataService, { DailyData } from '../app/services/DailyDataService';
import Cookies from 'js-cookie';

interface DailyDataContextProps {
  dailyData: DailyData | null;
  loading: boolean;
  fetchDailyData: () => Promise<void>;
}

export const DailyDataContext = createContext<DailyDataContextProps | undefined>(undefined);

export const DailyDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDailyData = async () => {
    try {
      console.log('fetchDailyData function called');
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      console.log(`token: ${token}`);

      const data = await DailyDataService.getDailyData(token);
      console.log(data);
      setDailyData(data);
    } catch (error) {
      console.error('Failed to fetch daily data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyData();
  }, []);

  return (
    <DailyDataContext.Provider value={{ dailyData, loading, fetchDailyData }}>
      {children}
    </DailyDataContext.Provider>
  );
};

export const useDailyData = (): DailyDataContextProps => {
  const context = useContext(DailyDataContext);
  if (!context) {
    throw new Error('useDailyData must be used within a DailyDataProvider');
  }
  return context;
};
