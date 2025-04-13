import React, { useState } from "react";

const LanguageSwitcher = () => {
  
  const [language, setLanguage] = useState("en"); 

  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    console.log("Selected language:", e.target.value);
  };

  return (
    <div className="language-switcher">
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="bs">Bosanski</option>
        <option value="hr">Hrvatski</option>
        <option value="sr">Srpski</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
