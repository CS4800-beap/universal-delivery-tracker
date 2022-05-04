import React from "react";
import logo from "../images/delivtruck-small-white.png";
import { Link } from "react-router-dom";
import "../App.css";

function Nav() {

  return (
    <nav>
        <h3>
          <Link style={{color: "white", textDecoration: "none"}} to="/">
            <img src={logo} alt="Logo"/>
          </Link>
        </h3>
        <ul className="Nav-items">
            <li>
              <Link className="Nav-item" to="/about">About</Link>
            </li>
            <li>
              <Link className="Nav-item" to="/login">Account</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Nav;
