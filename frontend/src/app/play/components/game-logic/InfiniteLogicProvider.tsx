"use client";

import React, { createContext, useContext, ReactNode } from 'react';
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
  const { updateFoundWords, user } = useAuth();  // Ensure updateFoundWords is correctly retrieved from useAuth

  const gameLogic = useGameLogic(
    updateFoundWords, 
    infiniteData, 
    user?.infinite_score, 
    user?.infinite_words, 
    false
  );

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
