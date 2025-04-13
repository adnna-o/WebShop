import React, { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import SunIcon from "../SunIcon/SunIcon";

const ThemeSwitcher = () => {
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="theme-switcher">
      <div
        className="switch"
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
        {isDarkMode ? <FaMoon size={20} /> : <SunIcon size={20} />}
        <p className="switch-state" style={{ marginLeft: "10px" }}>
          {isDarkMode ? "Dark mode" : "Light mode"}
        </p>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
