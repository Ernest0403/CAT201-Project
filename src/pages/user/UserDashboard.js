// UserDashboard.js

import React from 'react';
import './UserDashboard.css';
import UserSidebar from '../../Component/UserSidebar';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className='DashboardContainer'>
            <UserSidebar />
            <div className='Dashboard'>
                <h1>Hi! Username</h1>
                <p>From your account dashboard you can view your  
                    <span className='Underline' onClick={() => handleNavigation('/orders')}> recent orders</span>
                    , manage your shipping and 
                    <span className='Underline' onClick={() => handleNavigation('/addresses')}> billing addresses</span>
                    , and 
                    <span className='Underline' onClick={() => handleNavigation('/account-details')}> edit your password </span>
                    and 
                    <span className='Underline' onClick={() => handleNavigation('/account-details')}> account details.</span>
                </p>
                <div className='DashboardButtons'>
                    <div className='IndividualButton' onClick={() => handleNavigation('/account-details')}>
                        <img className='ButtonImage' src={"/Images/accounticon.png"} alt='' />
                        <div className='ButtonLable'>Account Details</div>
                    </div>
                    <div className='IndividualButton' onClick={() => handleNavigation('/orders')}>
                        <img className='ButtonImage' src={"/Images/Orders.png"} alt='' />
                        <div className='ButtonLable'>Orders</div>
                    </div>
                    <div className='IndividualButton' onClick={() => handleNavigation('/addresses')}>
                        <img className='ButtonImage' src={"/Images/Address.png"} alt='' />
                        <div className='ButtonLable'>Addresses</div>
                    </div>
                    <div className='IndividualButton' onClick={() => handleNavigation('/login')}>
                        <img className='ButtonImage' src={"/Images/Logout.png"} alt='' />
                        <div className='ButtonLable'>Log out</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;

