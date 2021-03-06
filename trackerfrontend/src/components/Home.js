import axios from "axios";
import React, { useState } from "react";
import "../App.css";

function Home() {
    
    const [trackingNumber, setTrackingNumber] = useState("");
    const courierDropdownItems = ["Select a courier", "DHL", "FedEx", "UPS", "USPS"];
    const handleCourierDropdownChange = (event) => {
        setCourier(event.target.value);
      };
    const [courier, setCourier] = useState("Select a courier");
    const [courierDisplay, setCourierDisplay] = useState("Select a courier");

    const [trackingInputMessage, setTrackingInputMessage] = useState("");
    const [trackingResponseValid, setTrackingResponseValid] = useState(false);
    const [trackingResponseDataValid, setTrackingResponseDataValid] = useState(false);

    const [trackingOrigin, setTrackingOrigin] = useState();
    const [trackingDestination, setTrackingDestination] = useState();
    const [trackingEvents, setTrackingEvents] = useState();
    const [trackingRawResponse, setTrackingRawResponse] = useState();
    
    // Show prompt if user is logged in
    const [showSavePrompt, setShowSavePrompt] = useState(false);
    const [savedPrompt, setSavedPrompt] = useState("");
    const [showSavedPrompt, setShowSavedPrompt] = useState(false);

    // Detect enter key press
    function handleEnterKeyPress(event) {
        if(event.key === 'Enter') {
            getTracking(event)
        }
    }


    // Get tracking information
    function getTracking(event) {
        event.preventDefault()
        
        setTrackingInputMessage("Loading...")

        setTrackingResponseValid(false);
        setShowSavePrompt(false);
        setShowSavedPrompt(false);


        
        var courierSubmit = courier
        setCourierDisplay(courierSubmit)


        // Check if the user entered a valid tracking number
        if (trackingNumber.length > 0) {

            // TEMP CODE: dont run API call if unsupported courier is selected
            if (courierSubmit === "USPS") {
                setTrackingInputMessage("USPS is currently not supported.")
                console.log("USPS is currently not supported.")
                return
            // UPS selected
            } else if (courierSubmit === "UPS") {
                setTrackingInputMessage("UPS is currently not supported.")
                console.log("UPS is currently not supported.")
                return
            }// No specific courier selected
            else if (courierSubmit === "Select a courier") {
                setTrackingInputMessage("Please select a courier.")
                console.log("No courier selected.")
                return
            }

            axios.get("http://ec2-54-85-97-52.compute-1.amazonaws.com/track?tn=" + trackingNumber + "&courier=" + courierSubmit)
                .then((response) => {
                    if (response.data === "failed to track") {
                        throw new Error("Failed to track")
                    }

                    console.log(JSON.stringify(response, null, 4))

                    // TODO: PARSE DATA FROM RESPONSE ------- WIP
                    if (courierSubmit === "DHL") {
                        if (response.data === "") { // Not sure why, but this works
                            throw new Error("Failed to track")
                        } else {
                            try {
                                setTrackingOrigin(response.data.shipments[0].origin.address.addressLocality);

                                setTrackingDestination(response.data.shipments[0].destination.address.addressLocality);

                                setTrackingEvents(response.data.shipments[0].events);
                            } catch (error) {
                                setTrackingResponseDataValid(false)
                                throw new Error(error)
                            }
                        }
                    // FedEx selected
                    } else if (courierSubmit === "FedEx") {
                        try {
                            setTrackingOrigin(response.data.output.completeTrackResults[0].trackResults[0].originLocation.locationContactAndAddress.address.city);
                            
                            var trackDest = ""
                            if (response.data.output.completeTrackResults[0].trackResults[0].lastUpdatedDestinationAddress != null) {
                                trackDest = response.data.output.completeTrackResults[0].trackResults[0].lastUpdatedDestinationAddress.city
                            } else if (response.data.output.completeTrackResults[0].trackResults[0].destinationLocation != null) {
                                trackDest = response.data.output.completeTrackResults[0].trackResults[0].destinationLocation.locationContactAndAddress.address.city
                            } else {
                                throw new Error()
                            }
                            setTrackingDestination(trackDest);  // This is from lastUpdatedDestinationAddress
                            
                            setTrackingEvents(response.data.output.completeTrackResults[0].trackResults[0].dateAndTimes);
                        } catch (error) {
                            setTrackingResponseDataValid(false)
                            throw new Error(error)
                        }
                        
                    // USPS selected
                    } else if (courierSubmit === "USPS") {
                        setTrackingInputMessage("USPS is currently not supported.")
                    // UPS selected
                    } else if (courierSubmit === "UPS") {
                        setTrackingInputMessage("UPS is currently not supported.")
                    }// No specific courier selected
                    else if (courierSubmit === "Select a courier") {
                        setTrackingInputMessage("Please select a courier.")
                    }
                    
                    // Tracking number is valid
                    setTrackingResponseValid(true);
                    setTrackingResponseDataValid(true);

                    // console.log(response.data)
                    // console.log(JSON.stringify(response, null, 4))
                    
                    setTrackingRawResponse(JSON.stringify(response, null, 4));
                    
                    // If user is logged in, ask them if they want to save the tracking number
                    checkToken()

                })
                .catch(error => {
                    setTrackingResponseValid(false);
                    setTrackingResponseDataValid(false);
                    console.error(error);
                    setTrackingInputMessage("Please enter a valid tracking number.");
                });
            
        /* ----- OLD CODE -----
        // DHL selected
        if (courierSubmit === "DHL") {
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
                
                // If user is logged in, ask them if they want to save the tracking number
                checkToken()

            })
            .catch(error => {
                console.error(error);
                setTrackingInputMessage("Please enter a valid tracking number.");
            });

        // FedEx selected
        } else if (courierSubmit === "FedEx") {
            //setTrackingInputMessage("FedEx is currently not supported.");
        // USPS selected
        } else if (courierSubmit === "USPS") {
            setTrackingInputMessage("USPS is currently not supported.");
        // UPS selected
        } else if (courierSubmit === "UPS") {
            setTrackingInputMessage("UPS is currently not supported.")
        }// No specific courierSubmit selected
        else if (courierSubmit === "Select a courier") {
            setTrackingInputMessage("Please select a courier.");
        }
        */
                
            // No tracking number is entered
            } else if (trackingNumber.length === 0) {
                setTrackingInputMessage("Please enter a valid tracking number.");
            }



    }

    // Call API to check tokens in local and session storages
    function checkToken() {

        var token = "";
        if (localStorage.getItem("token") !== null) {
            token = localStorage.getItem("token")
        } else if (sessionStorage.getItem("token") !== null) {
            token = sessionStorage.getItem("token")
        }

        // Validate token
        axios.get("http://ec2-54-85-97-52.compute-1.amazonaws.com/validateToken?token=" + token)
            .then(response => {
                if (response.data) {
                    // Ask user if they want to save the tracking number
                    setShowSavePrompt(true)
                } else {
                    sessionStorage.removeItem("token")
                    localStorage.removeItem("token")
                }
            })
            .catch (error => console.error(error.response))
    }

    // Attempt to save tracking number when logged in
    function addTrackingNumber(event) {
        event.preventDefault();

        var nickname = prompt('Enter a nickname for the package.')


        var token = "";
        if (localStorage.getItem("token") !== null) {
            token = localStorage.getItem("token");
        } else if (sessionStorage.getItem("token") !== null) {
            token = sessionStorage.getItem("token");
        }
        
        var courierSubmit = courier

        setSavedPrompt("Saving...")

        // Call API to to attempt to save tracking number
        axios.get("http://ec2-54-85-97-52.compute-1.amazonaws.com/addTrackingNumber?token=" + token + "&trackingNumber=" + trackingNumber + "&nickname=" + nickname + "&courier=" + courierSubmit)
            .then(response => {
                // console.log(response.data)
                if (response.data === "success") {
                    setSavedPrompt("Tracking number saved successfully.");
                } else {
                    setSavedPrompt("Failed to save tracking number.");
                }

                setShowSavePrompt(false);
                setShowSavedPrompt(true);
            })
            .catch (error => console.error(error.response))
    }

    // Do not save tracking number when logging in
    function hideSavePrompt(event) {
        event.preventDefault();
        setShowSavePrompt(false);
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

            <div>
                { showSavePrompt && 
                <>
                    <p>Save this tracking number?</p>
                    <button className="Tracking-get-button Save-button" onClick={addTrackingNumber}>Yes</button>
                    <button className="Tracking-get-button Save-button" onClick={hideSavePrompt}>No</button>
                </>
                }
                { showSavedPrompt && 
                <>
                    <p>{savedPrompt}</p>
                </>
                }
            </div>

            <div className="Tracking-input-div">
                {!trackingResponseValid &&
                    <p style={{display: 'inline-block', fontSize: 20}}>{trackingInputMessage}</p>
                }
            </div>
            

            {/* Output tables */}
            {(trackingResponseValid) &&
                <div className="Tracking-output-div">
                    <p className="Tracking-header">Origin: {trackingOrigin}</p>
                    <p className="Tracking-header">Destination: {trackingDestination}</p>

                    {trackingResponseDataValid && courierDisplay=="DHL" &&
                        <div className="Tracking-status-table">
                            <table style={{borderSpacing: 0, border: "2px solid white"}}>
                                <thead>
                                    <tr>
                                        <th style={{borderRight: "2px solid white"}} className="Tracking-status-table-header">Date (UTC)</th>
                                        <th style={{borderRight: "2px solid white"}} className="Tracking-status-table-header">Location</th>
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

                    {trackingResponseDataValid && courierDisplay=="FedEx" &&
                        <div className="Tracking-status-table">
                            <table style={{borderSpacing: 0, border: "2px solid white"}}>
                                <thead>
                                    <tr>
                                        <th style={{borderRight: "2px solid white"}} className="Tracking-status-table-header">Date (UTC)</th>
                                        <th className="Tracking-status-table-header">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {trackingEvents && trackingEvents.map((dateAndTimes, index) =>
                                    <tr key={index}>
                                        <td className="Tracking-status-table-cell">{dateAndTimes.dateTime}</td>
                                        <td className="Tracking-status-table-cell">{dateAndTimes.type}</td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                    
                    {/*
                    <p className="Tracking-raw-output Tracking-header">Raw Output:</p>
                    <p className="Tracking-raw-output" style={{fontSize: 15}}>{trackingRawResponse}</p>
                    */}
                </div>
            }
        </div>
    );
}

export default Home;
