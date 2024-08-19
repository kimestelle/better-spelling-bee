import React from 'react';
import { InfiniteLogicProvider } from '../components/game-logic/InfiniteLogicProvider';
import { InfiniteDataProvider } from '@/context/InfiniteDataContext';
import PlayInfinite from './PlayInfinite';

const PlayInfiniteWrapper: React.FC = () => {
  return (
    <InfiniteDataProvider>
      <InfiniteLogicProvider>
        <PlayInfinite />
      </InfiniteLogicProvider>
    </InfiniteDataProvider>
  );
};

export default PlayInfiniteWrapper;
