'use client';

import React from 'react';
import { DailyLogicProvider } from '../components/game-logic/DailyLogicProvider';
import PlayDaily from './PlayDaily';

const PlayDailyWrapper: React.FC = () => {
  return (
    <DailyLogicProvider>
      <PlayDaily />
    </DailyLogicProvider>
  );
};

export default PlayDailyWrapper;
