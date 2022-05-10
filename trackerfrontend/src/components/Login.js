import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMeChecked, setChecked] = React.useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const handleChange = () => { setChecked(!rememberMeChecked); };

    const navigate = useNavigate();
    const toAccount = useCallback(() => navigate('/account', {replace: false}), [navigate]);

    // Detect enter key press
    function handleEnterKeyPress(event) {
        if(event.key === 'Enter') {
            login()
        }
    }

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
            token = localStorage.getItem("token")
        } else if (sessionStorage.getItem("token") !== null) {
            token = sessionStorage.getItem("token")
        }
        
        // Validate token
        axios.get("http://ec2-54-85-97-52.compute-1.amazonaws.com/validateToken?token=" + token)
            .then(response => {
                if (response.data) {
                    toAccount()
                } else {
                    sessionStorage.removeItem("token")
                    localStorage.removeItem("token")
                }
            })
            .catch (error => console.error(error.response))
    }
        
    // Handle log in
    function login() {

        if (email.length < 1 || password.length < 1) {
            setLoginErrorMessage("Please fill in all fields.")
        } else {
            axios.get("http://ec2-54-85-97-52.compute-1.amazonaws.com/login?emailid=" + email + "&password=" + password)
            .then(response => {
                if (response.data === "User Not Found") {
                    setLoginErrorMessage("Account or Password Incorrect.")
                    return
                }
                if (response.data === "Incorrect Password") {
                    setLoginErrorMessage("Account or Password Incorrect.")
                    return
                }
                
                // Check if user has opted into remember me and store token accordingly
                if (rememberMeChecked) {
                    localStorage.setItem("token", response.data)
                } else {
                    sessionStorage.setItem("token", response.data)
                }

                toAccount()
            })
            .catch (error => {
                console.error(error.response)
                setLoginErrorMessage("An unexpected error has occurred. Unable to login.")
            })
        }
        
    }

    return(
        <div className="App-body">
            <h1>
                Log in
            </h1>

            <div className="Form-container">
                <div className="Form">
                    <input className="Form-control" name="wenben" type="text" placeholder={'email'} value={email}
                        onInput={(e) => setEmail(e.target.value)}
                        onKeyDown={handleEnterKeyPress}/>
                    <input className="Form-control" name="wenben" type="password" placeholder={'password'} value={password}
                        onInput={(e) => setPassword(e.target.value)}
                        onKeyDown={handleEnterKeyPress}/>

                    <button onClick={login}>Log in</button>

                    <div className="Form-text" style={{fontSize: 15, color: '#ff4337', fontWeight: 'bold'}}>{loginErrorMessage}</div>

                    <div>
                        <div className="Form-text" style={{display: 'inline-block', fontSize: 18, marginRight: 7}}>Remember Me </div>
                        <input type="checkbox" checked={rememberMeChecked} onChange={handleChange} />
                    </div>

                    <div className="Form-text" style={{fontSize: 18}}>Don't have an account? <Link to='/signup' style={{color: "white"}}>Sign up</Link></div>
             

                </div>
            </div>
        </div>
    );
}

export default Login;
