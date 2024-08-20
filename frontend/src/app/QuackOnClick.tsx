// QuackOnClick.tsx

'use client'
import { useEffect } from 'react';

export function useQuackOnClick() {
  useEffect(() => {
    const smallQuack = '/audio/small-quack.mp3';
    const smallSound = new Audio(smallQuack);

    const bigQuack = '/audio/big-quack.mp3';
    const bigSound = new Audio(bigQuack);

    const playSound = () => {
      const randomProb = Math.floor(Math.random() * 8);
      console.log('quack')

      // 1/8 chance to play big quack
      if (randomProb === 0) {
        bigSound.currentTime = 0;
        bigSound.play();
      } else {
        // 7/8 chance to play small quack
        smallSound.currentTime = 0;
        smallSound.play();
      }
    };


    document.addEventListener('mousedown', playSound);
    document.addEventListener('keydown', playSound);
    document.addEventListener('touchstart', playSound);

    return () => {
      document.removeEventListener('mousedown', playSound);
      document.removeEventListener('keydown', playSound);
      document.removeEventListener('touchstart', playSound);
    };
  }, []);
}
