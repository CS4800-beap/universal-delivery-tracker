import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Account() {

  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);
  const [trackingNumbers, setTrackingNumbers] = useState([""]);
  const [nickname, setNicknames] = useState(["Loading..."]);
  const [courier, setCouriers] = useState([""]);
  
  const [showPopup, setShowPopup] = useState(false);
  const [currNickname, setCurrNickname] = useState("");
  const [currTrackingNum, setCurrTrackingNum] = useState("");
  const [currCourier, setCurrCourier] = useState("");

  const [trackingOrigin, setTrackingOrigin] = useState();
  const [trackingDestination, setTrackingDestination] = useState();
  const [trackingEvents, setTrackingEvents] = useState();
  const [trackingRawResponse, setTrackingRawResponse] = useState();


  // Call checkToken() after component has rendered
  useEffect(() => {
    let ignore = false;
    
    if (!ignore)  checkToken()
        return () => { ignore = true; }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

  // Call API to check tokens in local and session storages
  function checkToken() {

    setShowPopup(false)

    var token = "";
    if (localStorage.getItem("token") !== null) {
        token = localStorage.getItem("token");
    } else if (sessionStorage.getItem("token") !== null) {
        token = sessionStorage.getItem("token");
    }
    
    // Validate token
    axios.get("http://localhost:8080/validateToken?token=" + token)
        .then(response => {
            if (!response.data) {
                toLogin()
            } else {
                loadTrackingNumbers(token)
            }
        })
        .catch (error => console.error(error.response))
  }


  function logout() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    toLogin()
  }

  function loadTrackingNumbers(token) {
    axios.get("http://localhost:8080/getTrackingNumbers?token=" + token)
        .then(response => {
            // console.log(response.data)
            
            // Parse response to fill table
            var nicknameArr = []
            var numArr = []
            var courierArr = []
            for (var i = 0; i < response.data.length; i++) {
                var entry = response.data[i]

                // Nicknames
                if (entry.split(";")[1] === "") {
                    nicknameArr.push("No nickname")
                } else {
                    nicknameArr.push(entry.split(";")[1])
                }

                // Tracking numbers
                numArr.push(entry.split(";")[0])

                // Couriers
                courierArr.push(entry.split(";")[2])
            }
            setNicknames(nicknameArr)
            setTrackingNumbers(numArr)
            setCouriers(courierArr)
        })
        .catch (error => console.error(error.response))
  }


  // Call tracking API to get tracking number information and display in a popup window
  function track(trackingNum, nickname, courier) {
    setShowPopup(false)
    setCurrNickname(nickname)
    setCurrCourier(courier)
    setCurrTrackingNum(trackingNum)
    //console.log("tracking: ", trackingNum, " from ", courier)
    //console.log(trackingEvents)

    // Call tracking API
    axios.get("http://localhost:8080/track?tn=" + trackingNum + "&courier=" + courier)
        .then((response) => {
            if (response === "failed to track") {
                throw new Error("Failed to track")
            }
            
            // TODO: PARSE DATA FROM RESPONSE ------- WIP
            if (courier === "DHL") {
                if (response.data === "") { // Not sure why, but this works
                    throw new Error("Failed to track")
                } else {
                    try {
                        setTrackingOrigin(response.data.shipments[0].origin.address.addressLocality);
                        setTrackingDestination(response.data.shipments[0].destination.address.addressLocality);
                        setTrackingEvents(response.data.shipments[0].events);
                    } catch (error) {
                        throw new Error(error)
                    }
                }
            // FedEx selected
            } else if (courier === "FedEx") {
                try {
                    setTrackingOrigin(response.data.output.completeTrackResults[0].trackResults[0].originLocation.locationContactAndAddress.address.city);
                    setTrackingDestination(response.data.output.completeTrackResults[0].trackResults[0].lastUpdatedDestinationAddress.city);  // This is from lastUpdatedDestinationAddress
                    setTrackingEvents(response.data.output.completeTrackResults[0].trackResults[0].dateAndTimes);
                } catch (error) {
                    throw new Error(error)
                }
            // USPS selected
            } else if (courier === "USPS") {
                console.error("USPS is currently not supported.")
            // UPS selected
            } else if (courier === "UPS") {
                console.error("UPS is currently not supported.")
            }// No specific courier selected
            else {
                console.error("No courier was specified for the object.")
            }


            setTrackingRawResponse(JSON.stringify(response, null, 4));
            
        })
        .catch(error => {
            console.error(error);
        });


    // Display information in a popup window
    setShowPopup(true)
  }

// Hide popup and clear current tracking number information
function hidePopup() {
    setShowPopup(false)
    setTrackingOrigin("")
    setTrackingDestination("")
    setTrackingEvents("")
}

  function deleteButton() {
    console.log("delete button pressed:\n",
                "nickname: ", currNickname, "\n",
                "courier: ", currCourier, "\n",
                "tracking number: ", currTrackingNum)
  }

  function deleteAll() {

  }

  return (
    <div className="App-body">
        <h1>
            Your Account
        </h1>

        {/* Not yet implemented - display user's name

        <div className="user-name">
            TODO: user-name show here
        </div>

        */}


        <div className="Tracking-status-table">
            <table style={{borderSpacing: 0, border: "2px solid white"}}>
                <thead>
                    <tr>
                        <th style={{borderRight: "2px solid white", width: "40vh", textAlign: "center"}} className="Tracking-status-table-header">Nickname</th>
                        <th style={{borderRight: "2px solid white", textAlign: "center"}} className="Tracking-status-table-header">Tracking Numbers</th>
                        <th style={{borderRight: "2px solid white", textAlign: "center"}} className="Tracking-status-table-header">Courier</th>
                        <th style={{textAlign: "center", width: "13vh"}} className="Tracking-status-table-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {trackingNumbers && trackingNumbers.map((trackingNum, index) =>
                        <tr>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{nickname[index]}</td>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">
                                <div style={{padding: "2px", width: "fit-content"}}>
                                    {trackingNum}
                                </div>
                            </td>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{courier[index]}</td>
                            <td style={{textAlign: "center"}} className="Tracking-status-table-cell">
                                { trackingNum !== "" &&
                                    <button className="Show-detail-button" onClick={() => {track(trackingNum, nickname[index], courier[index]) }}>
                                        Show Details
                                    </button>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Not yet implemented - delete tracking number from account

        <div className="delete button">
            <button className="Delete-all-button" onClick={deleteAll}>
                Delete all
            </button> 
        </div>

        */}

        <button className="Logout-button" onClick={logout} style={{margin: '4vh'}}>
            Log out
        </button>
        
        {/* Details popup */}
        { showPopup && 
            <div className="Popup-Container" style={{display: showPopup ? 'flex' : 'none'}}>
                <div className="Popup" onClick={null}>
                    <header className="Popup-Header">
                        <div className="Popup-Title">{currNickname} - {currCourier}</div>
                        <button className="Popup-Close" onClick={hidePopup}>x</button>
                    </header>

                    <div className="Popup-Content">

                        {/* Detail tables */} 
                        <div className="Tracking-output-div">
                            <p className="Tracking-header">Origin: {trackingOrigin}</p>
                            <p className="Tracking-header">Destination: {trackingDestination}</p>

                            {currCourier=="DHL" &&
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

                            {currCourier=="FedEx" &&
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
                        </div>
                    </div>

                    {/* Raw output of tracking number response
                        <div className="Popup-Content">
                            <div className="Tracking-raw-output" style={{fontSize: 10}}>{trackingRawResponse}</div>
                        </div>
                    */}
                    

                    {/* Not yet implemented - delete tracking number from account

                    <div className="Popup-Footer">
                        <button className="Delete-button" onClick={deleteButton}>Delete</button>
                    </div>

                    */}
                </div>
            </div>
        }

    </div>
  );

  
};

export default Account;
