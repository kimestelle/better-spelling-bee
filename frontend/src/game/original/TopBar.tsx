'use client';
import { asset } from '../rules';
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
    router.push('/');
  };

  return (
      <div className="relative w-full h-[8svh] pt-[2svh] flex flex-row justify-between items-center px-[3svh]">
        <button aria-label='Back to opening screen' className='w-[5svh] h-[5svh] mt-[1svh] bg-transparent shadow-none' onClick={routeProfile}>
        <img alt="" src={asset('icons/home-icon.svg')}/>
        </button>
        <img alt="" src={asset('logo.svg')} className='h-[5svh]'/>
        <button aria-label='Settings' className='w-[5svh] h-[5svh] mt-[1svh] bg-transparent shadow-none' onClick={handleOpenCloseSettings}>
          {settingsOpen ? (
            <img alt="" src={asset('icons/x-icon.svg')}/>
          ) : (
            <img alt="" src={asset('icons/settings-icon.svg')}/>
          )}
        </button>
        {settingsOpen && (
        <SettingsInterface/>
        )}
      </div>
  );
};

export default TopBar;
