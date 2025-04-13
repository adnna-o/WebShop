import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../Footer/Footer";
import "./layouts.css";
import NavBar from "../TopNavBar/TopNavBar";
const Layout = () => {
  return (
    <>
    
      <div className="layout-container" data-theme="light">
      <NavBar/>
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
};
export default Layout;