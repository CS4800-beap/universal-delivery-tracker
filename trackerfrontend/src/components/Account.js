import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Account() {

  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);

  return (
    <div className="App-body">
        <h1>
            Account Page
        </h1>

        <div>
            Account contents
        </div>

        <button onClick={toLogin} style={{margin: '1vh'}}>
            back to login page
        </button>
    </div>
  );

  
};

export default Account;
