import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../Footer/Footer";
import "./layouts.css";
import NavBar from "../TopNavBar/TopNavBar";
import { ThemeContext } from "../../Contex/ThemeContex";


const Layout: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="layout-container" data-theme={isDarkMode ? "dark" : "light"}>
      <NavBar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;