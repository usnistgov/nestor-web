import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import text from "../../assets/language/en.js";

const Home = () => {
  return (
    <div className="home-container">
      <div className="title">{text.home.header}</div>
      <div className="button text-center">
        <button className="btn-dark">
          <NavLink to="/taggingTool/settings/upload">{text.home.button}</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Home;
