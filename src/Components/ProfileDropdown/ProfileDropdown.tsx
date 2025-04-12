import React, { useState } from "react";
import Account from "../Account/Account";
import LogOut from "../LogOut/LogOut";
import Settings from "../Settings/Settings";
import "./ProfileDropdown.css";
import SignIn from "../SignIn/SignIn";

const ProfileDropdown: React.FC = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
