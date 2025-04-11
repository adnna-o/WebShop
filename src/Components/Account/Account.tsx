import React from 'react';
import { CgProfile } from "react-icons/cg";
import './Account.css'; 
import NavBar from '../TopNavBar/TopNavBar';


interface AccountProps {
  ime: string;
  prezime: string;
  email: string;
}

const Account: React.FC<AccountProps> = ({ ime, prezime, email }) => {
  return (
    <>
    <h1>Account</h1>
    <div className="account-section">
      <CgProfile className="account-icon" />
      <div className="account-info">
        <span className="account-name">{ime} {prezime}</span>
        <span className="account-email">{email}</span>
      </div>
    </div>
    </>
  );
};

export default Account;
