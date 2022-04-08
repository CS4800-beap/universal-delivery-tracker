import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../App.css";



function Signup() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
    // https://www.robinwieruch.de/react-checkbox/

    const handleChange = () => {
        setChecked(!checked);
    };
    
    // Handle sign up
    function signup() {
        console.log("Email: ", email)
        console.log("Password: ", password)
        console.log("Confirm Password: ", confirmPassword)
        console.log("Remember me?:", checked)
    }

    return(
        <div className="App-body">
            <h1>
                Sign up
            </h1>
            <div className="Form-container">
                <div className="Form">
                    <input className="Form-control" name="wenben" type="text" placeholder={'email'} value={email} onInput={(e) => setEmail(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'password'} value={password} onInput={(e) => setPassword(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'confirm password'} value={confirmPassword} onInput={(e) => setConfirmPassword(e.target.value)}/>

                    <button onClick={signup}>Sign up</button>
                    
                    <div>
                        <p style={{display: 'inline-block', fontSize: 18, marginRight: 7}}>Remember Me </p>
                        <input type="checkbox" checked={checked} onChange={handleChange} />
                    </div>

                    <p style={{fontSize: 18}}>Already have an account? <Link to='/account/login' style={{color: "white"}}>Log in</Link></p>
                

                </div>
            </div>
        </div>
    );
}

export default Signup;
