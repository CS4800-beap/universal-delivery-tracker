import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  
  function handleGet(event) {
    event.preventDefault()
    trackingNumber(input)
    console.log("Tracking Number: ", trackingNumber)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Input-div">
          <label className="Tracking-number">Tracking Number:</label>
          <input className="Tracking-number-input" type="text" value={input} onInput={(e) => setInput(e.target.value)}></input>
          <button className="Get-button"  onClick={handleGet}>Get Tracking Status</button>
        </div>
        
        <div className="Output-div">
          {/*Output data goes here*/}
          <p className="Output-1">Output: {trackingNumber}</p>
        </div>
      </header>
    </div>
  );

  
}


export default App;
