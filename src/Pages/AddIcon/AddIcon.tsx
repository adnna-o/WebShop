import React from "react";

const AddIcon: React.FC<{ width?: number; height?: number; color?: string }> = ({
  width = 22,
  height = 22,
  color = "currentColor",
}) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      <path d="M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm107 229h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z" />
    </svg>
  );
};

export default AddIcon;
