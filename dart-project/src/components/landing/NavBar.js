import React from "react";
import "../../styles/landing/navbar.css";
import logo from "../../dart_proj.svg";

const NavBar = () => {
  return (
    <div className="dart__navbar">
      <div className="dart__navbar-links">
        <div className="dart__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="dart__navbar-links_container">
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#aboutus">About Us</a>
          </p>
          <p>
            <a href="#home">Features</a>
          </p>
          <p>
            <a href="#home">Contact</a>
          </p>
        </div>
      </div>
      <div className="dart__navbar-sign">
        <button type="button">Sign In</button>
      </div>
    </div>
  );
};

export default NavBar;
