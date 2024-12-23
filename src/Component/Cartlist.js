import React, { useState } from "react";
import './Cartlist.css';


function Cartlist(){
    //setStatus function for button
    const [SelectedStatus, setStatus] = useState("NotSelected");

    const changeStatus = () => {
        if (SelectedStatus !== "NotSelected") {
            setStatus("NotSelected");
            console.log("Not selected");
        }
        else {
            setStatus("Selected");
            console.log("Changed state");
        }
    };
    
    return (
        <div className='CartCard'>
            <button 
                className={SelectedStatus}
                onClick={changeStatus}>
                ✓
            </button>
            <div className="ItemPhoto">
            <img src={"/Images/cart.jpg"} alt="" />
            </div>
            <div>Item details</div>
            <div>Price</div>
        </div>
    )
}

export default Cartlist;