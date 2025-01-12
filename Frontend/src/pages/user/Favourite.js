import './Cart.css'; //uses similar css styles with cart
import React, {useEffect, useState} from 'react';

function Favourite() {
    const [Favourites, setFavourites] = useState([]);

    // [
    //     { product: "Chair", tag: ["this holiao","this super holiao"], price:"RM 66.66"},
    //     { product: "Noob Chair", tag: ["this soso","dun buy this"], price:"RM 87.87"},
    // ]

    useEffect(() => {
        fetch("http://localhost:8080/cat201_project_war_exploded/Favourite-servlet")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json(); // Parse JSON from response
            })
            .then((data) => {
                console.log("Fetched favProducts:", data); // Log the data to check
                setFavourites(data.favProducts); // Set the state with the fetched data
            })
            .catch((error) => {
                console.error("Error fetching favProducts:", error);
            });
    }, []);

    return (
        <div>
            {Favourites.map((fav) => (
            <div key={fav.id} className='CartCard'>
                <div className="CartItemPhoto">
                    <img src={fav.image} alt="" />
                    </div>
                    <div className="CartItemDetails">
                        <div className="CartItemName">{fav.product}</div>
                        <div className="CartTagGroup">
                            {/*{fav.tag.map((tag, index) => (*/}
                            {/*    <div className="CartTag" key={index}>*/}
                            {/*        {tag}*/}
                            {/*    </div>*/}
                            {/*    ))}*/}
                            <div className="CartTag">
                                {fav.tag}
                            </div>
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