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
                loadNickName(token)
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

  // WIP
  function loadNickName(token) {
      
  }

  // Need to decide whether to enter delete mode or delete according to nick name
  function deleteMode() {

  }
  function deleteAll() {

  }


  return (
    <div className="App-body">
        <h1>
            Account Page
        </h1>

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
                        <th style={{width: "10vh", textAlign: "center"}} className="Tracking-status-table-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {trackingNumbers && trackingNumbers.map((trackingNum, index) =>
                        <tr>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{nickName[index]}</td>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{trackingNum}</td>
                            <td style={{padding: "10px 20px 10px 20px"}} className="Tracking-status-table-cell">{courier[index]}</td>
                            <td style={{borderLeft: "2px solid white", textAlign: "center"}} className="Tracking-status-table-cell"><button className="Delete-button" onClick={deleteMode}>Delete</button></td>
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
        

    </div>
  );

  
};

export default Account;
