import { FC } from "react";
import "./News.css";
import Cards from "../Cards/Cards";


export const News: FC = () => {
  return (
    <div className="container">
      <div className="hero-title">
        <h4> NEW IN THIS WEEK </h4>
      </div>

      <Cards />
    </div>
  );
};

export default News;
