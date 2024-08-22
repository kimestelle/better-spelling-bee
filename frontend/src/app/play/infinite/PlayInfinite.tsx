'use client';

import React from 'react';
import DuckDragDrop from '../components/DuckDragDrop';
import FoundWords from '../components/FoundWords';
import ScoreBar from '../components/ScoreBar';
import TopBar from '../components/TopBar';
import InfiniteWinScreen from './InfiniteWinScreen';
import { useGameLogicContext } from '../components/game-logic/InfiniteLogicProvider';

import { useInfiniteData } from '@/context/InfiniteDataContext';
import { useAuth } from '@/context/AuthContext';

const PlayInfinite: React.FC = () => {
    const { win, winScreenDisplayed, gameData, points, foundWords, counterPosition, handleSubmit, statusMessage, resetData } = useGameLogicContext();
    const { fetchAndUpdateInfiniteData } = useInfiniteData();
    const { resetUserInfiniteData } = useAuth();
  
    const handleResetGame = async () => {
      const confirmed = window.confirm("Are you sure you want to reset the game? This cannot be undone.");
      if (confirmed) {
        await resetUserInfiniteData(); // Reset the user’s infinite score and words
        resetData();
        await fetchAndUpdateInfiniteData(); // fetch new data if none
      }
    };    

  return (
    <>
      {win && !winScreenDisplayed ? (
        <InfiniteWinScreen />
      ) : (
        <div className="flex flex-col w-[50svh] h-[100svh] md:w-[100svh] border-black md:pt-[2svh]">
          <div className='flex flex-col h-full items-center'>
            <TopBar daily={true}/>
            <span className="inline-block bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] to-50% text-transparent bg-clip-text">
                infinite mode! <span onClick={handleResetGame} className="text-white italic clickable">&lt;reset game&gt;</span>
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

export default PlayInfinite;
