import React, { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import SunIcon from "../SunIcon/SunIcon";
import "./ThemeSwitcher.css";
import { ThemeContext } from "../../Contex/ThemeContex";


const ThemeSwitcher: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  return (
    <div className="theme-switcher">
      <div className="switch" onClick={() => setIsDarkMode(!isDarkMode)}> 
        {isDarkMode ? <SunIcon size={20} /> : <FaMoon size={20} />}
        <p className="switch-state">
          {isDarkMode ? "Light mode" : "Dark mode"}
        </p>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
