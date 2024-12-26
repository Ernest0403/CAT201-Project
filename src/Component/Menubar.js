import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menubar.css";

function Menubar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login"); 
    };

    return (
        <div className="Menubar-flex">
            <div><p>ComfortZone</p></div>
            <label className='Searchbar'>
                <div>
                    <input type="text" name="SearchInput" placeholder="Search for products" />
                    <span className='SearchIcon'>
                        <img src={"/Images/search.png"} alt="Search Icon" /> 
                    </span>
                </div>
            </label>
            <button className='LoginButton' onClick={handleLoginClick}>
                <div className='LoginIcon'>
                    <img src={"/Images/accounticon.png"} alt="Account Icon" />
                    <p>Login/Register</p>
                </div>
            </button>
            <button className='CartButton'>
                <img src={"/Images/cart.jpg"} alt="Cart Icon" />
            </button>
        </div>
    );
}

export default Menubar;