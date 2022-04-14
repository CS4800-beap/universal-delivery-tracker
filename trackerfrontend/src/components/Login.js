import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [checked, setChecked] = React.useState(false);
    const handleChange = () => { setChecked(!checked); };

    const navigate = useNavigate();
    const toAccount = useCallback(() => navigate('/account', {replace: false}), [navigate]);


    // Call checkToken() after component has rendered
    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  checkToken()
            return () => { ignore = true; }
        },[]);

    // Call API to check tokens in local and session storages
    function checkToken() {

        var token = "";
        token = sessionStorage.getItem("token");
        token = localStorage.getItem("token");

        axios.get("http://localhost:8080/validateToken?token=" + token)
            .then(response => {
                if (response.data) {
                    toAccount()
                } else {
                    sessionStorage.removeItem("token");
                    localStorage.removeItem("token");
                }
            })
            .catch (error => console.error(error.response))
    }
        
    // Handle log in
    function login() {

        axios.get("http://localhost:8080/login?emailid=" + email + "&password=" + password)
            .then(response => {
                if (response.data === "User Not Found" || response.data === "Incorrect Password") {
                    // Temporary alert
                    alert("Invalid credentials")
                } else {
                    if (checked) {
                        localStorage.setItem("token", response.data)
                    } else {
                        sessionStorage.setItem("token", response.data)
                    }
                    toAccount()
                }
            })
            .catch (error => console.error(error.response))
    }

    return(
        <div className="App-body">
            <h1>
                Log in
            </h1>

            <div className="Form-container">
                <div className="Form">
                    <input className="Form-control" name="wenben" type="text" placeholder={'email'} value={email} onInput={(e) => setEmail(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="password" placeholder={'password'} value={password} onInput={(e) => setPassword(e.target.value)}/>

                    <button onClick={login}>Log in</button>

                    <div>
                        <p style={{display: 'inline-block', fontSize: 18, marginRight: 7}}>Remember Me </p>
                        <input type="checkbox" checked={checked} onChange={handleChange} />
                    </div>

                    <p style={{fontSize: 18}}>Don't have an account? <Link to='/signup' style={{color: "white"}}>Sign up</Link></p>
             

                </div>
            </div>
        </div>
    );
}

export default Login;
