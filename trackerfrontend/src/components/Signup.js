import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
    
    const navigate = useNavigate();
    const toLogin = useCallback(() => navigate('/account/login', {replace: false}), [navigate]);
    
    return(
        <body className="App-body">
            <h1>
                Signup Page
            </h1>
            <button onClick={toLogin} style={{margin: '1vh'}}>
                to login page
            </button>
        </body>
    );
}

export default Signup;
