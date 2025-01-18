import './Cart.css'; //uses similar css styles with cart
import './Favourite.css';
import React, {useEffect, useState} from 'react';

function Favourite() {
    const [Favourites, setFavourites] = useState([]);

    const fetchFavData = () => {
        fetch("http://localhost:8080/cat201_project_war/Favourite-servlet")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched favProducts:", data);
                setFavourites(data.favProducts);
            })
            .catch((error) => {
                console.error("Error fetching favProducts:", error);
            });
    }

    //Fetch data from csv
    useEffect(() => {
        fetchFavData();
    }, []);

    //fetch data to csv (remove fav)
    const removeFav = async (id) => {
        await fetch('http://localhost:8080/cat201_project_war/Favourite-servlet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'removeFav',
                    productId: id,
                }),
            }
        );
        fetchFavData();
    }

    return (
        <div>
            {Favourites.map((fav) => (
            <div key={fav.id} className='FavCard'>
                <div className="CartItemPhoto">
                    <img src={fav.image} alt="" />
                    </div>
                    <div className="CartItemDetails">
                        <div className="CartItemName">{fav.product}</div>
                        <div className="CartTagGroup">
                            <div className="CartTag">
                                {fav.tag}
                            </div>
                        </div>
                        <button className="RemoveCart" onClick={() => removeFav(fav.productID)}>Remove</button>
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