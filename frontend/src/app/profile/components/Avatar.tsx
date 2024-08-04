import React, { useState, useEffect } from 'react';
import { SliderPicker } from 'react-color';
import Cookies from 'js-cookie';
import axios from 'axios';

import AvatarDisplay from './AvatarDisplay';
import AvatarFrontDisplay from './AvatarFrontDisplay';
import { useAuth } from '../../../context/AuthContext';

const SketchExample: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [displayColorOrCostume, setDisplayColorOrCostume] = useState(0);
  const [bottomColor, setBottomColor] = useState(user?.color_bottom || '#FFFFFF');
  const [topColor, setTopColor] = useState(user?.color_top || '#FFFFFF');

  useEffect(() => {
    if (user) {
      setBottomColor(user.color_bottom);
      setTopColor(user.color_top);
    }
  }, []);

  const handleClick = () => {
    setDisplayColorOrCostume(prev => {
      if (prev === 2) {
        console.log(0)
        return 0;
      } else {
        console.log(prev + 1)
        return prev + 1;
      }
    });};

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
      {displayColorOrCostume === 1 ? (
        <div className='flex flex-col items-center h-[21svh] w-[22svh] gap-[2svh]'>
          <div className='custom-slider-picker h-[5svh] w-[22svh]'>
            <SliderPicker color={topColor} onChange={handleTopChange} />
          </div>
          <div className='custom-slider-picker h-[5svh] w-[22svh]'>
            <SliderPicker color={bottomColor} onChange={handleBottomChange} />
          </div>
          <button className='h-[2.8svh] p-[0.4svh] m-0 mt-[0.7svh] text-[1.4svh] bg-white' onClick={handleSubmit}>
            Save
          </button>
        </div>
      ) : null}
      <div className='clickable mb-[-2svh] avatar-animate' onClick={handleClick}>
        {displayColorOrCostume === 2 ? (
          <AvatarFrontDisplay bottomColor={bottomColor} topColor={topColor} />
        ):(
          <AvatarDisplay bottomColor={bottomColor} topColor={topColor} />)}
      </div>
    </div>
  );
};

export default SketchExample;