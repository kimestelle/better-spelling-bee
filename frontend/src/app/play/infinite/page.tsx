'use client';
import React from 'react';
import DuckDragDrop from '../components/DuckDragDrop';
import FoundWords from '../components/FoundWords';
import ScoreBar from '../components/ScoreBar';
import TopBar from '../components/TopBar';
import { GameLogicProvider } from '../components/game-logic/DailyLogicProvider';

const PlayInfinite: React.FC = () => {
  return (
    <GameLogicProvider>
      <div className="flex flex-col w-[50svh] h-[100svh] md:w-[100svh] border-black md:pt-[2svh]">
        <TopBar/>
        <div className='flex flex-col md:flex-row-reverse'>
        <div className='relative h-full w-[50svh] flex flex-col md:mt-[2svh]'>
            <ScoreBar />
            <FoundWords />
        </div>
        <div className="flex flex-col h-[77svh] w-[50svh] md:mt-[8svh]">
          <DuckDragDrop />
        </div>
        </div>
      </div>
    </GameLogicProvider>
  );
};

export default PlayInfinite;
