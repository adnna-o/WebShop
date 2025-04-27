import React from "react";
import "./Select.css"; // Napravi ako želiš dodatne stilove

interface SelectProps {
  name: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  className?: string;
  options: { label: string; value: string | number }[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  onBlur,
  className = "",
  options,
  placeholder,
}) => {
  return (
    <div className="select-container">
      <select
        className={`select-field ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
