import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LogOut: React.FC = () => {

    const {t}=useTranslation();

    return (
        <Link to="/logOut" className="link">{t('logOut')}</Link>
    );
  };

  export default LogOut;