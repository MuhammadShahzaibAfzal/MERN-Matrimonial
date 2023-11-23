import React from "react";
import hamburger from "../assets/hamburger.svg";
import logo from "../assets/logo-org.png";
import { Link } from "react-router-dom";
const Appbar = ({ open, setOpen }) => {
  return (
    <div className="appbar">
      <div className="left">
        {/* sidebar toggler */}
        <img
          src={hamburger}
          onClick={() => {
            setOpen(!open);
          }}
          alt="hamburger"
          className="hamburger"
        />

        {/* logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default Appbar;
