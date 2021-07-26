import React from 'react'
import "./logout.css"
import { useHistory } from 'react-router-dom';

function LogOut() {
    let history = useHistory()
    const signup = () => {
        history.push('/signup')
    }
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

                            className="logOutInput"
                        />
                        <input
                            placeholder="Password"
                            type="password"

                            minLength="6"
                            className="logOutInput"

                        />
                        <button className="logOutButton" type="submit">
                            Sign In
                        </button>

                        <button onClick={signup} className="logOutRegisterButton">
                            Sign Up
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogOut;
