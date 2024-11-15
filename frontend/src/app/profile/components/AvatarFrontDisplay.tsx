import React from 'react';
import { Accessories } from './Accessories';

interface AvatarDisplayProps {
  bottomColor: string;
  topColor: string;
  accessory: number
}

const AvatarFrontDisplay: React.FC<AvatarDisplayProps> = ({ bottomColor, topColor, accessory }) => {
  const fillColor = bottomColor;
  const gradientColor = topColor;

  return (
    <div className='h-[20svh]'>
    <img src={Accessories[accessory].front} className='absolute h-[7.245svh]'/>
    <svg
      viewBox="0 0 132 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[20svh]"
    >
      <defs>
        <style>
          {`
            .cls-1 {
              fill: url(#paint0_linear_94_60);
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
        <linearGradient id="paint0_linear_94_60" x1="0.000126981" y1="66.9278" x2="132" y2="66.9278" gradientUnits="userSpaceOnUse">
          <stop stopColor={gradientColor} stopOpacity="0" />
          <stop offset="0.27" stopColor={gradientColor} stopOpacity="0.0729" />
          <stop offset="0.52" stopColor={gradientColor} stopOpacity="0.25" />
          <stop offset="0.73" stopColor={gradientColor} stopOpacity="0.4356" />
          <stop offset="0.9" stopColor={gradientColor} stopOpacity="0.5776" />
          <stop offset="1" stopColor={gradientColor} stopOpacity="0.8" />
        </linearGradient>
        <clipPath id="clip0_94_60">
          <rect width="132" height="134" fill="white" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip0_94_60)">
        <path
          d="M125.154 41.0789L116.732 48.9046C116.732 48.9046 93.8732 45.2928 80.6389 45.2928C69.7928 45.2928 60.1859 47.7007 60.1859 47.7007C60.1859 47.7007 63.7953 41.0789 63.7953 30.2434C63.7953 14.4776 51.7641 0.144531 31.9127 0.144531C18.6784 0.144531 0.85421 12.6957 0.252652 33.1629C-0.120314 45.7984 4.36731 54.4549 3.98231 55.8033C2.11147 62.3227 0.22859 70.5638 0.0300752 77.7995C-0.391016 93.162 3.27248 101.674 12.0612 112.112C21.6862 123.55 39.7329 133.783 67.3204 134C67.7836 134 68.2408 134 68.698 133.994C69.865 133.976 71.026 133.928 72.175 133.85C79.3757 133.344 86.2996 131.598 92.7182 128.841C98.2105 126.481 103.342 123.381 107.956 119.673C123.783 106.965 133.624 87.1422 131.765 65.766C130.562 51.9205 125.148 41.085 125.148 41.085L125.154 41.0789Z"
          className="cls-4"
          style={{ fill: fillColor }}
        />
        <path
          d="M125.154 40.9344L116.733 48.7601C116.733 48.7601 93.8733 45.1482 80.6391 45.1482C69.793 45.1482 60.1861 47.5562 60.1861 47.5562C60.1861 47.5562 63.7954 40.9344 63.7954 30.0988C63.7954 14.3331 51.7642 0 31.9128 0C18.6785 0 0.85434 12.5512 0.252782 33.0184C-0.120185 45.6539 4.36744 54.3103 3.98244 55.6588C2.1116 62.1782 0.228719 70.4192 0.0302049 77.655C-0.390886 93.0174 3.27261 101.529 12.0614 111.968C21.6863 123.405 39.7331 133.639 67.3205 133.856C67.7837 133.856 68.2409 133.856 68.6981 133.85C69.8651 133.831 71.0262 133.783 72.1751 133.705C79.3758 133.199 86.2997 131.454 92.7184 128.697C98.2106 126.337 103.342 123.237 107.956 119.528C123.783 106.821 133.624 86.9977 131.766 65.6215C130.562 51.776 125.148 40.9404 125.148 40.9404L125.154 40.9344Z"
          className="cls-1"
        />
        <path
          d="M50.9941 41.8554C53.7974 40.1699 54.82 37.2382 51.8062 35.8597L39.3901 30.171L26.9739 35.8597C23.9541 37.2442 24.9827 40.1699 27.786 41.8554C30.9141 43.7336 36.683 45.5274 39.3901 45.5274C42.2354 45.5274 47.866 43.7336 50.9941 41.8554Z"
          className="cls-2"
        />
        <path
          d="M52.6965 30.0265C54.8982 30.6044 57.1481 29.2921 57.7316 27.0949L49.7669 24.994C49.1834 27.1973 50.5008 29.4486 52.6965 30.0265Z"
          className="cls-3"
        />
        <path
          d="M28.947 24.7653L20.9824 26.8662C21.5659 29.0694 23.8157 30.3817 26.0174 29.7978C28.2191 29.2139 29.5305 26.9625 28.947 24.7653Z"
          className="cls-3"
        />
      </g>
    </svg>
    </div>
  );
};

export default AvatarFrontDisplay;
