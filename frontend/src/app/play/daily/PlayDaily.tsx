'use client';

import React from 'react';
import DuckDragDrop from '../components/DuckDragDrop';
import FoundWords from '../components/FoundWords';
import ScoreBar from '../components/ScoreBar';
import TopBar from '../components/TopBar';
import DailyWinScreen from './DailyWinScreen';

import { useGameLogicContext } from '../components/game-logic/DailyLogicProvider';
import { useDailyData } from '@/context/DailyDataContext';

const PlayDaily: React.FC = () => {
  const { win, winScreenDisplayed, gameData, points, foundWords, counterPosition, handleSubmit, statusMessage } = useGameLogicContext();
  const { date } = useDailyData();

  return (
    <>
      {win && !winScreenDisplayed ? (
        <DailyWinScreen />
      ) : (
        <div className="flex flex-col w-[50svh] h-[100svh] md:w-[100svh] border-black md:pt-[2svh]">
          <div className='flex flex-col h-full items-center'>
            <TopBar daily={true}/>
            <span className="inline-block text-white">
                daily: <span className="italic">{date}</span>
            </span>
          </div>
          <div className='flex flex-col md:flex-row-reverse'>
            <div className='relative h-[14svh] w-[50svh] flex flex-col md:mt-[2svh]'>
              <ScoreBar points={points} counterPosition={counterPosition} />
              <FoundWords foundWords={foundWords} />
            </div>
            <div className="flex flex-col h-[75svh] w-[50svh] md:mt-[8svh]">
              {gameData && gameData.letters && (
              <DuckDragDrop 
                letterArray={gameData.letters} 
                centerLetter={gameData.center_letter} 
                handleSubmit={handleSubmit} 
                statusMessage={statusMessage} 
              />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayDaily;