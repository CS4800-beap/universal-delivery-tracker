import axios from "axios";
import React, { useState } from "react";
import "../App.css";

function Home() {
    
    const [trackingNumber, setTrackingNumber] = useState();

    const [courier, setCourier] = useState("Please enter a tracking number.");
    const [trackingOrigin, setTrackingOrigin] = useState();
    const [trackingDestination, setTrackingDestination] = useState();
    
    const [trackingDataValid, setTrackingDataValid] = useState(false);
    const [trackingEvents, setTrackingEvents] = useState();
    const [trackingRawResponse, setTrackingRawResponse] = useState();
    

    // Get tracking information
    function getTracking(event) {
        event.preventDefault();

        /*
        Identify courier based on tracking number format

        DHL:
        - Source: https://www.trackingmore.com/tracking-status-detail-en-237.html
        - 9-10 digits: 7777777770
        - JD + 18 digits: JD000000000000000000
        - JJD + 16 digits: JJD0000000000000000
        */
        if (((trackingNumber.length === 9 || trackingNumber.length === 10) && /^[0-9]+$/.test(trackingNumber)) ||
            (trackingNumber.substring(0, 2) === "JD" && trackingNumber.substring(2).length === 18 && /^[0-9]+$/.test(trackingNumber.substring(2))) ||
            (trackingNumber.substring(0, 3) === "JJD" && trackingNumber.substring(3).length === 16 && /^[0-9]+$/.test(trackingNumber.substring(3)))) {
                setCourier("DHL");

                // Send HTTP GET request to DHL's track/shipments API endpoint with the user's tracking number
                axios.get("https://api-eu.dhl.com/track/shipments?trackingNumber=" + trackingNumber, {
                    headers: {"DHL-API-Key": process.env.REACT_APP_DHL_API_KEY}
                })
                .then((response) => {
                    setTrackingDataValid(true);
                    
                    // Check if response.data.shipments[0].events has all required elements:
                    // timestamp, location.address.addressLocality, description
                    const events = response.data.shipments[0].events;
                    events.forEach(function(checkedEvent) {
                        if (checkedEvent.timestamp == null || checkedEvent.location.address.addressLocality == null || checkedEvent.description == null)
                            setTrackingDataValid(false);
                    })

                    // If the response has all required data, assign them to React variables
                    if (trackingDataValid) {
                        setTrackingOrigin(response.data.shipments[0].origin.address.addressLocality);
                        setTrackingDestination(response.data.shipments[0].destination.address.addressLocality);
                        setTrackingEvents(response.data.shipments[0].events);
                    }
                    
                    setTrackingRawResponse(JSON.stringify(response, null, 4));

                    // Validate token if it exists
                    // Save package information in database if user is logged in.
                    var token = "";
                    token = sessionStorage.getItem("token");
                    token = localStorage.getItem("token");
                })
                .catch(error => console.error(error));
        // No tracking number is entered
        } else if (trackingNumber.length === 0) {
            setCourier("Please enter a tracking number.");
        // Unsupported tracking number is entered
        } else {
            setCourier("The tracking number you have entered is currently not supported.");
        }
    }

    return (
        <div className="App-body">
            <div style={{ height: 50 }}></div> {/* Temporary buffer space */}

            <div className="Tracking-input-div">
                <label className="Tracking-number">Tracking Number:</label>
                <input className="Tracking-number-input" type="text" value={trackingNumber} onInput={(e) => setTrackingNumber(e.target.value)}></input>
                <button className="Tracking-get-button" onClick={getTracking}>Get Tracking Status</button>
            </div>

            <div className="Tracking-input-div">
                {courier !== "DHL" &&
                    <p>{courier}</p>
                }
            </div>
            
            {courier === "DHL" &&
                <div className="Tracking-output-div">
                    <p className="Tracking-header">Courier: {courier}</p>
                    <p className="Tracking-header">Origin: {trackingOrigin}</p>
                    <p className="Tracking-header">Destination: {trackingDestination}</p>

                    {trackingDataValid &&
                        <div className="Tracking-status-table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="Tracking-status-table-header">Date (UTC)</th>
                                    <th className="Tracking-status-table-header">Location</th>
                                    <th className="Tracking-status-table-header">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackingEvents && trackingEvents.map((event, index) =>
                                    <tr key={index}>
                                        <td className="Tracking-status-table-cell">{event.timestamp}</td>
                                        <td className="Tracking-status-table-cell">{event.location.address.addressLocality}</td>
                                        <td className="Tracking-status-table-cell">{event.description}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    }
                    
                    <p className="Tracking-raw-output Tracking-header">Raw Output:</p>
                    <p className="Tracking-raw-output" style={{fontSize: 15}}>{trackingRawResponse}</p>
                </div>
            }
        </div>
    );
}

export default Home;
