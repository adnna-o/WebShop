import React, { useState, useEffect } from "react";
import i18n from "i18next";
import "./LanguageSwitcher.css"

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(i18n.language || "en");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('i18nextLng', selectedLang); 
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang) {
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    }
  }, []);

  return (
    <div className="language-switcher">
      <select id="language-select" value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="bs">Bosanski</option>
        <option value="hr">Hrvatski</option>
        <option value="sr">Srpski</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
