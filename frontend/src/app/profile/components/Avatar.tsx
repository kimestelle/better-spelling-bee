import React, { useState, useEffect } from 'react';
import { SliderPicker } from 'react-color';
import Cookies from 'js-cookie';
import axios from 'axios';

import AvatarDisplay from './AvatarDisplay';
import { useAuth } from '../../../context/AuthContext';

const SketchExample: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [bottomColor, setBottomColor] = useState(user?.color_bottom || '#FFFFFF');
  const [topColor, setTopColor] = useState(user?.color_top || '#FFFFFF');

  useEffect(() => {
    if (user) {
      setBottomColor(user.color_bottom);
      setTopColor(user.color_top);
    }
  }, [user]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleSubmit = async () => {
    try {
      await updateUser({ color_bottom: bottomColor, color_top: topColor });
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleBottomChange = (color: any) => {
    setBottomColor(color.hex);
  };

  const handleTopChange = (color: any) => {
    setTopColor(color.hex);
  };

  return (
    <div className="w-[50svh] h-[25svh] flex flex-row gap-[3svh] justify-end items-end overflow-hidden">
      {displayColorPicker ? (
        <div className='flex flex-col items-end h-[16.5svh] w-[22svh] gap-[2svh]'>
          <div className='custom-slider-picker h-[5svh] w-[22svh]'>
            <SliderPicker color={topColor} onChange={handleTopChange} />
          </div>
          <div className='custom-slider-picker h-[5svh] w-[22svh]'>
            <SliderPicker color={bottomColor} onChange={handleBottomChange} />
          </div>
          <button className='h-[2svh] p-0 pb-[0.6svh] m-0 text-[1.4svh]' onClick={handleSubmit}>
            Save
          </button>
        </div>
      ) : null}
      <div className='clickable mb-[-2svh] avatar-animate' onClick={handleClick}>
        <AvatarDisplay bottomColor={bottomColor} topColor={topColor} />
      </div>
      <p>
        {topColor} {bottomColor}
      </p>
    </div>
  );
};

export default SketchExample;