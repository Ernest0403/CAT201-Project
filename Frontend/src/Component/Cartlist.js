import React, {useEffect, useState} from "react";
import './Cartlist.css';


const Cartlist = ({productID, imageSrc, itemName, tags, price, quantity, changeQuantity, setSelected}) => {
    //setStatus function for button
    //Use localStorage to keep track on the state changes even after refresh
    const [SelectedStatus, setStatus] = useState(
        localStorage.getItem(`SelectedStatus_${productID}`) || "NotSelected");

    useEffect(() => {
        localStorage.setItem(`SelectedStatus_${productID}`, SelectedStatus);
    }, [SelectedStatus]);

    const changeStatus = async () => {
        if (SelectedStatus !== "NotSelected") {
            setStatus("NotSelected");
            console.log("Not selected");
        }
        else {
            setStatus("Selected");
            console.log("Changed state");
        }

        //Update the selected cart in backend
        const response = await fetch('http://localhost:8080/cat201_project_war/Cart-servlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'updateSelected',
                productId: productID
            }),
        })

        setSelected();
    };

    //Add and Subtract Quantity
    const SubCart = () => {
        changeQuantity(productID, itemName, quantity-1);
    }

    const AddCart = () => {
        changeQuantity(productID, itemName, quantity+1);
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