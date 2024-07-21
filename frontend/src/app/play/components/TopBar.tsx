import React from 'react';
import { useGameLogicContext } from './game-logic/GameLogicProvider';

const ScoreBar: React.FC = () => {
  const { points } = useGameLogicContext();

  return (
      <div className="w-full h-[10svh] flex flex-row justify-between items-center px-[3svh]">
        <button className='w-[5svh] h-[5svh] bg-transparent shadow-none'>
        <img src='/icons/home-icon.svg'/>
        </button>
        <img src='/logo.svg' className='h-[5svh]'/>
        <button className='w-[5svh] h-[5svh] bg-transparent shadow-none'>
          <img src='/icons/settings-icon.svg'/>
        </button>
      </div>
  );
};

export default ScoreBar;
