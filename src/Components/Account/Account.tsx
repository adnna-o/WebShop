import React from 'react';
import './Account.css'; 
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { useTranslation } from 'react-i18next';


interface AccountProps {
  ime: string;
  prezime: string;
  email: string;
}

const Account: React.FC<AccountProps> = ({ ime, prezime, email }) => {
  
   const {t} = useTranslation();

  return (
    <>
    <div className="section-title">{t('account')}</div>
    <div className="account-section">
      <div className="account-icon"><ProfileIcon width = {60} height = {60} /></div>
      <div className="account-info">
        <span className="account-name">{ime} {prezime}</span>
        <span className="account-email">{email}</span>
      </div>
    </div>
    </>
  );
};

export default Account;
