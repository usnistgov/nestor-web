import React from "react";
import "./navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../.././assets/img/icon.png";
import text from "../../assets/language/en.js";

const links = [
  {
    label: text.home.navbar.home,
    link: "/",
    exact: true
  },
  {
    label: text.home.navbar.taggingTool,
    link: "/taggingTool",
    exact: false
  },
  {
    label:  text.home.navbar.dashboard,
    link: "/dashboard",
    exact: false
  }
]
const NavBar = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <img src={logo} width="40" height="40" alt="logo" />
        </Navbar.Brand>
        <Nav className="mr-auto">
          {links.map((obj, i) => (
              <NavLink key={i} exact={obj.exact} className="nav-link" to={obj.link}>
              {obj.label}
              </NavLink>
            ))}
        </Nav>
      </Navbar>
    </div>
  );
};
export default NavBar;
