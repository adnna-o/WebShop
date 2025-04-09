import { FC } from "react";
import "./Footer.css";
import { FAQ } from "../FAQ";
import { Link } from "react-router-dom";

export const Footer: FC=()=>{
    return (
  
  <div className="footer">
      <div className="main-div">
        <div className="first-div">
          <h2>Ikone</h2>
        </div>
        <div className="second-div">
          <div className="qsd">
            <h2>QSD BiH d.o.o</h2>
            <span>hello@qsd.ba</span>
            <span>Dr. Ante Starčevića bb, Mostar, Bosnia and Herzegovina</span>
            <span>direct +387 36 446 089 (BH)</span>
            <span>USA +1 347 352 8633 (NY)</span>
            <span>UK +44 20 3290 1563 (LND)</span>
          </div>
          <div className="customer">
            <h2>Customer support</h2>
            <Link to="/faq" style={{ textDecoration: 'none', color: 'white' }}>Freuqently Asked Questions</Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>Contact us</Link>
          </div>
          <div className="legal">
            <h2>Legal agreement</h2>
            
          </div>
        </div>
        <div className="third-div">
          <h3>Copyright © 2025 QSD BH. All Rights Reserved</h3>
        </div>
      </div>
    </div>
    );
}