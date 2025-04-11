import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopNavBar.css';
import { CiHeart } from "react-icons/ci";
import { RiShoppingBasketLine } from "react-icons/ri";
import { CgProfile, CgMenu } from "react-icons/cg";
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

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
            <Link to="/women" className="nav-link">Women</Link>
            <Link to="/men" className="nav-link">Men</Link>
            <Link to="/children" className="nav-link">Children</Link>
            <Link to="/all" className="nav-link">All</Link>
          </div>
        </div>

        <div className="navbar-right">
          <button className="hamburger-menu" onClick={toggleMobileMenu}>
            <CgMenu />
          </button>
          <Link to="/favourites" className="icon-link"><CiHeart /></Link>
          <Link to="/cart" className="icon-link"><RiShoppingBasketLine /></Link>
          <Link to="/profile" className="icon-link" onClick={toggleDropdown}>
            <CgProfile />
          </Link>
          {isDropdownVisible && <ProfileDropdown />}
        </div>
      </nav>

      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/women" className="mobile-nav-link">Women</Link>
          <Link to="/men" className="mobile-nav-link">Men</Link>
          <Link to="/children" className="mobile-nav-link">Children</Link>
          <Link to="/all" className="mobile-nav-link">All</Link>
        </div>
      )}
    </>
  );
};

export default NavBar;