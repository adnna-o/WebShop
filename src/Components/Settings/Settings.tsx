import { Link } from 'react-router-dom';
import "./Settings.css"
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {

  const {t}=useTranslation();
  return (
    <>
      <div className="section-name">{t('settings')}</div>
      <div className="link-container">
        <Link to="/personalSettings" className="link">{t('personalSettings')}</Link>
        <LanguageSwitcher/>
        <Link to="/faq" className="link">{t('FAQ')}</Link>
      </div>
      <div className='switch-theme'>
        <ThemeSwitcher/>
      </div>
    </>
  );
};

export default Settings;
