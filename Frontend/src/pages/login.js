import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
    const [userCredentials, setUserCredentials] = useState({
        usernameOrEmail: "",
        password: ""
    });
    const [adminCredentials, setAdminCredentials] = useState({
        usernameOrEmail: "",
        password: ""
    });
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(""); // "success" or "error"
    const navigate = useNavigate();

    /**
     * Handles changes for either user or admin credential objects.
     * @param {Event} e - The input change event
     * @param {Function} setCredentials - state setter for either user or admin
     */
    const handleInputChange = (e, setCredentials) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Attempts to log in a user (or admin) by sending a POST to your LoginServlet.
     * @param {Object} credentials - { usernameOrEmail, password }
     * @param {String} userType - "user" or "admin"
     */
    const handleLogin = async (credentials, userType) => {
        // Simple client-side validation
        if (!credentials.usernameOrEmail || !credentials.password) {
            setPopupType("error");
            setPopupMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/cat201_project_war/LoginServlet",
                {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    usernameOrEmail: credentials.usernameOrEmail,
                    password: credentials.password,
                    userType: userType
                }),
            });

            if (response.ok) {
                // Attempt to parse JSON response
                const data = await response.json();
                if (data.status === "success") {
                    setPopupType("success");
                    setPopupMessage(
                        userType === "admin"
                            ? "Admin login successful!"
                            : "User login successful!"
                    );

                    // Automatically navigate after 3s
                    setTimeout(() => {
                        setPopupMessage("");
                        navigate(userType === "admin" ? "/dashboard" : "/user-dashboard");
                    }, 3000);
                } else {
                    // The servlet returned a JSON with status != "success"
                    setPopupType("error");
                    setPopupMessage(data.message || "Login failed.");
                }
            } else {
                // The servlet returned an error status (e.g., 400, 401, 500)
                const errorData = await response.json();
                setPopupType("error");
                setPopupMessage(errorData.message || "Invalid credentials.");
            }
        } catch (error) {
            // Network or other unexpected error
            setPopupType("error");
            setPopupMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="LoginPage">
            {/* ======== User Login Section ======== */}
            <div className="LoginContainer">
                <h2>My Account</h2>
                <div className="LoginForm">
                    <label>Email/Username</label>
                    <input
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Enter your email or username"
                        value={userCredentials.usernameOrEmail}
                        onChange={(e) => handleInputChange(e, setUserCredentials)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={userCredentials.password}
                        onChange={(e) => handleInputChange(e, setUserCredentials)}
                        required
                    />

                    <p className="ForgotPassword" onClick={() => navigate("/reset-password")}>
                        Forgot your password? Click here
                    </p>

                    <button
                        className="LoginButton"
                        onClick={() => handleLogin(userCredentials, "user")}
                    >
                        Login
                    </button>

                    <p className="RegisterLink">
                        Don’t have an account?
                        <span onClick={() => navigate("/register")}> Register here</span>
                    </p>
                </div>
            </div>

            {/* ======== Admin Login Section ======== */}
            <div className="AdminLoginContainer">
                <h2>Administrator Login</h2>
                <div className="LoginForm">
                    <label>Username/Email</label>
                    <input
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Enter admin username or email"
                        value={adminCredentials.usernameOrEmail}
                        onChange={(e) => handleInputChange(e, setAdminCredentials)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter admin password"
                        value={adminCredentials.password}
                        onChange={(e) => handleInputChange(e, setAdminCredentials)}
                        required
                    />

                    <button
                        className="LoginButton"
                        onClick={() => handleLogin(adminCredentials, "admin")}
                    >
                        Login
                    </button>
                </div>
            </div>

            {/* ======== Popup Overlay ======== */}
            {popupMessage && (
                <div className="PopupOverlay">
                    <div
                        className={`PopupBox ${
                            popupType === "error" ? "PopupError" : "PopupSuccess"
                        }`}
                    >
                        <h3>{popupType === "error" ? "Error" : "Success"}</h3>
                        <p>{popupMessage}</p>
                        {popupType === "error" && (
                            <button onClick={() => setPopupMessage("")}>Close</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;









