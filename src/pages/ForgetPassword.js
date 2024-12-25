// ForgetPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

function ForgetPassword() {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate("/"); // Redirect to homepage layout after 3 seconds
        }, 3000);
    };

    return (
        <div className="ForgetPasswordPage">
            <div className="ForgetPasswordContainer">
                <h2>Reset Password</h2>
                <div className="ForgetPasswordForm">
                    <label>Email address/Username</label>
                    <input type="text" placeholder="Enter your email or username" />

                    <label>New Password</label>
                    <input type="password" placeholder="Enter your new password" />

                    <label>Confirm New Password</label>
                    <input type="password" placeholder="Confirm your new password" />

                    <button className="SubmitButton" onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            {showPopup && (
                <div className="PopupOverlay">
                    <div className="PopupBox">
                        <h3>Success</h3>
                        <p>Your password has been reset successfully!</p>
                        <p>Redirecting to homepage...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgetPassword;