import React from 'react';
import { useGameLogicContext } from './game-logic/GameLogicProvider';

const ScoreBar: React.FC = () => {
  const { points, counterPosition } = useGameLogicContext();

  return (
      <div className="w-full h-[4svh] flex flex-row justify-center items-center px-[3svh]">
        <div className='flex justify-center items-center bg-white pt-[0.4svh] absolute w-[4svh] h-[4svh] rounded-[2svh]' style={{ left: `${counterPosition * 5.3 - 3.7}svh` }}>
          <p>{points}</p>
        </div>
        <img src='/game-assets/score-line.svg'></img>
      </div>
  );
};

export default ScoreBar;
