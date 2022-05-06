import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Account() {

  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);
  const [trackingNumbers, setTrackingNumbers] = useState([""]);
  const [nickName, setNickName] = useState(["Loading..."]);
  const [courier, setCourier] = useState([""]);
  
  const [showPopup, setShowPopup] = useState(false);
  const [currNickname, setCurrNickname] = useState("");
  const [currTrackingNum, setCurrTrackingNum] = useState(""); // Temp
  const [currCourier, setCurrCourier] = useState("");
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
            console.log(response.data)
            setTrackingNumbers(response.data)
            loadNickNames()
            loadCouriers()
        })
        .catch (error => console.error(error.response))
  }

  // WIP - TEMP VALUES
  function loadNickNames() {
    setNickName(["no nickname1", "no nickname2", "no nickname3", "no nickname4", "no nickname5", "no nickname6", "no nickname7", "no nickname8", "no nickname9"])
  }

  // WIP - TEMP VALUES
  function loadCouriers() {
    setCourier(["DHL", "DHL", "?", "?", "?", "?", "?", "DHL", "FedEx"])
  }

  // Call tracking API to get tracking number information and display in a popup window
  function track(trackingNum, nickname, courier) {
    setShowPopup(false)
    setCurrNickname(nickname)
    setCurrCourier(courier)
    setCurrTrackingNum(trackingNum)
    console.log("tracking: ", trackingNum, " from ", courier)
    
    // Call tracking API
    axios.get("http://localhost:8080/track?tn=" + trackingNum + "&courier=" + courier)
        .then((response) => {
            if (response === "failed to track") {
                throw new Error("Failed to track")
            }
            
            // Tracking number is valid
            console.log(response.data)
            
            //setTrackingRawResponse(response.data)
            

            setTrackingRawResponse(JSON.stringify(response, null, 4));
            
            // If user is logged in, ask them if they want to save the tracking number
            //checkToken()
            
        })
        .catch(error => {
            console.error(error);
        });


    // Display information in a popup window
    setShowPopup(true)
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

        <div className="user-name">
            TODO: user-name show here
        </div>

        <button className="Logout-button" onClick={logout} style={{margin: '4vh'}}>
            Log out
        </button>

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
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{nickName[index]}</td>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">
                                <div style={{padding: "2px", width: "fit-content"}}>
                                    {trackingNum}
                                </div>
                            </td>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{courier[index]}</td>
                            <td style={{textAlign: "center"}} className="Tracking-status-table-cell">
                                { trackingNum !== "" &&
                                    <button className="Show-detail-button" onClick={() => {track(trackingNum, nickName[index], courier[index]) }}>
                                        Show Details
                                    </button>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="delete button">
            <button className="Delete-all-button" onClick={deleteAll}>
                Delete all
            </button> 
        </div>
        
        { showPopup && 
            <div className="Popup-Container" style={{display: showPopup ? 'flex' : 'none'}}>
                <div className="Popup" onClick={null}>
                    <header className="Popup-Header">
                        <div className="Popup-Title">{currNickname} - {currCourier}</div>
                        <button className="Popup-Close" onClick={() => setShowPopup(false)}>x</button>
                    </header>
                    <div className="Popup-Content">
                        <div className="Tracking-raw-output" style={{fontSize: 10}}>{trackingRawResponse}</div>
                    </div>
                    <div className="Popup-Footer">
                        <button className="Delete-button" onClick={deleteButton}>Delete</button>
                    </div>
                </div>
            </div>
        }

    </div>
  );

  
};

export default Account;
