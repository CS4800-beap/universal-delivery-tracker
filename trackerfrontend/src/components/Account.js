import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Account() {

  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);

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
