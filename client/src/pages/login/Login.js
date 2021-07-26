import React from 'react'
import "./login.css";
//import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { CircularProgress } from '@material-ui/core';

function Login() {
    let history = useHistory()
    const signup = () => {
        history.push('/signup')
    }
    const home = () => {
        history.push('/')
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Vintage Ryders Social</h3>
                    <span className="loginDesc">
                        Connect with Riders around the world on Vintage Ryder.
                    </span>
                </div>
                <div className="loginRight">

                    <form className="loginBox">
                        <h3>Ready to meet other riders?</h3>
                        <input
                            placeholder="Email"
                            type="email"

                            className="loginInput"
                        /><br />
                        <input
                            placeholder="Password"
                            type="password"

                            minLength="6"
                            className="loginInput"

                        /><br />
                        <button onClick={home} className="loginButton" type="submit">
                            Login
                        </button><br />

                        <button
                            onClick={signup} className="loginRegisterButton">
                            Sign Up
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
