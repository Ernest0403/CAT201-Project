import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [popupMessage, setPopupMessage] = useState("");   // For success or error messages
    const [popupType, setPopupType] = useState("");         // e.g. "success" or "error"
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    // We'll call this when the form is submitted
    const handleRegister = async (e) => {
        e.preventDefault();  // Prevent the default form submission

        // Optional client-side checks
        if (!email || !username || !password || !confirmPassword) {
            setPopupType("error");
            setPopupMessage("All fields are required.");
            setShowPopup(true);
            return;
        }
        if (password !== confirmPassword) {
            setPopupType("error");
            setPopupMessage("Passwords do not match.");
            setShowPopup(true);
            return;
        }

        try {
            // Make a POST request to your RegisterServlet
            const response = await fetch("http://localhost:8080/cat201_project_war/RegisterServlet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: email,
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
                }),
            });

            // Parse the JSON
            const data = await response.json();
            if (response.ok) {
                // If servlet returned a success
                if (data.status === "success") {
                    setPopupType("success");
                    setPopupMessage("Registration successful!");
                    setShowPopup(true);
                    // Redirect after 3s
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                } else {
                    // The servlet returned an error JSON, e.g. user already exists
                    setPopupType("error");
                    setPopupMessage(data.message || "Registration failed.");
                    setShowPopup(true);
                }
            } else {
                // The server responded with a non-200 status code
                setPopupType("error");
                setPopupMessage(data.message || "An error occurred. Please try again.");
                setShowPopup(true);
            }
        } catch (error) {
            // Network or other unexpected error
            setPopupType("error");
            setPopupMessage("Unable to register. Please check your connection.");
            setShowPopup(true);
        }
    };

    return (
        <div className="RegisterPage">
            <div className="RegisterContainer">
                <h2>My Account</h2>
                <form className="RegisterForm" onSubmit={handleRegister}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="RegisterButton">
                        Register
                    </button>
                </form>
            </div>

            {showPopup && (
                <div className="PopupOverlay">
                    <div className="PopupBox">
                        <h3>{popupType === "success" ? "Success" : "Error"}</h3>
                        <p>{popupMessage}</p>
                        {popupType === "error" && (
                            <button onClick={() => setShowPopup(false)}>Close</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;

