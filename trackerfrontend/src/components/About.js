import React from "react";
import "../App.css";

function About() {

  function gitUrl() {
    window.location.href="https://github.com/CS4800-beap/universal-delivery-tracker"; 
  }

  return (
    <div className="App-body">
        <h1>
            About Page
        </h1>

        <p>Our Code</p> 
        <button onClick={gitUrl} style={{margin: '1vh'}}>
            GitHub
        </button>

    </div>
  );
};

export default About;
