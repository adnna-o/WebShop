import { FC } from "react";
import "./News.css";
import Cards from "../Cards/Cards";
import { useTranslation } from "react-i18next";




export const News: FC = () => {

  const {t} = useTranslation();
  return (
    <div className="container">
      <div className="hero-title">
        <h4>  {t('hero-title')}</h4>
      </div>

      <Cards />
    </div>
  );
};

export default News;
