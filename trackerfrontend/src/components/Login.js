import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {

    const navigate = useNavigate();
    const toSignup = useCallback(() => navigate('/account/signup', {replace: false}), [navigate]);
    
    return(
        <body className="App-body">
            <h1>
                Login Page
            </h1>
            <button onClick={toSignup} style={{margin: '1vh'}}>
                to signup page
            </button>
        </body>
    );
}

export default Login;
