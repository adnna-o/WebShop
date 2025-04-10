import React from 'react';
import {Link} from 'react-router-dom'
import './TopNavBar.css'
import { CiHeart } from "react-icons/ci";
import { RiShoppingBasketLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";



const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
    <div className="navbar-left">
      <Link to="/" className="logo">
       <img src="/images/qsd_logo.png" alt="Logo" className="logo-img" />
      </Link>
      <Link to="/women" className="nav-link">Women</Link>
      <Link to="/men" className="nav-link">Men</Link>
      <Link to="/children" className="nav-link">Children</Link>
      <Link to="/all" className="nav-link">All</Link>
    </div>

    <div className="navbar-right">
      <Link to="/favourites" className="icon-link"><CiHeart/></Link>
      <Link to="/cart" className="icon-link"><RiShoppingBasketLine/></Link>
      <Link to="/profile" className="icon-link"><CgProfile/></Link>
    </div>
  </nav>
  );
};

export default NavBar;
