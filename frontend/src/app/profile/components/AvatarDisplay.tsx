import React from 'react';
import { Accessories } from './Accessories';

interface AvatarDisplayProps {
  bottomColor: string;
  topColor: string;
  accessory: number;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ bottomColor, topColor, accessory }) => {
  const fillColor = bottomColor;
  const gradientColor = topColor;

  return (
    <div className='h-[20svh]'>
          <img src={Accessories[accessory].side} className='absolute h-[7.245svh]'/>
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 235.33 222.36"
      className="h-[20svh]"
    >
      <defs>
        <style>
          {`
          .cls-1 {
            fill: url(#linear-gradient);
          }
          .cls-1, .cls-2, .cls-3, .cls-4 {
            stroke-width: 0px;
          }
          .cls-2 {
            fill: #ffa607;
          }
          .cls-3 {
            fill: #000;
          }
          .cls-4 {
            fill: #F8E7A0;
          }
        `}
        </style>
        <linearGradient
          id="linear-gradient"
          x1="15.9"
          y1="111.18"
          x2="235.33"
          y2="111.18"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={gradientColor} stopOpacity="0" />
          <stop offset="1" stopColor={gradientColor} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <g id="Layer_2-2" data-name="Layer 2">
        <path
          className="cls-4"
          style={{ fill: fillColor }}
          d="M234.95,109c-2-23-11-41-11-41l-14,13s-38-6-60-6c-18.03,0-34,4-34,4,0,0,6-11,6-29C121.95,23.81,101.95,0,68.95,0,46.95,0,26.95,17,28.36,37.07c0,0,12.35,19.91,10.59,26.93-1,4-10,9-10,9,0,0-12.33,31.47-13,56-.7,25.52,5.39,39.66,20,57,16,19,46,36,91.86,36.36.77,0,1.53,0,2.29-.01,1.94-.03,3.87-.11,5.78-.24,11.97-.84,23.48-3.74,34.15-8.32,9.13-3.92,17.66-9.07,25.33-15.23,26.31-21.11,42.67-54.04,39.58-89.55Z"
        />
        <path
          className="cls-3"
          d="M57.64,34.85c0,3.78-3.06,6.85-6.85,6.85s-6.85-3.06-6.85-6.85"
        />
        <path
          className="cls-2"
          d="M28.36,37.07c-.4-.08-.82-.12-1.24-.12-3.66,0-6.63,2.97-6.63,6.63,0,.89.18,1.73.49,2.51L2.64,55.77c-4.35,2.3-2.87,7.16,1.17,9.96,6.15,4.26,25.15,7.26,25.15,7.26,0,0,9-5,10-9,1.75-7.02-10.59-26.93-10.59-26.93Z"
        />
        <path
          className="cls-1"
          d="M234.95,109c-2-23-11-41-11-41l-14,13s-38-6-60-6c-18.03,0-34,4-34,4,0,0,6-11,6-29C121.95,23.81,101.95,0,68.95,0,46.95,0,26.95,17,28.36,37.07c0,0,12.35,19.91,10.59,26.93-1,4-10,9-10,9,0,0-12.33,31.47-13,56-.7,25.52,5.39,39.66,20,57,16,19,46,36,91.86,36.36.77,0,1.53,0,2.29-.01,1.94-.03,3.87-.11,5.78-.24,11.97-.84,23.48-3.74,34.15-8.32,9.13-3.92,17.66-9.07,25.33-15.23,26.31-21.11,42.67-54.04,39.58-89.55Z"
        />
      </g>
    </svg>
    </div>
  );
};

export default AvatarDisplay;
