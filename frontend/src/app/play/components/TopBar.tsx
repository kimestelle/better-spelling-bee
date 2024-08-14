import React from 'react';

import { useRouter } from 'next/navigation';

const ScoreBar: React.FC = () => {

  const router = useRouter();

  const routeProfile = () => {
    router.push('/profile');
  };

  return (
      <div className="w-full h-[10svh] flex flex-row justify-between items-center px-[3svh]">
        <button className='w-[5svh] h-[5svh] bg-transparent shadow-none' onClick={routeProfile}>
        <img src='/icons/home-icon.svg'/>
        </button>
        <img src='/logo.svg' className='h-[5svh]'/>
        <button className='w-[5svh] h-[5svh] bg-transparent shadow-none'>
          {/* <div className='face-container'>
            <img src='/avatar-assets/duck-face.svg' className='face'/>
          </div> */}
          <img src='/icons/settings-icon.svg'/>
        </button>
      </div>
  );
};

export default ScoreBar;
