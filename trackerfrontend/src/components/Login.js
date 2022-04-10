import React, { useState, useCallback } from "react";
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

    // Handle log in
    function login() {
        /*
        console.log("Email: ", email)
        console.log("Password: ", password)
        */

        axios.get("http://localhost:8080/login?emailid=" + email + "&password=" + password)
            .then(response => {
                console.log(response.data)
                if (response.data == true) {
                    toAccount()
                } else {
                    // Temporary alert
                    alert("Invalid credentials")
                }
            })
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

                    <p style={{fontSize: 18}}>Don't have an account? <Link to='/signup' style={{color: "white"}}>Sign up</Link></p>
             

                </div>
            </div>
        </div>
    );
}

export default Login;
