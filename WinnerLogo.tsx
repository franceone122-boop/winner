import React from 'react';
import { useSportsbook } from '../context/SportsbookContext';

interface WinnerLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customSrc?: string | null;
}

export const WinnerLogo: React.FC<WinnerLogoProps> = ({
  className = '',
  size = 'md',
  customSrc,
}) => {
  const { logoUrl } = useSportsbook();
  const effectiveLogo = customSrc !== undefined ? customSrc : logoUrl;

  const height = size === 'sm' ? 24 : size === 'lg' ? 38 : size === 'xl' ? 48 : 32;

  if (effectiveLogo) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={effectiveLogo}
          alt="Winner Logo"
          style={{ height: `${height}px` }}
          className="max-w-[200px] object-contain"
          onError={(e) => {
            // If image fails to load, fallback to default display
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        height={height}
        viewBox="0 0 176 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Star over the 'i' in signature golden-yellow as in gg.PNG */}
        <g transform="translate(56, 11)">
          <polygon
            points="0,-7 2.2,-2.2 7,-1.5 3.3,2.2 4.4,7 0,4.5 -4.4,7 -3.3,2.2 -7,-1.5 -2.2,-2.2"
            fill="#FFE500"
            stroke="#FFE500"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </g>

        {/* The 'WiNNER' wordmark in crisp white matching user color palette (no red) */}
        <text
          x="4"
          y="34"
          fill="#FFFFFF"
          fontFamily="'Arial Black', 'Impact', 'Trebuchet MS', sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="34"
          letterSpacing="-1.5px"
        >
          W<tspan dx="0.5">i</tspan><tspan dx="0.5">NNER</tspan>
        </text>

        {/* Crisp underline accent in signature golden yellow */}
        <rect
          x="8"
          y="37"
          width="155"
          height="2"
          rx="1"
          fill="#FFE500"
        />
      </svg>
    </div>
  );
};
