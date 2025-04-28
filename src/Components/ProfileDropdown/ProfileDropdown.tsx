import React, { useEffect, useState } from "react";
import Account from "../Account/Account";
import Settings from "../Settings/Settings";
import "./ProfileDropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axiosInstance";



const ProfileDropdown: React.FC = () => {

 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<{ ime: string; prezime: string; email: string } | null>(null);
  const {t} = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const storedUserObj = Array.isArray(parsedUser) ? parsedUser[0] : parsedUser;
  
        if (storedUserObj && storedUserObj.first_name && storedUserObj.last_name && storedUserObj.email) {
          setUserData({
            ime: storedUserObj.first_name,
            prezime: storedUserObj.last_name,
            email: storedUserObj.email
          });
          setIsLoggedIn(true);
        }
  
        if (storedUserObj?.role?.name?.toLowerCase() === "admin") {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  const handleLogout = async () => {
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
   
  };

  return (
    <div className="profile-dropdown">
      {isLoggedIn && userData ? (
        <>
          <div className="profile-account">
            <Account ime={userData.ime} prezime={userData.prezime} email={userData.email} />
          </div>
          <div className="profile-settings">
            <Settings />
          </div>
          {isAdmin ? (
          <Link to="/adminPanel" className="admin-panel">Admin panel</Link>) : null}
          <div className="log-out" onClick={handleLogout}>{t('logOut')}
          </div>
        </>
      ) : (
        <>
          <div className="profile-settings">
            <Settings />
          </div>
          <div className="sign-in">
          <Link to="/login" className="sign-in">{t('signIn')}</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;


