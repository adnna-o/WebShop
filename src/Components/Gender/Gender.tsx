import { FC } from "react";
import "./Gender.css";
import { useTranslation } from "react-i18next";

const Gender: FC = () => {

  const {t} = useTranslation();
  
    return (
      <div className="category-cards">
        <div className="category-card women">
          <span className="category-label">{t('women').toString()}</span>
        </div>
        <div className="category-card men">
          <span className="category-label">{t('men').toString()}</span>
        </div>
        <div className="category-card kids">
          <span className="category-label">{t('children').toString()}</span>
        </div>
      </div>
    );
  };
  export default Gender;