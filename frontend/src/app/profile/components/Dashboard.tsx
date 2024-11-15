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
    const handleChange = (e: any) => setIsDarkMode(e.matches);

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
      className='w-[100svw] h-[70svh] bottom-04 flex flex-col justify-center items-center  mt-[-2.5svh] z-10 pt-[5svh]'
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
      <div className='w-[50svh] h-full flex flex-col items-center justify-center gap-[1svh] bg-white bg-opacity-30 p-[2svh] pb-[1svh] mb-[2svh] rounded-[5svh]'>
        <h1 className={`${username.length >= 11 ? 'text-[3svh]' : ''} text-center overflow-auto w-[48svh]`}>{username}</h1>
        {/* <div className='flex flex-row gap-[1svh]'> */}
        <span className='relative overflow-hidden bg-white bg-opacity-30 rounded-[1svh] p-[0.5svh] px-[1svh]'>
  {/* different nickname by tier */}
            {points <= 100 ? 'duckling' : (
              points <= 500 ? 'wobbly wings' : (
                points  <= 1000 ? 'big bird' : (
                  points <= 2000 ? 'chief chirper' : (
                    points <= 5000 ? 'queen quacker' : 'idek'
                  )
                )
              )
            )}
          </span>
        {/* </div> */}
        <div className='w-full h-[21svh] flex flex-row justify-center items-end gap-[10svh]'>
          <div className="w-[17svh] h-[21svh] flex flex-col items-center justify-end bg-[url('/avatar-assets/egg.svg')] bg-contain bg-center bg-no-repeat rounded-[2svh] pb-[1svh]">
            <span className={`${points >= 100 ? 'text-[3svh]': 'text-[7svh]'} leading-[8svh] bg-gradient-to-t ${isDarkMode ? 'from-white to-gray-100' : 'from-black to-gray-600'} bg-clip-text text-transparent`}>
              {points}
            </span>
            <span>
              points
            </span>
          </div>
          <div className="w-[17svh] h-[21svh] flex flex-col items-center justify-end bg-[url('/avatar-assets/streak-flame.svg')] bg-contain bg-center bg-no-repeat rounded-[2svh] pb-[1svh]">
            <span className={`${streak >= 100 ? 'text-[3svh]': 'text-[7svh]'} leading-[8svh] bg-gradient-to-t ${isDarkMode ? 'from-white to-gray-100' : 'from-black to-gray-600'} bg-clip-text text-transparent`}>
              {streak}
            </span>
            <span>
              day streak
            </span>
          </div>
        </div>
        {/* <span className='absolute overflow-hidden underline box-shine bg-opacity-30 rounded-[1svh] p-[0.5svh] px-[1svh]'>
              leaderboard &gt;
        </span> */}

        <div className='w-full h-[15svh] flex flex-col gap-[1.5svh] mt-[5svh] justify-top items-center'>
          <div className='w-full h-[5svh] flex flex-row gap-[1svh] items-center justify-center bg-button-green box-shadow overflow-hidden box-shine rounded-[2svh] clickable' onClick={routeDaily}>
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
      </div>
      <button onClick={logout} className='rounded-[2svh] bg-button-red'>
          Log Out
        </button>
    </div>
  );
}

export default Dashboard;
