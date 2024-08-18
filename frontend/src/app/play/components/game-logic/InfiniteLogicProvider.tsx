import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useGameLogic, { GameLogicReturnType } from './GameLogic';
import InfiniteDataService from '../../../services/InfiniteDataService';  // Infinite mode-specific service

interface InfiniteLogicProviderProps {
  children: ReactNode;
}

interface ExtendedGameLogicReturnType extends GameLogicReturnType {
  gameData: any;  // Adjust based on the structure of your infinite mode data
}

const GameLogicContext = createContext<ExtendedGameLogicReturnType | undefined>(undefined);

export const InfiniteLogicProvider: React.FC<InfiniteLogicProviderProps> = ({ children }) => {
  const defaultInfiniteData = {
    data: [],
    letters: [],
    center_letter: '',
    win_threshold: 1,
  };

  const [gameData, setGameData] = useState(defaultInfiniteData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await InfiniteDataService.getInfiniteData();  // Infinite mode-specific data fetch
        console.log('Fetched data:', data);
        setGameData(data);
      } catch (error) {
        console.error('Failed to fetch infinite data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated gameData:', gameData);
  }, [gameData]);

  const gameLogic = useGameLogic(InfiniteDataService.updateFoundWords, gameData);  // Infinite mode-specific update

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
