import React from 'react';
import { MdFavoriteBorder, MdShoppingCart } from 'react-icons/md';
import './PersonalSettings.css';
import NavBar from '../TopNavBar/TopNavBar';
import { Link , Outlet} from 'react-router-dom';


const PersonalSettings: React.FC = () => {
  return (
    <>
    <div className="personal-settings">
      <h2 className="settings-title">My Account</h2>

      <div className="user-panel">
        <h3 className="panel-title">User Panel</h3>

        <div className="panel-list-container">
          <ul className="panel-list">
            <li className="panel-item">
            <Link to="userData" className="panel-link">User Data</Link>
            </li>
            <li className="panel-item">Edit Profile</li>
            <li className="panel-item">Change Password</li>
            <li className="panel-item">My Orders</li>
            <li className="panel-item">Favourites</li>
          </ul>
        </div>
        </div>

        <div className="icon-section">
          <div className="icon-box">
            <MdFavoriteBorder className="panel-icon" />
          </div>
          <div className="icon-box">
            <MdShoppingCart className="panel-icon" />
          </div>
        </div>

    </div>
    <div className="settings-content">
        <Outlet /> {/* Ovdje će se renderovati UserData ili druge nested komponente */}
    </div>
    </>
    
  );
};

export default PersonalSettings;
