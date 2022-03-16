import React, {useState} from "react";
import "../App.css";

function Home() {

  const [trackingNumber, setInput] = useState("");
  const [DHLResponse, setDHLResponse] = useState("");
  
  function getDHLTracking(event) {
    event.preventDefault()
    console.log("DHL Tracking Number: ", trackingNumber)

    const options = {method: 'GET', headers: {'DHL-API-Key': process.env.REACT_APP_DHL_API_KEY}};

    fetch(`https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setDHLResponse(JSON.stringify(response))
      })
      .catch(err => console.error(err));
  }

  return (
    <body className="App-body">
      <div className="Input-div">
        <label className="Tracking-number">Tracking Number:</label>
        <input className="Tracking-number-input" type="text" value={trackingNumber} onInput={(e) => setInput(e.target.value)}></input>
        <button className="Get-button" onClick={getDHLTracking}>Get Tracking Status</button>
      </div>
      
      <div className="Output-div">
        <p className="Output-1">Output:</p>
        <p className="Output-1">{DHLResponse}</p>
      </div>
    </body>
  );
};

export default Home;

/*
const [trackingNumber, setInput] = useState("");
  const [DHLResponse, setDHLResponse] = useState("");
  
  function getDHLTracking(event) {
    event.preventDefault()
    console.log("DHL Tracking Number: ", trackingNumber)

    const options = {method: 'GET', headers: {'DHL-API-Key': process.env.REACT_APP_DHL_API_KEY}};

    fetch(`https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setDHLResponse(JSON.stringify(response))
      })
      .catch(err => console.error(err));
  }
-----------------------------------
<header className="App-header">
          <div className="Input-div">
            <label className="Tracking-number">Tracking Number:</label>
            <input className="Tracking-number-input" type="text" value={trackingNumber} onInput={(e) => setInput(e.target.value)}></input>
            <button className="Get-button"  onClick={getDHLTracking}>Get Tracking Status</button>
          </div>
          
          <div className="Output-div">
            <p className="Output-1">Output:</p>
            <p className="Output-1">{DHLResponse}</p>
          </div>
        </header>
*/