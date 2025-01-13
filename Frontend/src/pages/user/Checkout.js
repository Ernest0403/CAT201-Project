import './Checkout.css';
import React, {useEffect} from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Checkout() {
    const [Carts , setCarts] = useState([]);
    const [Summary, setSummary] = useState({});

    //backend  pass whole cart details and summary
    const fetchCartData = () => {
        fetch("http://localhost:8080/cat201_project_war/Checkout-servlet")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json(); // Parse JSON from response
            })
            .then((data) => {
                console.log("Fetched cartProducts:", data); // Log the data to check
                setCarts(data.cartProducts); // Set the state with the fetched data
                setSummary(data.fullSummary);
            })
            .catch((error) => {
                console.error("Error fetching cartProducts:", error);
            });
    };

    useEffect(() => {
        fetchCartData(); // Fetch data on component mount
    }, []);

    //Codes below are used to toggle between shipping options button
    const [
        selectedShip,
        setSelectedShip,
    ] = useState("fast");

    const handleShipOption = (
        value
    ) => {
        if(selectedShip !== value){
            setSelectedShip(value);
        }
        console.log("clicked!")
    };

    //Codes below are used to toggle between payment method button
    const [
        selectedPayment,
        setSelectedPayment,
    ] = useState("");

    const handlePaymentMethod = (
        value
    ) => {
        if(selectedPayment !== value){
            setSelectedPayment(value);
        }
        console.log("clicked!")
    };

    //Codes below are used to toggle between payment platform button
    const [
        selectedPlatform,
        setSelectedPlatform,
    ] = useState("");

    const handlePaymentPlatform = (
        value
    ) => {
        if(selectedPlatform !== value){
            setSelectedPlatform(value);
        }
    };

    const navigate = useNavigate();
    
    return (
      <>
        <div className='CheckoutContainer'>
          <div className='linetop'></div>
          <div className='CheckoutView'>
            <div className='CheckoutColumn'>
                <div className='ShippingOption'>
                    <div className='OptionLable'>
                        SHIPPING OPTION
                    </div>
                    <button className= {`ShippingType ${selectedShip === "fast" ? "fast" : ""}`}
                    onClick={() => handleShipOption("fast")}>
                        <div className='TypeDesc'>
                            <div className='TypeLable'>
                            Fast Shipping
                            </div>
                            <div >
                                Your order will be received within 5 days
                            </div>
                        </div>
                        <div className='ShippingFee'>
                            RM20
                        </div>
                    </button>
                    <button className={`ShippingType ${selectedShip === "normal" ? "normal" : ""}` }
                    onClick={() => handleShipOption("normal")}>
                    <div className='TypeDesc'>
                            <div className='TypeLable'>
                            Normal Shipping
                            </div>
                            <div >
                                Your order will be received between 6 to 20 days
                            </div>
                        </div>
                        <div className='ShippingFee'>
                            RM10
                        </div>
                    </button>
                </div>
                <div className='ShippingDetails'>
                    <div className='OptionLable'>
                            DETAILS AND INFORMATION
                    </div>
                    <lable className='InformationLable'>Recipient Name</lable>
                    <input type="text" id="ShippingRecipientName" name="ShippingRecipientNameInput" />                    
                    <lable className='InformationLable'>Shipping Address Details</lable>
                    <input type="text" id="ShippingAddress" name="ShippingAddressInput" />                    
                    <lable className='InformationLable'>Shipping Address Details (Optional)</lable>
                    <input type="text" id = "ShippingAddressOptional" name= "ShippingAddressOptionalInput" /> 
                    <lable className='InformationLable'>City</lable>
                    <input type="text" id = "ShippingCity" name= "ShippingCityInput" /> 
                    <lable className='InformationLable'>Postcode</lable>
                    <input type="text" id = "ShippingPostcode" name= "ShippingPostcodeInput" /> 
                    <lable className='InformationLable'>State</lable>
                    <input type="text" id = "ShippingState" name= "ShippingStateInput" /> 
                    <lable className='InformationLable'>Contact Number</lable>
                    <input type="text" id = "ShippingContactNumber" name= "ShippingContactNumberInput" /> 
                    <lable className='InformationLable'>Notes/Messages</lable>
                    <input type="text" id = "ShippingNotes" name= "ShippingNotesInput" />  
                </div>
                <div className='PaymentMethod'>
                <div className='OptionLable'>
                        PAYMENT METHOD
                    </div>
                    <button className={`PaymentType ${selectedPayment === "online" ? "online" : ""}`}
                    onClick = {() => handlePaymentMethod("online")}>
                        <div className='TypeDesc'>
                            <div className='TypeLable'>
                            Online Banking
                            </div>
                            <div >
                                Maybank2U....
                            </div>
                        </div>
                    </button>
                    {selectedPayment === "online" ? 
                            <div className='bankingplatform'>
                                <button className={`PaymentType ${selectedPlatform === "Maybank2U" ? "selected" : ""}`}
                                onClick = {() => handlePaymentPlatform("Maybank2U")}>
                                Maybank2U
                                </button>
                                <button className={`PaymentType ${selectedPlatform === "BankingRHBnline" ? "selected" : ""}`}
                                onClick = {() => handlePaymentPlatform("BankingRHBnline")}>
                                BankingRHB
                                </button> 
                                <button className={`PaymentType ${selectedPlatform === "myBSN" ? "selected" : ""}`}
                                onClick = {() => handlePaymentPlatform("myBSN")}>
                                myBSN
                                </button> 
                                <button className={`PaymentType ${selectedPlatform === "AmOnline" ? "selected" : ""}`}
                                onClick = {() => handlePaymentPlatform("AmOnline")}>
                                AmOnline
                                </button> 
                            </div>
                        : <></>
                    }
                    <button className={`PaymentType ${selectedPayment === "card" ? "card" : ""}`}
                    onClick = {() => handlePaymentMethod("card")}>
                        <div className='TypeDesc'>
                            <div className='TypeLable'>
                            Credit/Debit Card
                            </div>
                            <div >
                                Proceed with card details
                            </div>
                        </div>
                    </button>
                    {selectedPayment === "card" ?
                        <div className='ShippingDetails'>
                            <div className='InformationLable'>Card Number</div>
                            <input type="text" id = "CardNumber" name= "CardNumberInput" />
                            <div className='InformationLable'>Card's Holder Name</div>
                            <input type="text" id = "CardHolderName" name= "CardHolderNameInput" />
                            <div className='InformationLable'>Card Expiry Date</div>
                            <input type="text" id = "CardED" name= "CardEDInput" />
                            <div className='InformationLable'>CVV</div>
                            <input type="text" id = "CardCVV" name= "CardCVVInput" /> 
                        </div>
                        : <></>
                    }
                </div>
                <div className='CheckoutNav'>
                    <button className='BackToCart' onClick={() => navigate('/cart')}>Back to Cart</button>
                    <button className='ProceedPayment' onClick={() => navigate('/payment-success')}>Proceed to Payment</button>
                </div>
            </div>
            <div className='CheckoutSummary'>
                <div className='SummaryTitle'>
                  <p>SUMMARY</p>
                </div>
                <div className='SummaryBreakdown'>
                  <div className='SubDetails'>Selected Item:</div>
                  <div className='SubPrices'>{Summary.SelectedQuantity}</div>
                  <div className='SubDetails'>Product Price:</div>
                  <div className='SubPrices'>{Summary.SubPrice}</div>
                  <div className='SubDetails'>Assembly Fee:</div>
                  <div className='SubPrices'>{Summary.AssemblyFee}</div>
                  <div className='SubDetails'>Delivery:</div>
                  <div className='SubPrices'>{Summary.Delivery}</div>
                  <div className='SubDetails'>6% SST:</div>
                  <div className='SubPrices'>{Summary.SST}</div>
                </div>
                <div className='line'></div>
                <div className='SummaryBreakdown'>
                  <div className='SubTotalWord'>Total:</div>
                  <div className='SubTotal'>
                    <span style={{ fontSize: 'small',verticalAlign: 'top' }}>
                        RM
                    </span>
                      {Summary.Total}
                    </div>
                </div>
                <div className='line'></div>
                <div className='SummaryBreakdown'></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Checkout;