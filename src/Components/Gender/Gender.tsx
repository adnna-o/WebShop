import { FC } from "react";
import "./Gender.css";

const Gender: FC = () => {
    return (
      <div className="category-cards">
        <div className="category-card women">
          <span className="category-label">WOMEN</span>
        </div>
        <div className="category-card men">
          <span className="category-label">MEN</span>
        </div>
        <div className="category-card kids">
          <span className="category-label">KIDS</span>
        </div>
      </div>
    );
  };
  export default Gender;