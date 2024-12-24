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
            <div className="CartItemPhoto">
            <img src={"/Images/cart.jpg"} alt="" />
            </div>
            <div className="CartItemDetails">
                <div className="CartItemName">Item Name</div>
                <div className="CartTagGroup">
                    <div className="CartTag">
                        Tag 1
                    </div>
                    <div className="CartTag">
                        Tag 2
                    </div>
                </div>
                <div className="CartItemQuantity">
                    <div className="CartItemAmount">
                        Quantity:
                    </div>
                    <div className="CartAmountOption">
                        1
                    </div>
                <button className="RemoveCart">Remove</button>
                </div>
            </div>
            <div>Price</div>
        </div>
    )
}

export default Cartlist;