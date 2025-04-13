import { Link } from 'react-router-dom';
import "./Settings.css"
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Settings: React.FC = () => {
  return (
    <>
      <div className="section-name">Settings</div>
      <div className="link-container">
        <Link to="/personalSettings" className="link">Personal Settings</Link>
        <LanguageSwitcher/>
        <Link to="/faq" className="link">FAQ</Link>
      </div>
      <div className='switch-theme'>
        <ThemeSwitcher/>
      </div>
    </>
  );
};

export default Settings;
