import React from 'react';
import { useGameLogicContext } from './game-logic/GameLogicProvider';

const ScoreBar: React.FC = () => {
  const { points } = useGameLogicContext();

  return (
    <div className="score-bar">
      <p className="score">Score: {points}</p>
    </div>
  );
};

export default ScoreBar;
