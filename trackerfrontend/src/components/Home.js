import React, {useState} from "react";
import "../App.css";

function Home() {

  const [trackingNumber, setTrackingNumber] = useState("");
  const [courier, setCourier] = useState("");
  const [TrackingResponse, setTrackingResponse] = useState("");
  
  // Get tracking information
  function getTracking(event) {
    event.preventDefault()
    console.log("Tracking Number: ", trackingNumber)

    /*
    Identify courier based on tracking number format

    DHL:
      - Source: https://www.trackingmore.com/tracking-status-detail-en-237.html
      - 9-10 digits: 7777777770
      - JD + 18 digits: JD000000000000000000
      - JJD + 16 digits: JJD0000000000000000
     */
    if (((trackingNumber.length === 9 || trackingNumber.length === 10) && /^[0-9]+$/.test(trackingNumber)) ||
        (trackingNumber.substring(0, 2) === "JD" && trackingNumber.substring(2).length === 18) ||
         (trackingNumber.substring(0, 3) === "JJD" && trackingNumber.substring(3).length === 16)) {
          setCourier("DHL");

          // Send HTTP GET request to DHL's track/shipments API endpoint with the user's tracking number
          fetch(`https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`,{
              method: 'GET', headers: {'DHL-API-Key': process.env.REACT_APP_DHL_API_KEY}
            })
            .then(response => response.json())
            .then(response => {
              setTrackingResponse(JSON.stringify(response))
            })
            .catch(err => console.error(err));
    } else {
      setCourier("The tracking number you have entered is currently not supported.");
      setTrackingResponse();
    }
  }

  return (
    <div className="App-body">

      <div style={{height: 200}}></div> {/* Temporary buffer space */}

      <div className="Input-div">
        <label className="Tracking-number">Tracking Number:</label>
        <input className="Tracking-number-input" type="text" value={trackingNumber} onInput={(e) => setTrackingNumber(e.target.value)}></input>
        <button className="Get-button" onClick={getTracking}>Get Tracking Status</button>
      </div>

      <div className="Output-div">
        <p className="Output-courier">Courier: {courier}</p>
      </div>
      
      <div className="Output-div">
        <p className="Output-1">Output:</p>
        <p className="Output-1">{TrackingResponse}</p>
      </div>
    </div>
  );
};

export default Home;
