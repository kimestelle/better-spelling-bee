import React, { useState } from 'react';
import { SliderPicker } from 'react-color';

import AvatarDisplay from './AvatarDisplay';

const SketchExample: React.FC = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({ r: '241', g: '112', b: '19', a: '1' });
  const [topColor, setTopColor] = useState({ r: '241', g: '112', b: '19', a: '1' });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.rgb);
  };

  const handleTopChange = (topColor: any) => {
    setTopColor(topColor.rgb);
  };


  return (
    <div className="w-full h-[25svh] flex flex-row gap-[3svh] justify-end items-end overflow-hidden">
      {displayColorPicker ? (
        <div className='flex flex-col h-[13.5svh] w-[15svh] gap-[2svh]'>
            <div className='custom-slider-picker h-[5svh] w-[15svh] '>
                <SliderPicker color={topColor} onChange={handleTopChange}  />
            </div>
            <div className='custom-slider-picker h-[5svh] w-[15svh] '>
                <SliderPicker color={color} onChange={handleChange} />
            </div>
        </div>
      ) : null}
      <div className='clickable mb-[-2svh] avatar-animate' onClick={handleClick}>
        <AvatarDisplay color={color} topColor={topColor} />
      </div>
    </div>
  );
};

export default SketchExample;