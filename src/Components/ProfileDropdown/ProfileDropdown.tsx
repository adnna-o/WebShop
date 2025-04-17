import React, { useEffect, useState } from "react";
import Account from "../Account/Account";
import LogOut from "../LogOut/LogOut";
import Settings from "../Settings/Settings";
import "./ProfileDropdown.css";
import SignIn from "../SignIn/SignIn";
import { Link } from "react-router-dom";


const ProfileDropdown: React.FC = () => {

 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    setIsLoggedIn(true); 
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
          <Link to="/adminPanel" className="admin-panel">Admin panel</Link>
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
           <SignIn/> 
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
