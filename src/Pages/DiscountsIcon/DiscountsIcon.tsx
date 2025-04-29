// components/icons/ShippingIcon.jsx
import React from "react";

const ShippingIcon = ({ size = "1em", color = "var(--white)", className = "" }) => {
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
      <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M12.5 17h-6.5v-14h-2" />
      <path d="M6 5l14 1l-.859 6.011m-6.141 .989h-7" />
      <path d="M16 21l5 -5" />
      <path d="M21 21v.01" />
      <path d="M16 16v.01" />
    </svg>
  );
};

export default ShippingIcon;
