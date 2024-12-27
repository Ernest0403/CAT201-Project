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
            navigate("/"); // Redirect to homepage after 3 seconds
        }, 3000);
    };

    return (
        <div className="ForgetPasswordPage">
            <div className="ForgetPasswordContainer">
                <h2>Reset Password</h2>
                <form className="ForgetPasswordForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="email">Email address/Username</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your email or username"
                        required
                    />

                    <label htmlFor="new-password">New Password</label>
                    <input
                        id="new-password"
                        type="password"
                        placeholder="Enter your new password"
                        required
                    />

                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your new password"
                        required
                    />

                    <button
                        type="submit"
                        className="SubmitButton"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
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
