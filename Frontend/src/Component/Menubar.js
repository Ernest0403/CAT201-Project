import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Menubar.css";

function Menubar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    // Fetch session details on load
    useEffect(() => {
        fetch("http://localhost:8080/cat201_project_war/CheckSessionServlet", {
            method: "GET",
            credentials: "include", // Include session cookies
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    setIsLoggedIn(true);
                    setUsername(data.username);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch((error) => console.error("Error checking session:", error));
    }, []);

    const handleLoginOrAccountClick = () => {
        if (isLoggedIn) {
            navigate("/dashboard"); // Redirect to dashboard if logged in
        } else {
            navigate("/login"); // Redirect to login page if not logged in
        }
    };

    const handleLogout = () => {
        fetch("http://localhost:8080/cat201_project_war/LogoutServlet", {
            method: "POST",
            credentials: "include", // Include session cookies
        })
            .then((response) => {
                if (response.ok) {
                    setIsLoggedIn(false);
                    setUsername("");
                    navigate("/login"); // Redirect to login page after logout
                }
            })
            .catch((error) => console.error("Error during logout:", error));
    };

    return (
        <div className="Menubar-flex">
            <div className="TextLogo">ComfortZone</div>
            <div className="Searchbar">
                <input type="text" name="SearchInput" placeholder="Search for products" />
                <span className="SearchIcon">
                    <img src="/Images/search.png" alt="Search Icon" />
                </span>
            </div>
            <button className="MenuLoginButton" onClick={handleLoginOrAccountClick}>
                <div className="LoginIcon">
                    <img src="/Images/accounticon.png" alt="Account Icon" />
                    <div>{isLoggedIn ? `Welcome, ${username}` : "Login/Register"}</div>
                </div>
            </button>
            {isLoggedIn && (
                <button className="LogoutButton" onClick={handleLogout}>
                    Logout
                </button>
            )}
            <button className="Button" onClick={() => navigate("/cart")}>
                <img src="/Images/cart.jpg" alt="Cart Icon" />
            </button>
            <button className="Button" onClick={() => navigate("/favourite")}>
                <img src="/Images/favourite.png" alt="Favourite Icon" />
            </button>
        </div>
    );
}

export default Menubar;


