import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menubar.css";

function Menubar() {
    const navigate = useNavigate();

    return (
        <div className="Menubar-flex">
            <div className="TextLogo">ComfortZone</div>
            <div className="Searchbar">
                <input type="text" name="SearchInput" placeholder="Search for products" />
                <span className="SearchIcon">
                    <img src="/Images/search.png" alt="Search Icon" />
                </span>
            </div>
            <button className="MenuLoginButton" onClick={() => navigate("/login")}>
                <div className="LoginIcon">
                    <img src="/Images/accounticon.png" alt="Account Icon" />
                    <div>Login/Register</div>
                </div>
            </button>
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



