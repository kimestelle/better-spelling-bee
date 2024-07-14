'use client';
import React from 'react';
import DuckDragDrop from '../components/DuckDragDrop';
import FoundWords from '../components/FoundWords';
import ScoreBar from '../components/ScoreBar';
import { GameLogicProvider } from '../components/game-logic/GameLogicProvider';

const Play: React.FC = () => {
  return (
    <GameLogicProvider>
      <div className="relative flex flex-col w-full h-screen">
        <div className="h-[15svh]">
          <ScoreBar />
        </div>
        <div className="h-[10svh]">
          <FoundWords />
        </div>
        <div className="flex flex-col h-[75svh] w-full">
          <DuckDragDrop />
        </div>
      </div>
    </GameLogicProvider>
  );
};

export default Play;
