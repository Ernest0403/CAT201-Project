import './PaymentSuccess.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();
    return (
        <>
        <div className='PaymentSuccessContainer'>
            <div className='linetop'></div>
            <div className='SuccessView'>
                <img src={"/Images/doubletick.png"} alt='' />
                <div>Your payment is successful!!</div>
                <div className='Underline' onClick={() => navigate('/orders')}>Click here to view your order!</div>
            </div>
        </div>
        </>
    )
}

export default PaymentSuccess;