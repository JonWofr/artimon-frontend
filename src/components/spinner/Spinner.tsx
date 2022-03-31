import React from 'react';

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => {
  return (
    <div className={className}>
      <svg className="w-20 h-20 mx-auto animate-spin-slow" viewBox="0 0 50 50">
        <circle
          className="[stroke-linecap:round] stroke-accentTo animate-dash"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner;
