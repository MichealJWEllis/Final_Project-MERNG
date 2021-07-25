import React from 'react'
import "./login.css";
import { CircularProgress } from '@material-ui/core';

function Login() {
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
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"

                        />
                        <button className="loginButton" type="submit">
                            Login
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            Sign Up
                        </button>
                        <span className="loginForgot">Sign Up</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
