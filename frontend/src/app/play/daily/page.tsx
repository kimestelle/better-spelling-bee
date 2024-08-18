import React from 'react';
import { DailyLogicProvider } from '../components/game-logic/DailyLogicProvider';
import { DailyDataProvider } from '@/context/DailyDataContext';
import PlayDaily from './PlayDaily';

const PlayDailyWrapper: React.FC = () => {
  return (
    <DailyDataProvider>
      <DailyLogicProvider>
        <PlayDaily />
      </DailyLogicProvider>
    </DailyDataProvider>
  );
};

export default PlayDailyWrapper;
