"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (user && user.user) {
      setUsername(user.user.username);
      setPoints(user.points);
      setStreak(user.streak);
    }
  }, [user]);

  const routeDaily = () => {
    router.push('/play/daily');
  };

  const routeInfinite = () => {
    router.push('/play/infinite');
  };

  return (
    <div className='w-[100svw] h-[75svh] flex justify-center bg-blue-600 bg-opacity-20'>
      <div className='w-[50svh] h-full flex flex-col items-center border-red-500 p-[2svh] gap-[1svh]'>
        <h1>{username}</h1>
        <span className='bg-white rounded-[1svh] p-[0.5svh] px-[1svh]'>duckling</span>

        <div className='w-full h-[15svh] flex flex-row my-[10svh] justify-between'>
          <div className='w-[20svh] h-full flex flex-col items-center bg-gradient-to-t from-white to-transparent rounded-[2svh]'>
            <span className="text-[10svh] leading-[10svh] bg-gradient-to-t from-black to-gray-600 bg-clip-text text-transparent">
              {points}
            </span>
            <span>
              points
            </span>
          </div>
          <div className='w-[20svh] h-full flex flex-col items-center bg-gradient-to-t from-white to-transparent rounded-[2svh]'>
            <span className="text-[10svh] leading-[10svh] bg-gradient-to-t from-black to-gray-600 bg-clip-text text-transparent">
                {streak}
            </span>
            <span>
              day streak
            </span>
          </div>
        </div>

        <div className='w-full h-[20svh] flex flex-col gap-[1.5svh] justify-center items-center'>
          <div className='w-full h-[5svh] clickable' onClick={routeDaily}>
            checkbox
            <span className='text-[2.5svh]'>
              PLAY the DAILY
            </span>
          </div>
          <div className='w-full h-[5svh] clickable' onClick={routeInfinite}>
            checkbox
            <span className='text-[2.5svh]'>
              PLAY INFINITE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

