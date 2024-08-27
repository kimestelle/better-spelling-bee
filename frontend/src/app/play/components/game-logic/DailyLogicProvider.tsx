'use client'
import React, { createContext, useContext, ReactNode } from 'react';
import useGameLogic, { GameLogicReturnType } from './GameLogic';
import { useDailyData } from '@/context/DailyDataContext';
import { useAuth } from '@/context/AuthContext';
import { DailyData } from '@/app/services/DailyDataService';

import Loading from '../Loading';

interface DailyLogicProviderProps {
  children: ReactNode;
}

interface ExtendedGameLogicReturnType extends GameLogicReturnType {
  gameData: DailyData;
}

const GameLogicContext = createContext<ExtendedGameLogicReturnType | undefined>(undefined);

export const DailyLogicProvider: React.FC<DailyLogicProviderProps> = ({ children }) => {
  const { dailyData, loading } = useDailyData();
  const { updateFoundWords, user } = useAuth(); 

  const gameLogic = useGameLogic(updateFoundWords, dailyData, user?.daily_score, user?.daily_words, true);

  if (loading || !dailyData) {
    return <Loading/>;
  }

  return (
    <GameLogicContext.Provider value={{ ...gameLogic, gameData: dailyData }}>
      {children}
    </GameLogicContext.Provider>
  );
};

export const useGameLogicContext = (): ExtendedGameLogicReturnType => {
  const context = useContext(GameLogicContext);
  if (context === undefined) {
    throw new Error('useGameLogicContext must be used within a GameLogicProvider');
  }
  return context;
};
