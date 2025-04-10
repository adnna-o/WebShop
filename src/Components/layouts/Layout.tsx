import React from "react";


import { Outlet } from "react-router-dom";
import { Footer } from "../../Footer";
import "./Layout.css";
import NavBar from "../TopNavBar/TopNavBar";

const Layout = () => {
  return (
    <>
      
      <div className="layout-container">
      <NavBar /> 
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
      
    </>
  );
};

export default Layout;