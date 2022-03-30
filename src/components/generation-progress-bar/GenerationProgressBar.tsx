import React from 'react';
import classNames from 'classnames';

interface Props {
  currentLevel: 1 | 2 | 3;
}

const GenerationProgressBar = ({ currentLevel = 1 }: Props) => {
  return (
    <svg viewBox="0 0 280 64" width="280px" height="64px" className="mx-auto">
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="#79ACE6" />
          <stop offset="100%" stop-color="#79E684" />
        </linearGradient>
      </defs>
      <mask id="mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="44" cy="20" r="12" fill="black" />
        <line x1="60" y1="20" x2="124" y2="20" stroke="black" />
        <circle cx="50%" cy="20" r="12" fill="black" />
        <line x1="156" y1="20" x2="220" y2="20" stroke="black" />
        <circle cx="236" cy="20" r="12" fill="black" />
      </mask>
      <rect x="32" y="8" width="216" height="24" fill="url(#gradient)" />
      <rect
        x="32"
        y="8"
        width="216"
        height="24"
        fill="#5A5A5A"
        className="transition-transform duration-500"
        style={{
          transform: `translateX(${
            24 + (currentLevel - 1) * (4 + 64 + 4 + 24)
          }px)`,
        }}
      />
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="#262626"
        mask="url(#mask)"
      />
      <text
        x="44"
        y="48"
        text-anchor="middle"
        className={classNames(
          'font-secondary text-xs fill-muted transition-colors duration-500',
          {
            'fill-secondary': currentLevel >= 1,
          }
        )}
        fill="#5A5A5A"
      >
        Generation
      </text>
      <text
        x="50%"
        y="48"
        text-anchor="middle"
        className={classNames(
          'font-secondary text-xs fill-muted transition-colors duration-500',
          {
            'fill-secondary': currentLevel >= 2,
          }
        )}
        fill="#5A5A5A"
      >
        Minting
      </text>
      <text
        x="236"
        y="48"
        text-anchor="middle"
        className={classNames(
          'font-secondary text-xs fill-muted transition-colors duration-500',
          {
            'fill-secondary': currentLevel >= 3,
          }
        )}
        fill="#5A5A5A"
      >
        Result
      </text>
    </svg>
  );
};

export default GenerationProgressBar;
