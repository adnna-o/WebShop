import React, { useEffect, useState } from "react";
import Account from "../Account/Account";
import Settings from "../Settings/Settings";
import "./ProfileDropdown.css";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/slices/authSlice";



const ProfileDropdown: React.FC = () => {

 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<{ ime: string; prezime: string; email: string } | null>(null);

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
      console.error("Greška pri parsiranju korisnika iz localStorage:", error);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
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
          <div className="log-out" onClick={handleLogout}>Log Out
          </div>
        </>
      ) : (
        <>
          <div className="profile-settings">
            <Settings />
          </div>
          <div className="sign-in">
          <Link to="/login" className="sign-in">SignIn</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

