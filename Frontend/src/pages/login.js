import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();

    // User login handler
    const handleUserLogin = () => {
        setPopupMessage("User login successful!");
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate("/user-dashboard"); // Redirect to User Dashboard after 3 seconds
        }, 3000);
    };

    // Admin login handler
    const handleAdminLogin = () => {
        setPopupMessage("Admin login successful!");
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate("/dashboard"); // Redirect to Admin Dashboard after 3 seconds
        }, 3000);
    };

    return (
        <div className="LoginPage">
            {/* User Login */}
            <div className="LoginContainer">
                <h2>My Account</h2>
                <div className="LoginForm">
                    <label>Email address/Username</label>
                    <input type="text" placeholder="Enter your email or username" />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />

                    <p className="ForgotPassword" onClick={() => navigate("/reset-password")}>Forgot your password? Click here</p>

                    <button className="LoginButton" onClick={handleUserLogin}>Login</button>

                    <p className="RegisterLink">
                        Don’t have an account? <span onClick={() => navigate("/register")}>Register here</span>
                    </p>
                </div>
            </div>

            {/* Admin Login */}
            <div className="AdminLoginContainer">
                <h2>For Administrator Only</h2>
                <div className="LoginForm">
                    <label>Username</label>
                    <input type="text" placeholder="Enter admin username" />

                    <label>Password</label>
                    <input type="password" placeholder="Enter admin password" />

                    <button className="LoginButton" onClick={handleAdminLogin}>Login</button>
                </div>
            </div>

            {/* Popup for success message */}
            {showPopup && (
                <div className="PopupOverlay">
                    <div className="PopupBox">
                        <h3>Success</h3>
                        <p>{popupMessage}</p>
                        <p>Redirecting...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
