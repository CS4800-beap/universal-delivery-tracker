import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Nav() {

  return (
    <nav>
        <h3><Link className="Nav-item" to="/">Logo</Link></h3>
        <ul className="Nav-items">
            <li>
              <Link className="Nav-item" to="/">Home</Link>
            </li>
            <li>
              <Link className="Nav-item" to="/about">About</Link>
            </li>
            <li>
              <Link className="Nav-item" to="/account">Account</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Nav;
