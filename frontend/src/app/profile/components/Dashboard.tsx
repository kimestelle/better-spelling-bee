"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user && user.user) {
      setUsername(user.user.username);
      setPoints(user.points);
      setStreak(user.streak);
    }
  }, [user]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);

    handleChange(mediaQuery); // Set initial value
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const routeDaily = () => {
    router.push('/play/daily');
  };

  const routeInfinite = () => {
    router.push('/play/infinite');
  };

  return (
    <div
      className='w-[100svw] h-[70svh] bottom-04 flex justify-center mt-[-2.5svh] z-10 pt-[5svh]'
      style={{
        backgroundImage: `url(${
          isDarkMode
            ? '/background-assets/waves-dark.svg'
            : '/background-assets/waves.svg'
        })`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '200svh',
      }}
    >
      <div className='w-[50svh] h-full flex flex-col items-center  gap-[1svh]'>
        <h1>{username}</h1>
        <span className='relative overflow-hidden box-shine bg-white bg-opacity-10 rounded-[1svh] p-[0.5svh] px-[1svh]'>
          duckling
        </span>

        <div className='w-full h-[15svh] flex flex-row mb-[10svh] mt-[5svh] justify-center items-end gap-[10svh]'>
          <div className="w-[15svh] h-[18svh] flex flex-col items-center justify-end bg-[url('/avatar-assets/egg.svg')] bg-contain bg-no-repeat rounded-[2svh]">
            <span className={`text-[7svh] leading-[8svh] bg-gradient-to-t ${isDarkMode ? 'from-white to-gray-100' : 'from-black to-gray-600'} bg-clip-text text-transparent`}>
              {points}
            </span>
            <span>
              points
            </span>
          </div>
          <div className="w-[15svh] h-[19svh] flex flex-col items-center justify-end bg-[url('/avatar-assets/streak-flame.svg')] bg-contain bg-no-repeat rounded-[2svh]">
            <span className={`text-[7svh] leading-[8svh] bg-gradient-to-t ${isDarkMode ? 'from-white to-gray-100' : 'from-black to-gray-600'} bg-clip-text text-transparent`}>
              {streak}
            </span>
            <span>
              day streak
            </span>
          </div>
        </div>

        <div className='w-full h-[15svh] -mt-[3svh] flex flex-col gap-[1.5svh] justify-top items-center'>
          <div className='w-full h-[5svh] flex flex-row gap-[1svh] items-center justify-center bg-button-green overflow-hidden box-shine rounded-[2svh] clickable' onClick={routeDaily}>
            {/* <div className='checkbox w-[3svh] h-[3svh]'></div> */}
            <span className='text-[2.5svh]'>
              PLAY the DAILY
            </span>
          </div>
          <div className='w-full h-[5svh] flex flex-row gap-[1svh] items-center justify-center bg-white bg-opacity-30 rounded-[2svh] clickable' onClick={routeInfinite}>
            {/* <div className='checkbox w-[3svh] h-[3svh]'></div> */}
            <span className='text-[2.5svh]'>
              PLAY INFINITE
            </span>
          </div>
        </div>
        <button onClick={logout} className='rounded-[2svh] bg-button-red'>
          Log Out
        </button>

      </div>
    </div>
  );
}

export default Dashboard;
