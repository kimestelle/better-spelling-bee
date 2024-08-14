import React, { useState, useEffect } from 'react';
import { SliderPicker, ColorResult } from 'react-color';  // Ensure ColorResult type is imported
import { Accessories } from './Accessories';
// import Cookies from 'js-cookie';
// import axios from 'axios';

import AvatarDisplay from './AvatarDisplay';
import AvatarFrontDisplay from './AvatarFrontDisplay';
import { useAuth } from '../../../context/AuthContext';

const SketchExample: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [displayColorOrCostume, setDisplayColorOrCostume] = useState<number>(0);
  const [bottomColor, setBottomColor] = useState<string>(user?.color_bottom || '#FFFFFF');
  const [topColor, setTopColor] = useState<string>(user?.color_top || '#FFFFFF');
  const [accessory, setAccessory] = useState<number>(user?.accessory || 0);

  useEffect(() => {
    if (user) {
      setBottomColor(user.color_bottom || '#FFFFFF');
      setTopColor(user.color_top || '#FFFFFF');
      setAccessory(user.accessory || 0);
    }
  }, [user]);

// color select functions
  const handleClick = () => {
    setDisplayColorOrCostume(prev => (prev === 2 ? 0 : prev + 1));
  };

  const handleSubmitColor = async () => {
    try {
      await updateUser({ color_bottom: bottomColor, color_top: topColor });
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleBottomChange = (color: ColorResult) => {
    setBottomColor(color.hex);
  };

  const handleTopChange = (color: ColorResult) => {
    setTopColor(color.hex);
  };

// accessory select functions
  const handleAccessoryPrev = () => {
    console.log(accessory)
    setAccessory(prev => {
      if (prev === 0) {
        return Accessories.length - 1
      } else {
        return prev - 1
      }
    }
    )
  }

  const handleAccessoryNext = () => {
    console.log(accessory)
    setAccessory(prev => {
      if (prev === Accessories.length - 1) {
        return 0
      } else {
        return prev + 1
      }
    }
    )
  }

  const handleSubmitAccessory = async () => {
    try {
      await updateUser({ accessory: accessory });
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  return (
    <div className="w-[50svh] h-[25svh] flex flex-row gap-[3svh] justify-end items-end overflow-hidden">
      {displayColorOrCostume === 1 ? (
        // color selector
        <div id='color selector' className='flex flex-col items-center h-[21svh] w-[22svh] gap-[2svh]'>
          <div className='custom-slider-picker h-[5svh] w-[22svh]'>
            <SliderPicker color={topColor} onChange={handleTopChange} />
          </div>
          <div className='custom-slider-picker h-[5svh] w-[22svh]'>
            <SliderPicker color={bottomColor} onChange={handleBottomChange} />
          </div>
          <button className='h-[2.8svh] p-[0.4svh] m-0 mt-[0.7svh] text-[1.4svh] bg-white' onClick={handleSubmitColor}>
            Save
          </button>
        </div>
      ) : (displayColorOrCostume === 2 ? (
        //accessory selector
        <div id='accesory-selector' className='flex justify-center items-center w-[30svh]'>
          <img src='background-assets/sunnies-store.svg'/>
          <button onClick={handleAccessoryPrev} className='absolute w-[5svh] -translate-x-full'>&lt;</button>
          <button onClick={handleSubmitAccessory} className='absolute w-[5svh]'>!</button>
          <button onClick={handleAccessoryNext} className='absolute w-[5svh] translate-x-full'>&gt;</button>
        </div>
      ) : null)}
      <div className='clickable mb-[-2svh] avatar-animate' onClick={handleClick}>
        {displayColorOrCostume === 2 ? (
          <AvatarFrontDisplay bottomColor={bottomColor} topColor={topColor} accessory={accessory}/>
        ):(
          <AvatarDisplay bottomColor={bottomColor} topColor={topColor} accessory={accessory}/>)}
      </div>
    </div>
  );
};

export default SketchExample;
