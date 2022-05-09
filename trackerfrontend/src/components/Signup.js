import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";



function Signup() {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rememberMeChecked, setChecked] = useState(false);
    const [signupErrorMessage, setSignupErrorMessage] = useState("");
    // https://www.robinwieruch.de/react-checkbox/

    const handleChange = () => { setChecked(!rememberMeChecked); };

    const navigate = useNavigate();
    const toAccount = useCallback(() => navigate('/account', {replace: false}), [navigate]);
    const toLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);

    // Detect enter key press
    function handleEnterKeyPress(event) {
        if(event.key === 'Enter') {
            signup()
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
        axios.get("http://localhost:8080/validateToken?token=" + token)
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

    // Handle sign up
    function signup() {

        if (firstName.length < 1 || lastName.length < 1 || email.length < 1 || password.length < 1 || confirmPassword.length < 1) {
            setSignupErrorMessage("Please fill in all fields.")
        } else if (password !== confirmPassword) {
            setSignupErrorMessage("Passwords do not match.")
        } else {
            axios.get("http://localhost:8080/signup?emailid=" + email + "&password=" + password + "&fname=" + firstName + "&lname=" + lastName)
                .then(function(response) {
                    console.log(response.data)
                    if (response.data !== true) {
                        setSignupErrorMessage("Failed to create account.")
                        return
                    }

                    toLogin()
                })
                .catch (error => {
                    console.error(error.response.data.error)
                    setSignupErrorMessage("An unexpected error has occurred. Unable to signup.")
                })
        }
    }

    return(
        <div className="App-body">
            <h1>
                Sign up
            </h1>
            <div className="Form-container">
                <div className="Form">
                    <input className="Form-control" name="wenben" type="text" placeholder={'first name'} value={firstName}
                        onInput={(e) => setFirstName(e.target.value)}
                        onKeyDown={handleEnterKeyPress}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'last name'} value={lastName}
                        onInput={(e) => setLastName(e.target.value)}
                        onKeyDown={handleEnterKeyPress}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'email'} value={email}
                        onInput={(e) => setEmail(e.target.value)}
                        onKeyDown={handleEnterKeyPress}/>
                    <input className="Form-control" name="wenben" type="password" placeholder={'password'} value={password}
                        onInput={(e) => setPassword(e.target.value)}
                        onKeyDown={handleEnterKeyPress}/>
                    <input className="Form-control" name="wenben" type="password" placeholder={'confirm password'} value={confirmPassword}
                        onInput={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={handleEnterKeyPress}/>

                    <button onClick={signup}>Sign up</button>
                    
                    <div className="Form-text" style={{fontSize: 15, color: '#ff4337', fontWeight: 'bold'}}>{signupErrorMessage}</div>

                    {/* Not currently being used

                    <div>
                        <div className="Form-text" style={{display: 'inline-block', fontSize: 18, marginRight: 7}}>Remember Me </div>
                        <input type="checkbox" checked={rememberMeChecked} onChange={handleChange} />
                    </div>

                    */}

                    <div className="Form-text" style={{fontSize: 18}}>Already have an account? <Link to='/login' style={{color: "white"}}>Log in</Link></div>
                

                </div>
            </div>
        </div>
    );
}

export default Signup;
