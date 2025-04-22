import { FC } from "react";
import "./AboutUs.css";
import { useTranslation } from "react-i18next";
import { Parallax } from "react-parallax";

export const AboutUs: FC = () => {

    const {t} = useTranslation();

  return (
    <Parallax
    blur={{ min: -10, max: 10 }}
    bgImage="/images/parallexBg.webp"
    bgImageAlt="Promo Background"
    strength={300}
  >
    <div className="promo-section">
      <div className="promo-content">
        <div className="promo-content-container">
          <div className="promo-main">
            <div className="promo-card">
              <div className="promo-card-border">
                <p className="promo-title">- QSD SHOP -</p>
                <p className="promo-description">
                  <span>{t('mision')}</span>
                  <br /><br /><br />
                  <span>{t('vision')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Parallax>


  );
};
