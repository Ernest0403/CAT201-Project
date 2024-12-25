import './PaymentSuccess.css';
import React from 'react';
import Menubar from './Component/Menubar';

function PaymentSuccess() {
    return (
        <>
        <div className='PaymentSuccessContainer'>
            <Menubar />
            <div className='linetop'></div>
            <div className='SuccessView'>
                <img src={"/Images/doubletick.png"} alt='' />
                <div>Your payment is successful!!</div>
                <div className='Underline'>Click here to view your order!</div>
            </div>
        </div>
        </>
    )
}

export default PaymentSuccess;