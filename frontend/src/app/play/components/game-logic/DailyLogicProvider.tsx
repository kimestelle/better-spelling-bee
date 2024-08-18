'use client'
import React, { createContext, useContext, ReactNode } from 'react';
import useGameLogic, { GameLogicReturnType } from './GameLogic';
import { useDailyData } from '@/context/DailyDataContext';
import { useAuth } from '@/context/AuthContext';  // Import AuthContext

interface DailyLogicProviderProps {
  children: ReactNode;
}

interface ExtendedGameLogicReturnType extends GameLogicReturnType {
  gameData: DailyData;
}

const GameLogicContext = createContext<ExtendedGameLogicReturnType | undefined>(undefined);

export const DailyLogicProvider: React.FC<DailyLogicProviderProps> = ({ children }) => {
  const { dailyData, loading } = useDailyData();
  const { updateFoundWords } = useAuth();  // Use updateFoundWords from AuthContext

  const gameLogic = useGameLogic(updateFoundWords, dailyData);

  if (loading || !dailyData) {
    return <div>Loading...</div>;
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
