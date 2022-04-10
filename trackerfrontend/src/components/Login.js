import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(!checked);
    };

    // Handle log in
    function login() {
        axios.get("http://localhost:8080/login?emailid=" + email + "&password=" + password)
            .then(response => console.log(response))
            .catch (error => console.error(error))
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

                    <div>
                        <p style={{display: 'inline-block', fontSize: 18, marginRight: 7}}>Remember Me </p>
                        <input type="checkbox" checked={checked} onChange={handleChange} />
                    </div>

                    <p style={{fontSize: 18}}>Don't have an account? <Link to='/account/signup' style={{color: "white"}}>Sign up</Link></p>
             

                </div>
            </div>
        </div>
    );
}

export default Login;
