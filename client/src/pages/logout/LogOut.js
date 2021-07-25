import React from 'react'
import "./logout.css"

function LogOut() {
    return (
        <div className="logOut">
            <div className="logOutWrapper">
                <div className="logOutLeft">
                    <h3 className="logOutLogo">Vintage Ryders Social</h3>
                    <span className="logOutDesc">
                        Happy trails.
                    </span>
                </div>
                <div className="logOutRight">
                    <form className="logOutBox">
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="logOutInput"
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="6"
                            className="logOutInput"

                        />
                        <button className="logOutButton" type="submit">
                            Sign In
                        </button>
                        <span className="logOutForgot">Forgot Password?</span>
                        <button className="logOutRegisterButton">
                            Sign Up
                        </button>
                        <span className="logOutForgot">Sign Up</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogOut;
