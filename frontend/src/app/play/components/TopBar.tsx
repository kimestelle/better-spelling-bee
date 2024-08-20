'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import SettingsInterface from './SettingsInterface';

interface TopBarProps {
  daily: boolean;
}

const TopBar: React.FC<TopBarProps> = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleOpenCloseSettings = () => {
    setSettingsOpen(prev => !prev);
  }

  const router = useRouter();
  const routeProfile = () => {
    router.push('/profile');
  };

  return (
      <div className="relative w-full h-[8svh] pt-[2svh] flex flex-row justify-between items-center px-[3svh]">
        <button className='w-[5svh] h-[5svh] mt-[1svh] bg-transparent shadow-none' onClick={routeProfile}>
        <img src='/icons/home-icon.svg'/>
        </button>
        <img src='/logo.svg' className='h-[5svh]'/>
        <button className='w-[5svh] h-[5svh] mt-[1svh] bg-transparent shadow-none' onClick={handleOpenCloseSettings}>
          {settingsOpen ? (
            <img src='/icons/x-icon.svg'/>
          ) : (
            <img src='/icons/settings-icon.svg'/>
          )}
        </button>
        {settingsOpen && (
        <SettingsInterface/>
        )}
      </div>
  );
};

export default TopBar;
