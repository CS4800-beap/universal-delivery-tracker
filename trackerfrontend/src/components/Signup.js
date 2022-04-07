import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


function Signup() {

    const navigate = useNavigate();
    const toLogin = useCallback(() => navigate('/account/login', {replace: false}), [navigate]);
    const [checked, setChecked] = React.useState(false);
    // https://www.robinwieruch.de/react-checkbox/

    const handleChange = () => {
        setChecked(!checked);
    };
    
    return(
        <body className="App-body">
            <h1>
                Signup Page
            </h1>
            <div className="Form-container">
                <form className="Form">
                    <input className="Form-control" name="wenben" type="text" placeholder={'email'}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'password'}/>
                    <input className="Form-control" name="wenben" type="text" placeholder={'confirm password'}/>

                    <input id="button" type="button" value="Sign up"/>
                    
                    <div>
                        <p style={{display: 'inline-block'}}>Remember Me</p>
                        <input type="checkbox" 
                            checked={checked}
                            onChange={handleChange}
                        />
                    </div>

                    {/*                     
                     <p>Is "My Value" checked? {checked.toString()}</p>
                    */}

                    <p style={{fontSize: 18}}>Already have an account? Log in</p>
                    <button onClick={toLogin} style={{margin: '1vh'}}>
                        to login page
                    </button>







                </form>
            </div>
            










            
        </body>
    );
}

export default Signup;
