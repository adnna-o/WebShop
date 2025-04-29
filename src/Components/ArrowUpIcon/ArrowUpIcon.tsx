import React from 'react';


const ArrowUpIcon = ({ size = "1em", color = "currentColor", style = {}}) => {
  return (
    <svg
      stroke={color}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z" />
    </svg>
  );
};

export default ArrowUpIcon;
