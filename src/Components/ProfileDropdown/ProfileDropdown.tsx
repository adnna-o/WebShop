import React, { useEffect, useState } from "react";
import Account from "../Account/Account";
import LogOut from "../LogOut/LogOut";
import Settings from "../Settings/Settings";
import "./ProfileDropdown.css";
import { Link } from "react-router-dom";
import SignIn from "../../Pages/SignIn/SignIn";


const ProfileDropdown: React.FC = () => {

 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserObj = storedUser ? JSON.parse(storedUser) : null;
    if(storedUser)
      setIsLoggedIn(true); 
    if(storedUserObj.role==="admin")
      setIsAdmin(true);
  }, []);

  return (
    <div className="profile-dropdown">
      {isLoggedIn ? (
        <>
          <div className="profile-account">
            <Account ime="Amar" prezime="Prez" email="amar@gmail.com" />
          </div>
          <div className="profile-settings">
            <Settings />
          </div>
          {isAdmin ? (
          <Link to="/adminPanel" className="admin-panel">Admin panel</Link>) : null}
          <div className="log-out">
            <LogOut />
          </div>
        </>
      ) : (
        <>
          <div className="profile-settings">
            <Settings />
          </div>
          <div className="sign-in">
          <Link to="/signIn" className="sign-in">SignIn</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
