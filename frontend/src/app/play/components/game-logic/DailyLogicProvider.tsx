'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useGameLogic, { GameLogicReturnType } from './GameLogic';
import DailyDataService, { DailyData } from '../../../services/DailyDataService';

interface DailyLogicProviderProps {
  children: ReactNode;
}

const GameLogicContext = createContext<GameLogicReturnType | undefined>(undefined);

export const DailyLogicProvider: React.FC<DailyLogicProviderProps> = ({ children }) => {
  const [gameData, setGameData] = useState<DailyData | null>(null);
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

  const gameLogic = useGameLogic(gameData || {
    data: [], // Assuming 'data' is a list of words
    letters: [],
    center_letter: '',
    win_threshold: 1,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GameLogicContext.Provider value={gameLogic}>
      {children}
    </GameLogicContext.Provider>
  );
};

export const useGameLogicContext = (): GameLogicReturnType => {
  const context = useContext(GameLogicContext);
  if (context === undefined) {
    throw new Error('useGameLogicContext must be used within a GameLogicProvider');
  }
  return context;
};
