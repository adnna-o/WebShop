import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './TopNavBar.css';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import CartIcon from '../CartIcon/CartIcon';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import MenuIcon from '../MenuIcon/MenuIcon';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setGenderFilter } from '../../Redux/slices/filterSlice';


const NavBar: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

   const {t} = useTranslation();

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const path = location.pathname;
  
    switch (path) {
      case '/women':
        dispatch(setGenderFilter([2]));
        break;
      case '/men':
        dispatch(setGenderFilter([1]));
        break;
      case '/children':
        dispatch(setGenderFilter([3]));
        break;
      case '/all':
        dispatch(setGenderFilter([])); 
        break;
      default:
        break;
    }
  }, [location.pathname, dispatch]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src="/images/qsd_logo.png" alt="Logo" className="logo-img" />
          </Link>
          <div className="desktop-links">
          <NavLink to="/shop/women" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> {t('women').toString()} </NavLink>
          <NavLink to="/shop/men" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> {t('men').toString()} </NavLink>
          <NavLink to="/shop/children"className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> {t('children').toString()}</NavLink>
          <NavLink to="/shop/all"className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('all').toString()} </NavLink>
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
          <NavLink to="/shop/women"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> Women </NavLink>
          <NavLink to="/shop/men"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> Men </NavLink>
          <NavLink to="/shop/children"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> Children </NavLink> 
          <NavLink to="/shop/all"className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}> All </NavLink>
        </div>
      )}
    </>
  );
};

export default NavBar;