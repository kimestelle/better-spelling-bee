'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import useGameLogic, { GameLogicReturnType } from './GameLogic';

const GameLogicContext = createContext<GameLogicReturnType | undefined>(undefined);

export const GameLogicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const gameLogic = useGameLogic();
  return <GameLogicContext.Provider value={gameLogic}>{children}</GameLogicContext.Provider>;
};

export const useGameLogicContext = (): GameLogicReturnType => {
  const context = useContext(GameLogicContext);
  if (context === undefined) {
    throw new Error('useGameLogicContext must be used within a GameLogicProvider');
  }
  return context;
};
