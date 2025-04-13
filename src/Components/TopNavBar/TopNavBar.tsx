import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './TopNavBar.css';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import CartIcon from '../CartIcon/CartIcon';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import MenuIcon from '../MenuIcon/MenuIcon';

const NavBar: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src="/images/qsd_logo.png" alt="Logo" className="logo-img" />
          </Link>
          <div className="desktop-links">
          <NavLink to="/women" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> Women </NavLink>
          <NavLink to="/men" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> Men </NavLink>
          <NavLink to="/children"className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> Children </NavLink>
          <NavLink to="/all"className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> All </NavLink>
          </div>
        </div>

        <div className="navbar-right">
          <button className="hamburger-menu" onClick={toggleMobileMenu}>
            <MenuIcon/>
          </button>
          <Link to="/favourites" className="icon-link"><FavouritesIcon /></Link>
          <Link to="/cart" className="icon-link"><CartIcon /></Link>
          <Link to="/profile" className="icon-link" onClick={toggleDropdown}>
            <ProfileIcon />
          </Link>
          {isDropdownVisible && <ProfileDropdown />}
        </div>
      </nav>

      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/women"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> Women </NavLink>
          <NavLink to="/men"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> Men </NavLink>
          <NavLink to="/children"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> Children </NavLink> 
          <NavLink to="/all"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> All </NavLink>
        </div>
      )}
    </>
  );
};

export default NavBar;