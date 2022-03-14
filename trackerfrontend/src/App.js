import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  // 
  useEffect(() => {
    fetch("/api/currenttime")
      .then((response) => response.text())
      .then((message) => {
        setMessage(message);
      });
  }, []); 
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <div>
            <label name="trackingNumber">Tracking Number: </label>
            <input className="trackingNumberInput" type="textbox" size="30" style={{ 'font-size': "20px"}} name="trackingNumber"></input>
          </div>
        </form>
        <h1 className="App-title">{message}</h1>
      </header>
    </div>
  );
}

export default App;
