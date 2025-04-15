import React from 'react';

interface ProfileIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  width = 34,
  height = 34,
  color = "#6c63ff",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="-2.4 -2.4 28.80 28.80"
      fill={color}
    >
      <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
    </svg>
  );
};

export default ProfileIcon;
