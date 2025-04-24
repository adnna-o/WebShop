
import React from "react";

const CategoriesIcon = ({ size = "1em", color = "var(--white)", className = "" }) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.464 6.518a6 6 0 1 0 -3.023 7.965" />
      <path d="M17.482 17.464a6 6 0 1 0 -7.965 -3.023" />
      <path d="M6.54 17.482a6 6 0 1 0 3.024 -7.965" />
      <path d="M6.518 6.54a6 6 0 1 0 7.965 3.024" />
    </svg>
  );
};

export default CategoriesIcon;
