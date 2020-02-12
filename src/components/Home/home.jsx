import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import text from "../../assets/language/en.js";
import Button from "../CommonComponents/Button/button";



class Home extends Component
{
  render()
  {
    return (
      <div className="home-container">
        <div className="title">{ text.home.header }</div>
        <div className="button text-center">
          <button className="btn-dark">
            <NavLink to="/taggingTool/settings/upload">{ text.home.button }</NavLink>
          </button>
          <br />
          <br />
          <Button
            onClick={ this.handleOpenProject }
            class="btn btn-primary ctn"
            label="Open Project">
          </Button>
        </div>
      </div >);
  }

  handleOpenProject = history =>
  {
    alert("Opening a project");
    // PouchDB get data
  }

}



export default Home;
