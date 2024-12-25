import './UserDashboard.css';
import React from 'react';
import Menubar from '../../Component/Menubar';
import Navbar from '../../Component/Navbar';
import UserSidebar from '../../Component/UserSidebar';

function UserDashboard() {
    return (
        <>
        <div>
            <Menubar />
            <Navbar />
            <div className='DashboardContainer'>
            {window.innerWidth > 420 && <UserSidebar />}
                <div className='Dashboard'>
                    <h1>Hi! Username</h1>
                    <p>From your account dashboard you can view your  
                        <span className='Underline'> recent orders</span>
                        , manage your shipping and 
                        <span className='Underline'> billing addresses</span>
                        , and 
                        <span className='Underline'> edit your password </span>
                         and 
                        <span className='Underline'> account details.</span>
                    </p>
                    <div className='DashboardButtons'>
                        <div className='IndividualButton'>
                            <img className='ButtonImage' src={"/Images/accounticon.png"} alt='' />
                            <div className='ButtonLable'>Account Details</div>
                        </div>
                        <div className='IndividualButton'>
                            <img className='ButtonImage' src={"/Images/Orders.png"} alt='' />
                            <div className='ButtonLable'>Orders</div>
                        </div>
                        <div className='IndividualButton'>
                            <img className='ButtonImage' src={"/Images/Address.png"} alt='' />
                            <div className='ButtonLable'>Addresses</div>
                        </div>
                        <div className='IndividualButton'>
                            <img className='ButtonImage' src={"/Images/Logout.png"} alt='' />
                            <div className='ButtonLable'>Log out</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDashboard;