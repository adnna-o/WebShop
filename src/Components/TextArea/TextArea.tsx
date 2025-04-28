import React from "react";
import "./TextArea.css"; 

interface TextareaProps {
  name: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  className = "",
}) => {
  return (
    <div className="textarea-container">
      <textarea
        className={`textarea-field ${className}`}
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

export default Textarea;
