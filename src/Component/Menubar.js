import './Menubar.css';
import React from 'react';

function Menubar(){
    return(
        <div className = "Menubar-flex">
            <div><p>ComfortZone</p></div>
            <label className='Searchbar'>
                <div>
                    <input type = "Searchtext" name= "SearchInput" placeholder="Search for products" />
                    <span className='SearchIcon'>
                        <img src={"/Images/search.png"} alt='' /> 
                    </span>
                </div>
            </label>
            <button className='LoginButton'>
                <div className='LoginIcon'>
                    <img src={"/Images/accounticon.png"} alt='' />
                    <p>Login/Register</p>
                </div>
            </button>
            <button className='CartButton'>
                <img src={"/Images/cart.jpg"} alt='' />
            </button>
        </div>
        
    );
}

export default Menubar;