import React from 'react';
import { InfiniteLogicProvider } from '../components/game-logic/InfiniteLogicProvider';
import PlayInfinite from './PlayInfinite';

const PlayInfiniteWrapper: React.FC = () => {
  return (
    <InfiniteLogicProvider>
      <PlayInfinite />
    </InfiniteLogicProvider>
  );
};

export default PlayInfiniteWrapper;
