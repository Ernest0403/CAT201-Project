import './Cart.css';
import React, {useState,useEffect} from 'react';
import Cartlist from '../../Component/Cartlist';
import { useNavigate } from "react-router-dom";


function Cart() {
  const [Carts , setCarts] = useState([]);

  //backend  pass whole cart list
    const fetchCartData = () => {
        fetch("http://localhost:8080/cat201_project_war/Cart-servlet")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json(); // Parse JSON from response
            })
            .then((data) => {
                console.log("Fetched cartProducts:", data); // Log the data to check
                setCarts(data.cartProducts); // Set the state with the fetched data
            })
            .catch((error) => {
                console.error("Error fetching cartProducts:", error);
            });
    };

    useEffect(() => {
        fetchCartData(); // Fetch data on component mount
    }, []);

  //To handle change in cart quantity
  const handleQuantityChange = async (id, product, newQuantity) => {
    setCarts((initialCarts) =>
      initialCarts.map((cart) =>
        cart.product === product ? { ...cart, quantity: newQuantity } : cart
      )

    );

    //Update the cart quantity in backend
      const response = await fetch('http://localhost:8080/cat201_project_war/Cart-servlet', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              action: 'updateQuantity',
              productId: id,
              quantity: newQuantity,
          }),
      }
    );

      if (newQuantity === 0) {
          fetchCartData(); // Trigger fetch if quantity is 0
      }
  };

  const navigate = useNavigate();

  return (
      <div className='CartView'>
          <div className='ItemList'>
              {Carts.length === 0? "no cart" : Carts.map((cart) => (
                  <Cartlist
                      productID={cart.productID}
                      imageSrc={cart.image}
                      itemName={cart.product}
                      tags={cart.tag}
                      price={cart.price}
                      quantity={cart.quantity? cart.quantity : "None"}
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