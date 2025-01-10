import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

function ForgetPassword() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(""); // "success" or "error"
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPopupType("error");
            setPopupMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/cat201_project_war/ForgetPasswordServlet", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    usernameOrEmail: usernameOrEmail,
                    newPassword: newPassword,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === "success") {
                    setPopupType("success");
                    setPopupMessage("Password reset successfully!");
                    setTimeout(() => {
                        setPopupMessage("");
                        navigate("/"); // Redirect to homepage
                    }, 3000);
                } else {
                    setPopupType("error");
                    setPopupMessage(data.message || "An error occurred.");
                }
            } else {
                const errorData = await response.json();
                setPopupType("error");
                setPopupMessage(errorData.message || "User not found!");
            }
        } catch (error) {
            setPopupType("error");
            setPopupMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="ForgetPasswordPage">
            <div className="ForgetPasswordContainer">
                <h2>Reset Password</h2>
                <form className="ForgetPasswordForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email address/Username</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your email or username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="new-password">New Password</label>
                    <input
                        id="new-password"
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="SubmitButton">
                        Submit
                    </button>
                </form>
            </div>

            {popupMessage && (
                <div className="PopupOverlay">
                    <div className={`PopupBox ${popupType === "success" ? "PopupSuccess" : "PopupError"}`}>
                        <h3>{popupType === "success" ? "Success" : "Error"}</h3>
                        <p>{popupMessage}</p>
                        {popupType === "error" && <button onClick={() => setPopupMessage("")}>Close</button>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgetPassword;

