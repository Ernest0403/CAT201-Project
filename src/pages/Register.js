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
            navigate("/"); 
        }, 3000);
    };

    return (
        <div className="RegisterPage">
            <div className="RegisterContainer">
                <h2>My Account</h2>
                <div className="RegisterForm">
                    <label>Email address</label>
                    <input type="text" placeholder="Enter your email" />

                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />

                    <label>Confirm your password</label>
                    <input type="password" placeholder="Confirm your password" />

                    <button className="RegisterButton" onClick={handleRegister}>Register</button>
                </div>
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