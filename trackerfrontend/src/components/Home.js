import axios from "axios";
import React, { useState } from "react";
import "../App.css";

function Home() {
    
    const [trackingNumber, setTrackingNumber] = useState("");
    const courierDropdownItems = ["Select a courier", "DHL", "FedEx", "USPS"];
    const handleCourierDropdownChange = (event) => {
        setCourier(event.target.value);
      };
    const [courier, setCourier] = useState("Select a courier");

    const [trackingInputMessage, setTrackingInputMessage] = useState();
    const [trackingResponseValid, setTrackingResponseValid] = useState(false);
    const [trackingResponseDataValid, setTrackingResponseDataValid] = useState(false);

    const [trackingOrigin, setTrackingOrigin] = useState();
    const [trackingDestination, setTrackingDestination] = useState();
    const [trackingEvents, setTrackingEvents] = useState();
    const [trackingRawResponse, setTrackingRawResponse] = useState();
    
    // Detect enter key press
    function handleEnterKeyPress(event) {
        if(event.key === 'Enter') {
            getTracking(event)
        }
    }

    // Get tracking information
    function getTracking(event) {
        event.preventDefault();
        setTrackingResponseValid(false);
        
        // Check if the user entered a valid tracking number
        if (trackingNumber.length > 0) {
            // DHL selected
            if (courier === "DHL") {
                setTrackingInputMessage("Getting tracking information...");

                // Send HTTP GET request to DHL's track/shipments API endpoint with the user's tracking number
                axios.get("https://api-eu.dhl.com/track/shipments?trackingNumber=" + trackingNumber, {
                    headers: {"DHL-API-Key": process.env.REACT_APP_DHL_API_KEY}
                })
                .then((response) => {
                    setTrackingResponseValid(true);
                    setTrackingResponseDataValid(true);
                    
                    // Check if response.data.shipments[0].events has all required elements:
                    // timestamp, location.address.addressLocality, description
                    const events = response.data.shipments[0].events;
                    events.forEach(function(checkedEvent) {
                        if (checkedEvent.timestamp == null || checkedEvent.location.address.addressLocality == null || checkedEvent.description == null)
                            setTrackingResponseDataValid(false);
                    })
    
                    // If the response has all required data, assign them to React variables
                    if (trackingResponseDataValid) {
                        setTrackingOrigin(response.data.shipments[0].origin.address.addressLocality);
                        setTrackingDestination(response.data.shipments[0].destination.address.addressLocality);
                        setTrackingEvents(response.data.shipments[0].events);
                    }
                    
                    setTrackingRawResponse(JSON.stringify(response, null, 4));
    
                    // Save package tracking number in database if user is logged in
                    addTrackingNumber()
                })
                .catch(error => {
                    console.error(error);
                    setTrackingInputMessage("Please enter a valid tracking number.");
                });

            // FedEx selected
            } else if (courier === "FedEx") {
                setTrackingInputMessage("FedEx is currently not supported.");
            // USPS selected
            } else if (courier === "USPS") {
                setTrackingInputMessage("USPS is currently not supported.");
            }// No specific courier selected
             else if (courier === "Select a courier") {
                setTrackingInputMessage("Please select a courier.");
            } 
            
        // No tracking number is entered
        } else if (trackingNumber.length === 0) {
            setTrackingInputMessage("Please enter a valid tracking number.");
        }
    }

    // Attempt to save tracking number
    function addTrackingNumber() {

        var token = "-";
        if (localStorage.getItem("token") !== null) {
            token = localStorage.getItem("token");
        } else if (sessionStorage.getItem("token") !== null) {
            token = sessionStorage.getItem("token");
        }
        
        // Call API to to attempt to save tracking number
        axios.get("http://localhost:8080/addTrackingNumber?token=" + token + "&trackingNumber=" + trackingNumber)
            .then(response => {
                    console.log(response.data)
            })
            .catch (error => console.error(error.response))
    }

    return (
        <div className="App-body">
            <div style={{height: 50}}></div> {/* Temporary buffer space */}

            <div className="Tracking-input-div">
                <label className="Tracking-number">Tracking Number:</label>

                <input className="Tracking-number-input" type="text" value={trackingNumber}
                    onInput={(e) => setTrackingNumber(e.target.value)}
                    onKeyDown={handleEnterKeyPress}>
                </input>

                <select className="Tracking-courier-dropdown" value={courier} onChange={handleCourierDropdownChange}>
                    {courierDropdownItems.map((courier) => (
                        <option key={courier}>
                            {courier}
                        </option>
                    ))}
                </select>

                <button className="Tracking-get-button" onClick={getTracking}>Get Tracking Status</button>
            </div>

            <div className="Tracking-input-div">
                {!trackingResponseValid &&
                    <p style={{display: 'inline-block', fontSize: 20}}>{trackingInputMessage}</p>
                }
            </div>
            
            {(courier === "DHL" && trackingResponseValid) &&
                <div className="Tracking-output-div">
                    <p className="Tracking-header">Origin: {trackingOrigin}</p>
                    <p className="Tracking-header">Destination: {trackingDestination}</p>

                    {trackingResponseDataValid &&
                        <div className="Tracking-status-table">
                        <table style={{borderSpacing: 0, border: "2px solid white", padding: "10px"}}>
                            <thead>
                                <tr>
                                    <th style={{borderBottom: "2px solid white", borderRight: "2px solid white", padding: "10px"}} className="Tracking-status-table-header">Date (UTC)</th>
                                    <th style={{borderBottom: "2px solid white", borderRight: "2px solid white", padding: "10px"}} className="Tracking-status-table-header">Location</th>
                                    <th style={{borderBottom: "2px solid white", padding: "10px"}} className="Tracking-status-table-header">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackingEvents && trackingEvents.map((event, index) =>
                                    <tr key={index}>
                                        <td style={{padding: "10px"}} className="Tracking-status-table-cell">{event.timestamp}</td>
                                        <td style={{padding: "10px"}} className="Tracking-status-table-cell">{event.location.address.addressLocality}</td>
                                        <td style={{padding: "10px"}} className="Tracking-status-table-cell">{event.description}</td>
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
