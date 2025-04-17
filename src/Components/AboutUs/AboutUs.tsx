import { FC } from "react";
import "./AboutUs.css";
import { useTranslation } from "react-i18next";

export const AboutUs: FC = () => {

    const {t} = useTranslation();

  return (
    <div className="promo-section">
  <div className="promo-image">
    <img src="/images/parallexBg.webp" alt="Promo background" />
  </div>

  <div className="promo-content">
    <div className="promo-content-container">
      <div className="promo-main">
        <div className="promo-card">
          <div className="promo-card-border">
            <p className="promo-title">- QSD SHOP -</p>
            <p className="promo-description">
              <span>
              {t('mision').toString()}
              </span>
              <br></br>
              <br></br>
              <br></br>
              <span>
              {t('vision').toString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
