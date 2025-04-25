
import React from 'react';
import './Input.css';

interface InputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string; 
}

const Input: React.FC<InputProps> = ({ 
  type, 
  name, 
  value, 
  placeholder, 
  onChange, 
  onBlur, 
  className = '' 
}) => {
  return (
    <div className="input-container">
      <input
        className={`input-field ${className}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </div>
  );
};

export default Input;
