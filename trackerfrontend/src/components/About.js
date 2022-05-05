import React from "react";
import githubBadge from "../images/github-badge.png";
import "../App.css";

function About() {
    return (
        <div className="App-body">
            <a href="http://cs480-projects.github.io/teams-spring2022/Beap/index.html" style={{textDecoration: "underline", color: "white", fontSize:"25px"}}>
                <h1>
                About Us
                </h1>
            </a>

            <a href="https://github.com/CS4800-beap/universal-delivery-tracker" target="_blank" rel="noreferrer noopener">
                <img src={githubBadge} alt="GitHub badge"/>
            </a>
        </div>
    );
}

export default About;
