import './Cart.css';
import React, {useState,useEffect} from 'react';
import Cartlist from '../../Component/Cartlist';
import { useNavigate } from "react-router-dom";


function Cart() {
  const [Carts , setCarts] = useState([
    { image: "/Images/cart.jpg",product: "Chair", tag: ["this holiao","this super holiao"], price:"66.66", quantity: 7},
    { image: "/Images/cart.jpg",product: "Table", tag: ["this holiao"], price:"56.66", quantity: 99},
    ]);

  //test backend only, working dy, just need pass whole cart list
  const [clientId, setClientId] = useState(null);
    useEffect(() => {
        // Fetch clientId from the API
        fetch("http://localhost:8080/cat201_project_war_exploded/Cart-servlet")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setClientId(data.clientId); // Set the clientId in state
            })
            .catch((error) => {
                console.error("Error fetching clientId:", error);
            });
    }, []);

  //To handle change in cart quantity
  const handleQuantityChange = (product, newQuantity) => {
    setCarts((initialCarts) =>
      initialCarts.map((cart) =>
        cart.product === product ? { ...cart, quantity: newQuantity } : cart
      )
    );
  };
  
  const navigate = useNavigate();

  return (
      <div className='CartView'>
          <div className='ItemList'>
              {Carts.map((cart) => (
                  <Cartlist
                      imageSrc={cart.image}
                      itemName={cart.product}
                      tags={cart.tag}
                      price={cart.price}
                      quantity={cart.quantity}
                      changeQuantity={handleQuantityChange}
                  />
              ))}
          </div>
          <div className='Summary'>
              <div className='SummaryTitle'>
              SUMMARY
            </div>
            <div className='SummaryBreakdown'>
              <div className='SubDetails'>Selected Item:</div>
              <div className='SubPrices'>2</div>
              <div className='SubDetails'>Product Price:</div>
              <div className='SubPrices'>106.35</div>
              <div className='SubDetails'>Assembly Fee:</div>
              <div className='SubPrices'>30.00</div>
            </div>
            <div className='line'></div>
            <div className='SummaryBreakdown'>
              <div className='SubTotalWord'>Subtotal:</div>
              <div className='SubTotal'><span style={{ fontSize: 'small',verticalAlign: 'top' }}>RM</span>138.35</div>
            </div>
            <div className='line'></div>
            <button className='Checkout'onClick={() => navigate('/checkout')}>
              <div>Checkout</div>
            </button>
        </div>
      </div>
  );
}

export default Cart;