import React from "react";
import githubBadge from "../images/github-badge.png";
import "../App.css";

function About() {
    return (
        <div className="App-body">
            <h1>
                About Page
            </h1>
      
            <a href="https://github.com/CS4800-beap/universal-delivery-tracker" target="_blank" rel="noreferrer noopener">
                <img src={githubBadge} alt="GitHub badge"/>
            </a>
        </div>
    );
}

export default About;
