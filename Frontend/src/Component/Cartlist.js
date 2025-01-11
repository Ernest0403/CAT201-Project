import React, { useState } from "react";
import './Cartlist.css';


const Cartlist = ({imageSrc, itemName, tags, price, quantity, changeQuantity}) => {
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

    //Add and Subtract Quantity
    const SubCart = () => {
        changeQuantity(itemName, quantity-1);
    }

    const AddCart = () => {
        changeQuantity(itemName, quantity+1);
    }
    
    return (
        <div className='CartCard'>
            <button 
                className={SelectedStatus}
                onClick={changeStatus}>
                ✓
            </button>
            <div className="CartItemPhoto">
            <img src={imageSrc} alt="" />
            </div>
            <div className="CartItemDetails">
                <div className="CartItemName">{itemName}</div>
                <div className="CartTagGroup">
                    {/*{tags.map((tag, index) => (*/}
                    {/*    <div className="CartTag" key={index}>*/}
                    {/*        {tag}*/}
                    {/*    </div>*/}
                    {/*    ))}*/}
                    <div className="CartTag">
                        {tags}
                    </div>
                </div>
                <div className="CartItemQuantity">
                    <div>
                    Quantity:
                    </div>
                    <div className="CartAmountOption">
                        <button className="SubCart" onClick={SubCart}>-</button>
                        <div className="CartCurrentAmount">{quantity}</div>
                        <button className="AddCart" onClick={AddCart}>+</button>
                    </div>
                </div>
                <button className="RemoveCart">Remove</button>
            </div>
            <div className="CartItemPrice">
                <div>Price</div>
                <div>RM {price}</div>
            </div>
        </div>
    )
}

export default Cartlist;