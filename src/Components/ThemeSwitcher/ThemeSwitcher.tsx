import React, { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import SunIcon from "../SunIcon/SunIcon";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
  }, [isDarkMode]);

  return (
    <div className="theme-switcher">
      <div
        className="switch"
        onClick={() => setIsDarkMode(!isDarkMode)} >
        {isDarkMode ? <FaMoon size={20} /> : <SunIcon size={20} />}
        <p className="switch-state">
          {isDarkMode ? "Dark mode" : "Light mode"}
        </p>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
