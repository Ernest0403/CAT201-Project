import './Checkout.css';
import React from 'react';
import Menubar from './Component/Menubar';
import { useState } from "react";

function Checkout() {
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
    
    return (
      <>
        <div className='CheckoutContainer'>
          <Menubar />
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
                    <div className='InformationLable'>Shipping Address Details</div>
                    <input type = "ShippingAddress" name= "ShippingAddressInput" />
                    <div className='InformationLable'>Shipping Address Details (Optional)</div>
                    <input type = "ShippingAddressOptional" name= "ShippingAddressOptionalInput" /> 
                    <div className='InformationLable'>City</div>
                    <input type = "ShippingCity" name= "ShippingCityInput" /> 
                    <div className='InformationLable'>Postcode</div>
                    <input type = "ShippingPostcode" name= "ShippingPostcodeInput" /> 
                    <div className='InformationLable'>State</div>
                    <input type = "ShippingState" name= "ShippingStateInput" /> 
                    <div className='InformationLable'>Contact Number</div>
                    <input type = "ShippingContactNumber" name= "ShippingContactNumberInput" /> 
                    <div className='InformationLable'>Notes/Messages</div>
                    <input type = "ShippingNotes" name= "ShippingNotesInput" />  
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
                            <input type = "CardNumber" name= "CardNumberInput" />
                            <div className='InformationLable'>Card's Holder Name</div>
                            <input type = "CardHolderName" name= "CardHolderNameInput" />
                            <div className='InformationLable'>Card Expiry Date</div>
                            <input type = "CardED" name= "CardEDInput" />
                            <div className='InformationLable'>CVV</div>
                            <input type = "CardCVV" name= "CardCVVInput" /> 
                        </div>
                        : <></>
                    }
                </div>
                <div className='CheckoutNav'>
                    <button className='BackToCart'>Back to Cart</button>
                    <button className='ProceedPayment'>Proceed to Payment</button>
                </div>
            </div>
            <div className='Summary'>
                <div className='SummaryTitle'>
                  <p>SUMMARY</p>
                </div>
                <div className='SummaryBreakdown'>
                  <div className='SubDetails'>Selected Item:</div>
                  <div className='SubPrices'>2</div>
                  <div className='SubDetails'>Product Price:</div>
                  <div className='SubPrices'>106.35</div>
                  <div className='SubDetails'>Assembly Fee:</div>
                  <div className='SubPrices'>30.00</div>
                  <div className='SubDetails'>Delivery:</div>
                  <div className='SubPrices'>20.00</div>
                  <div className='SubDetails'>6% SST:</div>
                  <div className='SubPrices'>9.38</div>
                </div>
                <div className='line'></div>
                <div className='SummaryBreakdown'>
                  <div className='SubTotalWord'>Subtotal:</div>
                  <div className='SubTotal'>RM165.73</div>
                </div>
                <div className='line'></div>
                <div className='SummaryBreakdown'>
                  <div className='SubDetails'>Item List:</div>
                  <div className='SubPrices'></div>
                  <div className='SubDetails'>Item Name 1</div>
                  <div className='SubPrices'>1</div>
                  <div className='SubDetails'>Item Name 2</div>
                  <div className='SubPrices'>2</div>
                </div>
            </div>
          </div>
          
        </div>
      </>
    );
  }
  
  export default Checkout;