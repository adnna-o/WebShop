
import { FC } from "react";
import "./HomePage.css";
import { AboutUs } from "../Components/AboutUs";
import Gender from "../Components/Gender/Gender";


export const HomePage: FC = () => {
  return (
    <>
     
      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/images/web_shop1.webp')",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">IN THE MOOD FOR NEW</p>
          <h1 className="hero-title">STYLE</h1>
          <button className="hero-button">SHOP NOW</button>
        </div>
      </div>
      <Gender />
      <AboutUs />

    </>
  );
};
