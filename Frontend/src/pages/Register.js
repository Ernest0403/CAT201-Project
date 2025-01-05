import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate("/"); // Redirect to the homepage after 3 seconds
        }, 3000);
    };

    return (
        <div className="RegisterPage">
            <div className="RegisterContainer">
                <h2>My Account</h2>
                <form className="RegisterForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        required
                    />

                    <button
                        type="submit"
                        className="RegisterButton"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </form>
            </div>

            {showPopup && (
                <div className="PopupOverlay">
                    <div className="PopupBox">
                        <h3>Success</h3>
                        <p>Your registration was successful!</p>
                        <p>Redirecting to homepage...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
