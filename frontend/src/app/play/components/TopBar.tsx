import React from 'react';
import { useGameLogicContext } from './game-logic/GameLogicProvider';

const ScoreBar: React.FC = () => {
  const { points } = useGameLogicContext();

  return (
      <div className="w-full h-[10svh] flex flex-row justify-between items-center px-[3svh]">
        <img src='/icons/home-icon.svg' className='h-[3.5svh]'/>
        <img src='/logo.svg' className='h-[5svh]'/>
        <img src='/icons/settings-icon.svg' className='h-[3.5svh]'/>
      </div>
  );
};

export default ScoreBar;
