
import React from 'react';
import './FilterButton.css';

interface FilterButtonProps {
  label: string | number;
  onClick: () => void;
  isSelected?: boolean;
  customStyle?: React.CSSProperties;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, onClick, isSelected = false, customStyle, className = '' }) => {
  return (
    <button
    className={`filter-button ${isSelected ? 'selected' : ''} ${className}`}
      onClick={onClick}
      style={customStyle}
    >
      {label}
    </button>
  );
};

export default FilterButton;
