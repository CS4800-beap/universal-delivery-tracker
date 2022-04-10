import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";



function Signup() {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
    // https://www.robinwieruch.de/react-checkbox/

    const handleChange = () => { setChecked(!checked); };

    const navigate = useNavigate();
    const toAccount = useCallback(() => navigate('/account', {replace: false}), [navigate]);
    
    // Handle sign up
    function signup() {
        /*
        console.log("First Name: ", firstName)
        console.log("Last Name: ", lastName)
        console.log("Email: ", email)
        console.log("Password: ", password)
        console.log("Confirm Password: ", confirmPassword)
        console.log("Remember me?:", checked)
        */
        
        axios.get("http://localhost:8080/signup?emailid=" + email + "&password=" + password + "&fname=" + firstName + "&lname=" + lastName)
            .then(function(response) {
                console.log(response.data)
                if (response.data == true) {
                    toAccount()
                } else {
                    // Temporary alert
                    alert("Failed to create account")
                }
            }).catch (error => {
                console.log(error.response.data.error);
            })
    }

    return(
        <div className="App-body">
            <h1>
                Sign up
            </h1>
            <div className="Form-container">
                <div className="Form">
                    <input className="Form-control" name="wenben" type="text" placeholder={'first name'} value={firstName} onInput={(e) => setFirstName(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'last name'} value={lastName} onInput={(e) => setLastName(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'email'} value={email} onInput={(e) => setEmail(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'password'} value={password} onInput={(e) => setPassword(e.target.value)}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'confirm password'} value={confirmPassword} onInput={(e) => setConfirmPassword(e.target.value)}/>

                    <button onClick={signup}>Sign up</button>
                    
                    <div>
                        <p style={{display: 'inline-block', fontSize: 18, marginRight: 7}}>Remember Me </p>
                        <input type="checkbox" checked={checked} onChange={handleChange} />
                    </div>

                    <p style={{fontSize: 18}}>Already have an account? <Link to='/login' style={{color: "white"}}>Log in</Link></p>
                

                </div>
            </div>
        </div>
    );
}

export default Signup;
