import React from 'react';

const ArrowRightIcon = ({ size = '1em', color = 'currentColor' }) => (
  <svg
    stroke={color}
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default ArrowRightIcon;
