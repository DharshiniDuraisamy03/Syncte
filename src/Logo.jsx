import React from "react";
import logo from "./images/logo.png";

const Logo = () => (
  <div className="navbar">
    <img src={logo} alt="Logo" className="logo" />
    <h2 className="name">Syncte</h2>
  </div>
);

export default Logo;
