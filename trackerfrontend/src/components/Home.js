import axios from "axios";
import React, { useState } from "react";
import "../App.css";

function Home() {
    
    const [trackingNumber, setTrackingNumber] = useState();
    const couriers = [
        {label: 'Select a courier', value: 'Select a courier'},
        {label: 'DHL', value: 'DHL'},
        {label: 'FedEx', value: 'FedEx'},
      ];
    const handleDropdownChange = (event) => {
        setCourier(event.target.value);
      };
    const [courier, setCourier] = useState();

    const [trackingOrigin, setTrackingOrigin] = useState();
    const [trackingDestination, setTrackingDestination] = useState();
    
    const [trackingInputError, setTrackingInputError] = useState();
    const [trackingResponseValid, setTrackingResponseValid] = useState(false);
    const [trackingResponseDataValid, setTrackingResponseDataValid] = useState(false);
    const [trackingEvents, setTrackingEvents] = useState();
    const [trackingRawResponse, setTrackingRawResponse] = useState();
    

    // Get tracking information
    function getTracking(event) {
        event.preventDefault();
        setTrackingResponseValid(false);
        
        // Check if the user entered a valid tracking number
        if (trackingNumber.length > 0) {
            // DHL selected
            if (courier === "DHL") {

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
    
                    // Validate token if it exists
                    // Save package information in database if user is logged in.
                    var token = "";
                    token = sessionStorage.getItem("token");
                    token = localStorage.getItem("token");
                })
                .catch(error => {
                    console.error(error);
                    setTrackingInputError("Please enter a valid tracking number.");
                });
            // No specific courier is selected
            } else if (courier === "Select a courier") {
                setTrackingInputError("Please select a courier.");
            // Unsupported courier selected
            } else {
                setTrackingInputError("This courier is currently not supported.");
            }
        // No tracking number is entered
        } else if (trackingNumber.length === 0) {
            setTrackingInputError("Please enter a valid tracking number.");
        }
    }

    return (
        <div className="App-body">
            <div style={{height: 50}}></div> {/* Temporary buffer space */}

            <div className="Tracking-input-div">
                <label className="Tracking-number">Tracking Number:</label>
                <input className="Tracking-number-input" type="text" value={trackingNumber} onInput={(e) => setTrackingNumber(e.target.value)}></input>
                <button className="Tracking-get-button" onClick={getTracking}>Get Tracking Status</button>
            </div>

            <div className="Tracking-input-div">
                <select value={courier} onChange={handleDropdownChange}>
                    {couriers.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div className="Tracking-input-div">
                {!trackingResponseValid &&
                    <p>{trackingInputError}</p>
                }
            </div>
            
            {(courier === "DHL" && trackingResponseValid) &&
                <div className="Tracking-output-div">
                    <p className="Tracking-header">Origin: {trackingOrigin}</p>
                    <p className="Tracking-header">Destination: {trackingDestination}</p>

                    {trackingResponseDataValid &&
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
