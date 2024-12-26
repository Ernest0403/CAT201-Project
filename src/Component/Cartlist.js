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
                    <div>
                        Quantity:
                    </div>
                    <div className="CartAmountOption">
                        <button className="SubCart">-</button>
                        <div className="CartCurrentAmount">1</div>
                        <button className="AddCart">+</button>
                    </div>
                </div>
                <button className="RemoveCart">Remove</button>
            </div>
            <div className="CartItemPrice">
                <div>Price</div>
                <div>RM 46.36</div>
            </div>
        </div>
    )
}

export default Cartlist;