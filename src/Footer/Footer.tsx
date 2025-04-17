import { FC } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Footer: FC = () => {

   const {t} = useTranslation();
   
  return (
    <div className="footer">
      <div className="main-div">
        <div className="first-div">
          <a
            href="https://www.facebook.com/qsd.ba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              size={30}
              style={{ color: "white", marginRight: "10px" }}
            />
          </a>
          <a
            href="https://www.instagram.com/qsd.ba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} style={{ color: "white" }} />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} style={{ color: "white" }} />
          </a>

          <a
            href="https://ba.linkedin.com/company/qsdbih"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} style={{ color: "white" }} />
          </a>
          <a
            href="https://www.tiktok.com/@qsd.ba?lang=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok size={30} style={{ color: "white" }} />
          </a>
        </div>
        <div className="second-div">
          <div className="qsd">
            <h2>QSD BiH d.o.o</h2>
            <span>hello@qsd.ba</span>
            <span>Dr. Ante Starčevića bb, Mostar, Bosnia and Herzegovina</span>
            <span>direct +387 36 446 089 (BH)</span>
            <span>USA +1 347 352 8633 (NY)</span>
            <span>UK +44 20 3290 1563 (LND)</span>
          </div>
          <div className="customer">
            <h2>{t('customerSupport')}</h2>
            <Link to="/faq?open=true">{t('question')}</Link>
            <Link to="/contact">{t('contact')}</Link>
          </div>
          <div className="legal">
            <h2>{t('agreement')}</h2>
            <a href="/privacy-policy.pdf" download>
            {t('policy')}
            </a>
            <br />
            <a href="/terms-of-service.pdf" download>
            {t('terms')}
            </a>
            <br />
            <a href="/cookie-policy.pdf" download>
            {t('cookie')}
            </a>
          </div>
        </div>
        <div className="third-div">
          <h3>{t('copyright')}</h3>
        </div>
      </div>
    </div>
  );
};
