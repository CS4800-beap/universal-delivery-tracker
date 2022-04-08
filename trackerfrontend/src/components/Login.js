import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle log in
    function login() {
        console.log("Email: ", email)
        console.log("Password: ", password)
    }

    return(
        <div className="App-body">
            <h1>
                Log in
            </h1>

            <div className="Form-container">
                <div className="Form">
                    <input className="Form-control" name="wenben" type="text" placeholder={'email'} value={email} onInput={(e) => setEmail(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'password'} value={password} onInput={(e) => setPassword(e.target.value)}/>

                    <button onClick={login}>Log in</button>
                    

                    <p style={{fontSize: 18}}>Don't have an account? <Link to='/account/signup' style={{color: "white"}}>Sign up</Link></p>
             

                </div>
            </div>
        </div>
    );
}

export default Login;
