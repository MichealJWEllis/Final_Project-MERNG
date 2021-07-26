import React, { useState } from 'react'
import "./signup.css"
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';



const SignUp = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [addUser, { error }] = useMutation(ADD_USER)

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState }
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className="signUp">
            <div className="signUpWrapper">
                <div className="signUpLeft">
                    <h3 className="signUpLogo">Vintage Ryders Social</h3>
                    <span className="signUpDesc">
                        Connect with Riders around the world on Vintage Ryder.
                    </span>
                </div>
                <div className="signUpRight">

                    <form onSubmit={handleFormSubmit} noValidate className="signUpBox">
                        <h3>Ready to meet other riders?</h3>
                        <input
                            label="Username"
                            placeholder="Username..."
                            name="username"
                            type="username"
                            id="username"
                            required
                            value={formState.username}
                            onChange={handleChange}
                            className="signUpInput"
                        /><br />
                        <input
                            label="Email"
                            placeholder="Email..."
                            name="email"
                            type="email"
                            id="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="signUpInput"
                        /><br />
                        <input
                            label="Password"
                            placeholder="Password..."
                            name="password"
                            type="password"
                            id="password"
                            required
                            value={formState.password}
                            onChange={handleChange}
                            className="signUpInput"
                        /><br />
                        <input
                            label="Confirm Password"
                            placeholder="Confirm Password..."
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            required
                            value={formState.confirmPassword}
                            onChange={handleChange}
                            className="signUpInput"
                        /><br />

                        <button
                            className="signUpRegisterButton"
                            type="submit">
                            Sign Up
                        </button>

                    </form>
                    {error && <div>Sign up failed</div>}
                </div>
            </div>
        </div>
    )
}


export default SignUp;
