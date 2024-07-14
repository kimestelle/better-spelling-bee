import React from 'react';
import { useGameLogicContext } from './game-logic/GameLogicProvider';

const ScoreBar: React.FC = () => {
  const { points } = useGameLogicContext();

  return (
      <div className="w-full h-[4svh] flex flex-row justify-center items-center px-[3svh]">
        <div className='w-[3svh]'>
          <p>{points}</p>
        </div>
        <img src='/game-assets/score-line.svg'></img>
      </div>
  );
};

export default ScoreBar;
