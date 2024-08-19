"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameLogicContext } from '../components/game-logic/InfiniteLogicProvider';

const InfiniteWinScreen: React.FC = () => {
    const router = useRouter();
    const { setWinScreenDisplayed } = useGameLogicContext();
    
    const routeDaily = () => {
        router.push('/play/daily');
      };
    
      const routeHome = () => {
        router.push('/profile');
      };

    const handleReturnToGame = () => {
        setWinScreenDisplayed(true);
      };


  return (
    <div className='relative w-screen h-screen bg-white z-10 overflow-hidden'>
      <motion.div
        className='absolute w-[200%] h-[70svh] bottom-0 flex'
        initial={{ x: '0%' }}
        animate={{ x: '-50%' }}
        transition={{
          duration: 10,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <div className='w-[50%] h-full'>
          <img
            src='/background-assets/waves.svg'
            className='w-full h-full object-cover object-right-top'
          />
        </div>
        <div className='w-[50%] h-full'>
          <img
            src='/background-assets/waves.svg'
            className='w-full h-full object-cover object-left-top'
          />
        </div>
      </motion.div>
      <h1 className='absolute bottom-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        Genius!
      </h1>
      <button onClick={handleReturnToGame} className='absolute bottom-1/3 left-1/2 transform -translate-x-1/2'>
        return to game
      </button>
      <div className='absolute flex flex-row justify-center gap-[3svh] h-[12svh] w-[30svh] left-1/2 transform -translate-x-1/2 bottom-[10svh] border-red'>
      <button className='flex justify-center w-[12svh] h-[12svh] shadow-none bg-transparent active:shadow-none active:scale-110' 
        onClick={routeHome}>
        <img src='/icons/home-icon.svg' className='w-[10svh] h-[10svh]'/>
      </button>
      <button className='flex justify-center w-[12svh] h-[12svh] shadow-none bg-transparent active:shadow-none active:scale-110'>
        <img src='/icons/share-icon.svg' className='w-[10svh] h-[10svh]'/>
      </button>
      </div>
    </div>
  );
};

export default InfiniteWinScreen;
