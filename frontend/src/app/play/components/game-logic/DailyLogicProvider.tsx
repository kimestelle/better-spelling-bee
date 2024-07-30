'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useGameLogic, { GameLogicReturnType } from './GameLogic';
import DailyDataService, { DailyData } from '../../../services/DailyDataService';

interface DailyLogicProviderProps {
  children: ReactNode;
}

interface ExtendedGameLogicReturnType extends GameLogicReturnType {
  gameData: DailyData;
}

const GameLogicContext = createContext<ExtendedGameLogicReturnType | undefined>(undefined);

export const DailyLogicProvider: React.FC<DailyLogicProviderProps> = ({ children }) => {
  const defaultDailyData: DailyData = {
    data: [],
    letters: [],
    center_letter: '',
    win_threshold: 1,
  };

  const [gameData, setGameData] = useState<DailyData>(defaultDailyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DailyDataService.getDailyData();
        setGameData(data);
      } catch (error) {
        console.error('Failed to fetch daily data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const gameLogic = useGameLogic(gameData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GameLogicContext.Provider value={{ ...gameLogic, gameData }}>
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
