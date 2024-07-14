import React from 'react';

interface ScoreCounterProps {
  score: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score }) => {
  return (
    <div className="score-counter flex flex-col items-center justify-center h-full">
      <div className="score-value text-2xl font-bold">{score}</div>
    </div>
  );
};

export default ScoreCounter;
