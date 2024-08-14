"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
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
    <div className='w-[100svw] h-[75svh] bottom-0 flex justify-center bg-[url("/background-assets/waves.svg")] bg-repeat-x bg-[length:200svh] mt-[-2.5svh] z-10 pt-[5svh]'>
      <div className='w-[50svh] h-full flex flex-col items-center p-[2svh] gap-[1svh]'>
        <h1>{username}</h1>
        <span className='bg-white rounded-[1svh] p-[0.5svh] px-[1svh]'>duckling</span>

        <div className='w-full h-[15svh] flex flex-row my-[10svh] justify-center items-end gap-[10svh]'>
          <div className="w-[15.5svh] h-[18svh] flex flex-col items-center justify-end bg-[url('/avatar-assets/egg.svg')] bg-cover rounded-[2svh]">
            <span className="text-[7svh] leading-[8svh] bg-gradient-to-t from-black to-gray-600 bg-clip-text text-transparent">
              {points}
            </span>
            <span>
              points
            </span>
          </div>
          <div className="w-[15.5svh] h-[19svh] flex flex-col items-center justify-end bg-[url('/avatar-assets/streak-flame.svg')] bg-cover rounded-[2svh]">
            <span className="text-[7svh] leading-[8svh] bg-gradient-to-t from-black to-gray-600 bg-clip-text text-transparent">
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
        <button onClick={logout}>
          Log Out
        </button>

      </div>
    </div>
  );
}

export default Dashboard;

