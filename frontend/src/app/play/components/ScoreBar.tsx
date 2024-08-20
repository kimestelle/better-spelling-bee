import React from 'react';

interface ScoreBarProps {
  points: number;
  counterPosition: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ points, counterPosition }) => {
  return (
    <div className="w-full h-[4svh] flex flex-row justify-center items-center px-[3svh]">
      <div className='flex justify-center items-center bg-white pt-[0.4svh] absolute w-[4svh] h-[4svh] pb-[0.2svh] rounded-[2svh]' style={{ left: `${counterPosition * 5.3 - 3.7}svh` }}>
        <p className='inverse-color'>{points}</p>
      </div>
      <img src='/game-assets/score-line.svg' alt="Score Line"/>
    </div>
  );
};

export default ScoreBar;
