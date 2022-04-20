import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Account() {

  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);


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
    
    console.log("http://localhost:8080/validateToken?token=" + token);
    // Validate token
    axios.get("http://localhost:8080/validateToken?token=" + token)
        .then(response => {
            if (!response.data) {
                toLogin()
            }
        })
        .catch (error => console.error(error.response))
  }


  function logout() {
    //sessionStorage.clear();
    //localStorage.clear();
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    toLogin()
  }


  return (
    <div className="App-body">
        <h1>
            Account Page
        </h1>

        <div>
            Account contents
        </div>

        <button onClick={logout} style={{margin: '1vh'}}>
            back to login page
        </button>
    </div>
  );

  
};

export default Account;
