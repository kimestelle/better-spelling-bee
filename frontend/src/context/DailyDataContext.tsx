"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import DailyDataService, { DailyData } from '../app/services/DailyDataService';

interface DailyDataContextProps {
  dailyData: DailyData | null;
  fetchDailyData: () => Promise<void>;
}

const DailyDataContext = createContext<DailyDataContextProps | undefined>(undefined);

export const DailyDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dailyData, setDailyData] = useState<DailyData | null>(null);

  const fetchDailyData = async () => {
    try {
      const data = await DailyDataService.getDailyData();
      console.log(data)
      setDailyData(data);
    } catch (error) {
      console.error('Failed to fetch daily data:', error);
    }
  };

  useEffect(() => {
    fetchDailyData();
  }, []);

  return (
    <DailyDataContext.Provider value={{ dailyData, fetchDailyData }}>
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
