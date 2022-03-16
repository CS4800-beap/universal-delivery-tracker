import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Signin from "./components/Signin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>  
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


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