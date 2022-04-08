import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Account() {

  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/account/login', {replace: false}), [navigate]);
  const toSignup = useCallback(() => navigate('/account/signup', {replace: false}), [navigate]);

  return (
    <div className="App-body">
        <h1>
            Account Page
        </h1>
        <button onClick={toLogin} style={{margin: '1vh'}}>
            to login page
        </button>
        <button onClick={toSignup} style={{margin: '1vh'}}>
            to signup page
        </button>
    </div>
  );
};

export default Account;
