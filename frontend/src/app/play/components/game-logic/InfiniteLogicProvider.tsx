"use client";

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import useGameLogic, { GameLogicReturnType } from './GameLogic';
import { useInfiniteData } from '@/context/InfiniteDataContext';
import { useAuth } from '@/context/AuthContext';
import { InfiniteData } from '@/app/services/InfiniteDataService';

interface InfiniteLogicProviderProps {
  children: ReactNode;
}

interface ExtendedGameLogicReturnType extends GameLogicReturnType {
  gameData: InfiniteData;
}

const GameLogicContext = createContext<ExtendedGameLogicReturnType | undefined>(undefined);

export const InfiniteLogicProvider: React.FC<InfiniteLogicProviderProps> = ({ children }) => {
  const { infiniteData, loading } = useInfiniteData();
  const { updateFoundWords, updateInfiniteData, user } = useAuth();  // Include updateInfiniteData from useAuth

  const gameLogic = useGameLogic(
    updateFoundWords, 
    infiniteData, 
    user?.infinite_score, 
    user?.infinite_words, 
    false
  );

  useEffect(() => {
    if (infiniteData) {
      console.log(
        infiniteData.data,
        infiniteData.win_threshold,
        infiniteData.letters,
        infiniteData.center_letter
      );
  
      updateInfiniteData(
        infiniteData.data,
        infiniteData.win_threshold,
        infiniteData.letters,
        infiniteData.center_letter
      );
    }
  }, [infiniteData]);
  

  if (loading || !infiniteData) {
    return <div>Loading...</div>;
  }

  return (
    <GameLogicContext.Provider value={{ ...gameLogic, gameData: infiniteData }}>
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
