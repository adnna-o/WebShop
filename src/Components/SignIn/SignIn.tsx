import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {

    const {t}=useTranslation();

    return (
        <Link to="/signIn" className="link">{t('signIn')}</Link>
    );
  };

  export default SignIn;