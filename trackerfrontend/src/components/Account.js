import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Account() {

  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);
  const [trackingNumbers, setTrackingNumbers] = useState(["Loading..."]);


  // Call checkToken() after component has rendered
  useEffect(() => {
    let ignore = false;
    
    if (!ignore)  checkToken()
        return () => { ignore = true; }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

  // Call API to check tokens in local and session storages
  function checkToken() {

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
        })
        .catch (error => console.error(error.response))
  }

  // Need to decide whether to enter delete mode or delete according to nick name
  function deleteMode() {

  }

  return (
    <div className="App-body">
        <h1>
            Account Page
        </h1>

        <button className="Logout-button" onClick={logout} style={{margin: '4vh'}}>
            Back to login page (logout)
        </button>

        <div className="Tracking-status-table">
            <table style={{borderSpacing: 0, border: "2px solid white"}}>
                <thead>
                    <tr>
                        <th style={{borderRight: "2px solid white", width: "30vh", textAlign: "center"}} className="Tracking-status-table-header">Description</th>
                        <th style={{width: "30vh", textAlign: "center"}} className="Tracking-status-table-header">Tracking Numbers</th>
                    </tr>
                </thead>
                <tbody>
                    {trackingNumbers && trackingNumbers.map((trackingNum, index) =>
                        <tr>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">"description"</td>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{trackingNum}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="delete button">
            <button className="Delete-button" onClick={deleteMode}>
                Delete
            </button> 
        </div>
        

    </div>
  );

  
};

export default Account;
