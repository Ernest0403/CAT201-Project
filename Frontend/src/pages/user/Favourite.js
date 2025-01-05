import './Cart.css'; //uses similar css styles with cart
import React, {useState} from 'react';

function Favourite() {
    const [Favourites] = useState([
            { product: "Chair", tag: ["this holiao","this super holiao"], price:"RM 66.66"},
            { product: "Noob Chair", tag: ["this soso","dun buy this"], price:"RM 87.87"},
          ]);
    
    return (
        <div>
            {Favourites.map((fav) => (
            <div key={fav.id} className='CartCard'>
                <div className="CartItemPhoto">
                    <img src={"/Images/cart.jpg"} alt="" />
                    </div>
                    <div className="CartItemDetails">
                        <div className="CartItemName">{fav.product}</div>
                        <div className="CartTagGroup">
                        {fav.tag.map((tag, index) => (
                            <div className="CartTag" key={index}>
                                {tag}
                            </div>
                            ))}
                        </div>
                        <button className="RemoveCart">Remove</button>
                    </div>
                    <div className="CartItemPrice">
                        <div>Price</div>
                        <div>{fav.price}</div>
                    </div>
                    </div>
            ))}
        </div>
        )
}

export default Favourite;