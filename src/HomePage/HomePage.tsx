
import { FC } from "react";
import "./HomePage.css";
import { AboutUs } from "../Components/AboutUs";
import Gender from "../Components/Gender/Gender";
import { useTranslation } from "react-i18next";


export const HomePage: FC = () => {

  const {t} = useTranslation();

  return (
    <>
     
      <div
        className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">{t('subtitle')}</p>
          <p className="hero-title">{t("title")}</p>
          <button className="hero-button">{t("button")}</button>
        </div>
      </div>
      <Gender />
      <AboutUs />

    </>
  );
};
