import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Nav() {

  const navStyle = {
    color: 'white'
  };

  return (
    <nav>
        <h3>Logo</h3>
        <ul className="nav-links">
            <li>
              <Link style={navStyle} to="/">Home</Link>
            </li>
            <li>
              <Link style={navStyle} to="/about">About</Link>
            </li>
            <li>
              <Link style={navStyle} to="/signin">Signin</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Nav;
